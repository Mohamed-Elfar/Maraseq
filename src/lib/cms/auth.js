const ADMIN_STORAGE_KEY = 'isAdmin';

export const cmsAuthAdapter = {
    getIsAdmin() {
        if (typeof window === 'undefined') {
            return false;
        }

        return window.localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    },
    setIsAdmin(value) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(ADMIN_STORAGE_KEY, value ? 'true' : 'false');
    },
    clearAdmin() {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
};

export { ADMIN_STORAGE_KEY };
