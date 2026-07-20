/**
 * SETTINGS & PREFERENCES MANAGEMENT
 * - Dark mode toggle
 * - Persist user preferences
 */

class SettingsManager {
    constructor() {
        this.isDarkMode = this.loadDarkModeSetting();
        this.init();
    }

    /**
     * Initialize settings
     */
    init() {
        this.applyDarkMode(this.isDarkMode);
        this.attachEventListeners();
    }

    /**
     * Attach event listeners for settings
     */
    attachEventListeners() {
        const settingsToggle = document.getElementById('settings-toggle');
        if (settingsToggle) {
            settingsToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Info toggle
        const infoToggle = document.getElementById('info-toggle');
        const infoPanel = document.getElementById('info-panel');
        if (infoToggle && infoPanel) {
            infoToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                infoPanel.classList.toggle('hidden');
            });

            // Close info panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!infoToggle.contains(e.target) && !infoPanel.contains(e.target)) {
                    infoPanel.classList.add('hidden');
                }
            });
        }
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.applyDarkMode(this.isDarkMode);
        this.saveDarkModeSetting(this.isDarkMode);
    }

    /**
     * Apply dark mode styles
     * @param {Boolean} isDark - Whether to apply dark mode
     */
    applyDarkMode(isDark) {
        const html = document.documentElement;
        const body = document.body;
        const toggle = document.getElementById('settings-toggle');

        if (isDark) {
            body.classList.add('dark-mode');
            html.style.colorScheme = 'dark';
            if (toggle) {
                toggle.querySelector('.toggle-icon').textContent = '☀️';
            }
        } else {
            body.classList.remove('dark-mode');
            html.style.colorScheme = 'light';
            if (toggle) {
                toggle.querySelector('.toggle-icon').textContent = '🌙';
            }
        }
    }

    /**
     * Save dark mode setting to localStorage
     * @param {Boolean} isDark
     */
    saveDarkModeSetting(isDark) {
        try {
            localStorage.setItem('numberGenerator_darkMode', JSON.stringify(isDark));
        } catch (e) {
            console.warn('Could not save settings to localStorage:', e);
        }
    }

    /**
     * Load dark mode setting from localStorage
     * @returns {Boolean}
     */
    loadDarkModeSetting() {
        try {
            const saved = localStorage.getItem('numberGenerator_darkMode');
            if (saved !== null) {
                return JSON.parse(saved);
            }
            // Default: check system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (e) {
            console.warn('Could not load settings from localStorage:', e);
            return false;
        }
    }

    /**
     * Check for system color scheme changes
     */
    watchSystemColorScheme() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-apply if user hasn't manually set a preference
            if (localStorage.getItem('numberGenerator_darkMode') === null) {
                this.isDarkMode = e.matches;
                this.applyDarkMode(this.isDarkMode);
            }
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
    window.settingsManager.watchSystemColorScheme();
});