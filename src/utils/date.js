import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(parseISO(dateString), 'dd/MM/yyyy', { locale: vi });
};

export const getCurrentDate = () => {
    return format(new Date(), 'yyyy-MM-dd');
};
