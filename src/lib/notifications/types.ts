export interface UpdateNotification {
    id: string;
    type: 'fee_increase' | 'fee_decrease' | 'new_benefit' | 'removed_benefit' | 'new_card';
    title_bn: string;
    message_bn: string;
    affected_product: {
        id: string;
        name: string;
        bank: string;
    };
    severity: 'info' | 'warning' | 'critical'; // Critical = fee increase
    created_at: Date;
    read: boolean;
}

export type ProductChangeLog = {
    id: string;
    product_type: 'credit_card' | 'loan' | 'savings';
    product_id: string;
    change_type: 'fee_update' | 'rate_change' | 'benefit_change';
    field_changed: string;
    old_value?: string;
    new_value: string;
    change_reason?: string;
    source_url?: string;
    effective_date: string;
    created_at: string;
    created_by?: string;
    verified: boolean;
};
