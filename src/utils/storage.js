class ApplicationStorage {
    isLocalStorageHasAccess = false;

    constructor() {
        try {
            this.isLocalStorageHasAccess = !!window.localStorage;
        } catch (e) {
            this.isLocalStorageHasAccess = false;
        }
        
    }
    getItem(key, fallback = false) {
        if (this.isLocalStorageHasAccess) {
            return JSON.parse(window.localStorage.getItem(key)) || fallback;
        }
        return fallback;
    }

    setItem(key, value) {
        try {
            if (this.isLocalStorageHasAccess) {
                window.localStorage.setItem(key, JSON.stringify(value));
            }

            return true;
        } catch (e) {
            return false
        }
    }
}

export default new ApplicationStorage();