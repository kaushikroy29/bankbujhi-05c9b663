type EventType = 'apply_click' | 'compare_click' | 'share' | 'view_item';

interface AnalyticsEvent {
    action: EventType;
    category: string;
    label?: string;
    value?: number;
}

/**
 * Tracks user interactions for analytics.
 * Currently logs to console, but can be extended for Google Analytics / Mixpanel.
 */
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    // Log to console in development
    if (import.meta.env.DEV) {
        console.log(`[Analytics] ${action} - ${category}`, { label, value });
    }

    // TODO: Add Google Analytics (GA4) or other providers here
    // if (window.gtag) {
    //   window.gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     value: value
    //   });
    // }
};

export const trackCardView = (cardId: string, cardName: string) => {
    // Send to analytics
    console.log(`Card viewed: ${cardName} (${cardId})`);
    trackEvent({
        action: 'view_item',
        category: 'Cards',
        label: cardName,
        value: undefined // or some numeric value if applicable
    });
};
