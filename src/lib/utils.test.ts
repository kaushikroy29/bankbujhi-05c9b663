import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names correctly', () => {
            expect(cn('c-1', 'c-2')).toBe('c-1 c-2');
        });

        it('should handle conditional classes', () => {
            const shouldAddClass2 = true;
            const shouldAddClass3 = false;
            expect(cn('c-1', shouldAddClass2 && 'c-2', shouldAddClass3 && 'c-3')).toBe('c-1 c-2');
        });

        it('should merge tailwind classes correctly', () => {
            // tailwind-merge should override p-2 with p-4
            expect(cn('p-2', 'p-4')).toBe('p-4');
        });

        it('should handle objects', () => {
            expect(cn('c-1', { 'c-2': true, 'c-3': false })).toBe('c-1 c-2');
        });
    });
});
