const CONTENT_PREFIX = 'cms-content:';

// Swap this local adapter with a remote provider later (Supabase/API).
export const cmsContentAdapter = {
    getValue(contentKey, fallbackValue) {
        if (typeof window === 'undefined') {
            return fallbackValue;
        }

        const storedValue = window.localStorage.getItem(`${CONTENT_PREFIX}${contentKey}`);
        return storedValue ?? fallbackValue;
    },
    setValue(contentKey, value) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(`${CONTENT_PREFIX}${contentKey}`, value);
    }
};
