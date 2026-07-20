/**
 * UI INTERACTION & ANIMATION
 * - Handle user interactions
 * - Manage result display
 * - Copy to clipboard functionality
 */

class NumberGeneratorUI {
    constructor() {
        this.generator = null;
        this.resultContainer = document.getElementById('result-container');
        this.generateBtn = document.getElementById('generate-btn');
        this.amountSlider = document.getElementById('amount-slider');
        this.amountValue = document.getElementById('amount-value');
        this.presetButtons = document.querySelectorAll('.preset-btn');

        this.isGenerating = false;

        this.init();
    }

    /**
     * Initialize UI
     */
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachEventListeners());
        } else {
            this.attachEventListeners();
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Initialize generator
        this.generator = new NumberGenerator(1);

        // Slider change
        if (this.amountSlider) {
            this.amountSlider.addEventListener('input', (e) => {
                const amount = parseInt(e.target.value);
                this.updateAmount(amount);
            });
        }

        // Generate button
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => this.handleGenerate());
        }

        // Preset buttons
        this.presetButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.getAttribute('data-amount'));
                this.updateAmount(amount);
                this.handleGenerate();
            });
        });

        // Enter key on slider
        if (this.amountSlider) {
            this.amountSlider.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleGenerate();
                }
            });
        }
    }

    /**
     * Update amount and slider
     * @param {Number} amount
     */
    updateAmount(amount) {
        if (this.generator) {
            this.generator.setAmount(amount);
        }

        if (this.amountSlider) {
            this.amountSlider.value = amount;
        }

        if (this.amountValue) {
            this.amountValue.textContent = amount;
        }
    }

    /**
     * Handle generate button click
     */
    async handleGenerate() {
        if (this.isGenerating) return;

        this.isGenerating = true;
        this.generateBtn.classList.add('generating');

        // Simulate generation time for animation effect
        await this.delay(300);

        const numbers = this.generator.generate();
        this.displayResults(numbers);

        // Copy to clipboard
        await this.copyToClipboard(numbers);

        this.generateBtn.classList.remove('generating');
        this.isGenerating = false;
    }

    /**
     * Display results
     * @param {Array} numbers
     */
    displayResults(numbers) {
        if (!this.resultContainer) return;

        // Clear previous results
        this.resultContainer.innerHTML = '';

        // Create result numbers container
        const numbersDiv = document.createElement('div');
        numbersDiv.className = 'result-numbers';

        numbers.forEach((num, index) => {
            const card = document.createElement('div');
            card.className = 'number-card';
            card.textContent = num;
            card.style.animationDelay = `${index * 0.1}s`;

            numbersDiv.appendChild(card);
        });

        this.resultContainer.appendChild(numbersDiv);
    }

    /**
     * Copy results to clipboard
     * @param {Array} numbers
     */
    async copyToClipboard(numbers) {
        const text = numbers.join('');

        try {
            // Modern clipboard API
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                console.log('Copied to clipboard:', text);
            } else {
                // Fallback for older browsers
                this.copyToClipboardFallback(text);
            }
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            // Try fallback
            this.copyToClipboardFallback(text);
        }
    }

    /**
     * Fallback copy to clipboard (older browsers)
     * @param {String} text
     */
    copyToClipboardFallback(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Copied to clipboard (fallback):', text);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }

        document.body.removeChild(textarea);
    }

    /**
     * Delay helper (for animations)
     * @param {Number} ms - Milliseconds
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.numberGeneratorUI = new NumberGeneratorUI();
});