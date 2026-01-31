import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Admin from './Admin';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock api calls
vi.mock('@/lib/api/banks', () => ({
    fetchBanks: vi.fn().mockResolvedValue([])
}));

vi.mock('@/lib/api/updates', () => ({
    fetchPendingUpdates: vi.fn().mockResolvedValue([])
}));

vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn().mockResolvedValue({ count: 0 })
        })),
        channel: vi.fn(() => ({
            on: vi.fn().mockReturnThis(),
            subscribe: vi.fn()
        }))
    }
}));

describe('Admin', () => {
    const queryClient = new QueryClient();

    it('renders admin dashboard layout', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Admin />
                </BrowserRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });
});
