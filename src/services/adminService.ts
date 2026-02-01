import { supabase } from "@/integrations/supabase/client";
import { Database } from "../../supabase.types";

type GlossaryTerm = Database['public']['Tables']['glossary_terms']['Row'];
type Guide = Database['public']['Tables']['guides']['Row'];
type GlossaryInsert = Database['public']['Tables']['glossary_terms']['Insert'];
type GuideInsert = Database['public']['Tables']['guides']['Insert'];

export const adminService = {
    // --- Glossary ---
    async getGlossaryTerms() {
        const { data, error } = await supabase
            .from('glossary_terms')
            .select('*')
            .order('term', { ascending: true });

        if (error) throw error;
        return data as GlossaryTerm[];
    },

    async addGlossaryTerm(term: GlossaryInsert) {
        const { data, error } = await supabase
            .from('glossary_terms')
            .insert(term)
            .select()
            .single();

        if (error) throw error;
        return data as GlossaryTerm;
    },

    async updateGlossaryTerm(id: string, updates: Partial<GlossaryInsert>) {
        const { data, error } = await supabase
            .from('glossary_terms')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as GlossaryTerm;
    },

    async deleteGlossaryTerm(id: string) {
        const { error } = await supabase
            .from('glossary_terms')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // --- Guides ---
    async getGuides() {
        const { data, error } = await supabase
            .from('guides')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Guide[];
    },

    async getGuideBySlug(slug: string) {
        const { data, error } = await supabase
            .from('guides')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data as Guide;
    },

    async addGuide(guide: GuideInsert) {
        const { data, error } = await supabase
            .from('guides')
            .insert(guide)
            .select()
            .single();

        if (error) throw error;
        return data as Guide;
    },

    async updateGuide(id: string, updates: Partial<GuideInsert>) {
        const { data, error } = await supabase
            .from('guides')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Guide;
    },

    async deleteGuide(id: string) {
        const { error } = await supabase
            .from('guides')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    // --- Favorites ---
    async toggleFavorite(userId: string, itemId: string, itemType: 'guide' | 'term') {
        // Check if exists
        const { data: existing } = await supabase
            .from('user_favorites')
            .select('id')
            .eq('user_id', userId)
            .eq('item_id', itemId)
            .single();

        if (existing) {
            // Remove
            await supabase.from('user_favorites').delete().eq('id', existing.id);
            return false; // Not favorited
        } else {
            // Add
            await supabase.from('user_favorites').insert({
                user_id: userId,
                item_id: itemId,
                item_type: itemType
            });
            return true; // Favorited
        }
    },

    async checkFavoriteStatus(userId: string, itemId: string) {
        const { data } = await supabase
            .from('user_favorites')
            .select('id')
            .eq('user_id', userId)
            .eq('item_id', itemId)
            .single();
        return !!data;
    },

    async getFavorites(userId: string) {
        const { data, error } = await supabase
            .from('user_favorites')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    },

    async getHydratedFavorites(userId: string) {
        const { data: favorites, error } = await supabase
            .from('user_favorites')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        if (!favorites || favorites.length === 0) return [];

        // Separate by type
        const guideIds = favorites.filter(f => f.item_type === 'guide').map(f => f.item_id);
        const termIds = favorites.filter(f => f.item_type === 'term').map(f => f.item_id);

        // Fetch details
        let guides: Guide[] = [];
        let terms: GlossaryTerm[] = [];

        if (guideIds.length > 0) {
            // Note: Guide ID in favorites might be SLUG depending on how we saved it. 
            // Plan says Phase 6 created generic ID UUID for tables. 
            // Guides page uses slug as ID in UI but DB has UUID 'id'. 
            const { data: g } = await supabase.from('guides').select('*').in('slug', guideIds);
            // Try fetching by slug first (as frontend uses slug as ID), if empty try ID?
            // Let's assume frontend passes SLUG for guides and ID for terms?
            // Actually, consistency matters. Let's assume we save the actual DB UUID mostly, but GuideDetails uses Slug.
            // Safety: fetch by ID OR Slug.
            if (g) guides = [...guides, ...g];

            const { data: g2 } = await supabase.from('guides').select('*').in('id', guideIds);
            if (g2) guides = [...guides, ...g2];

            // Dedup
            guides = Array.from(new Map(guides.map(item => [item.id, item])).values());
        }

        if (termIds.length > 0) {
            const { data: t } = await supabase.from('glossary_terms').select('*').in('id', termIds);
            if (t) terms = t;
        }

        // Merge back
        return favorites.map(fav => {
            let details = null;
            if (fav.item_type === 'guide') {
                details = guides.find(g => g.id === fav.item_id || g.slug === fav.item_id);
            } else {
                details = terms.find(t => t.id === fav.item_id);
            }
            return { ...fav, details };
        }).filter(item => item.details); // Only return ones we found details for
    }
};
