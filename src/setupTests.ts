import { vi } from 'vitest';

vi.mock('@/integrations/supabase/client', () => {
  return {
    supabase: {
      auth: {
        // Default: no user. Tests that require an authenticated user can override this mock.
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: (_cb: any) => ({ data: null }),
      },
      // Basic stub for queries that may be called during render in tests.
      from: () => ({ select: async () => ({ data: null }) }),
    },
  };
});