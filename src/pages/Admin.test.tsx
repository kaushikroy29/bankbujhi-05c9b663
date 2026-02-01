import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
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

// Use global Supabase mock from setup.ts - don't redefine here

describe('Admin', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders admin dashboard layout', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false }
            }
        });

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
