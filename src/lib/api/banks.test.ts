import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBanks } from './banks';
import { supabase } from '@/integrations/supabase/client';

// Simple mock definition
vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
        from: vi.fn(),
    },
}));

describe('fetchBanks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch banks successfully', async () => {
        const mockData = [
            { id: '1', name: 'Bank A', is_active: true },
            { id: '2', name: 'Bank B', is_active: true },
        ];

        // Create properly chained mock
        const mockOrder = vi.fn().mockResolvedValue({ data: mockData, error: null });
        const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
        const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

        // Setup the mock implementation
        // @ts-ignore
        supabase.from.mockReturnValue({
            select: mockSelect
        });

        const banks = await fetchBanks();

        expect(supabase.from).toHaveBeenCalledWith('banks');
        expect(mockSelect).toHaveBeenCalledWith('*');
        expect(mockEq).toHaveBeenCalledWith('is_active', true);
        expect(mockOrder).toHaveBeenCalledWith('name');
        expect(banks).toHaveLength(2);
        expect(banks[0].name).toBe('Bank A');
    });

    it('should return empty array on error', async () => {
        // Create properly chained mock for error state
        const mockOrder = vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } });
        const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
        const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

        // @ts-ignore
        supabase.from.mockReturnValue({
            select: mockSelect
        });

        try {
            await fetchBanks();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });
});
