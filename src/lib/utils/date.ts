import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export const formatDateBangla = (date: Date | string | number): string => {
    const d = new Date(date);
    return format(d, 'PPP', { locale: bn });
};
