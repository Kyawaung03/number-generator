/**
 * NUMBER GENERATOR LOGIC
 * - Generate unique numbers (0-9)
 * - No twin numbers (11, 22, etc)
 * - No sequential numbers (no +1 or -1 increment)
 */

class NumberGenerator {
    constructor(amount = 1) {
        this.amount = Math.max(1, Math.min(amount, 9));
        this.availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    /**
     * Generate random numbers with constraints
     * @returns {Array} Array of generated numbers
     */
    generate() {
        const result = [];
        const remaining = [...this.availableNumbers];

        for (let i = 0; i < this.amount; i++) {
            const validNumbers = this.getValidNumbers(remaining, result);

            if (validNumbers.length === 0) {
                // If no valid numbers found, reset and try again
                return this.generate();
            }

            const randomIndex = Math.floor(Math.random() * validNumbers.length);
            const selectedNumber = validNumbers[randomIndex];

            result.push(selectedNumber);

            // Remove from remaining
            remaining.splice(remaining.indexOf(selectedNumber), 1);
        }

        return result;
    }

    /**
     * Get valid numbers that don't violate constraints
     * @param {Array} remaining - Remaining numbers to choose from
     * @param {Array} result - Already selected numbers
     * @returns {Array} Valid numbers
     */
    getValidNumbers(remaining, result) {
        return remaining.filter(num => {
            // Check if it's a twin number (same digit repeated)
            const isTwin = this.isTwinNumber(num);
            if (isTwin) return false;

            // Check if it's sequential with the last number
            if (result.length > 0) {
                const lastNumber = result[result.length - 1];
                const isSequential = Math.abs(num - lastNumber) === 1;
                if (isSequential) return false;
            }

            return true;
        });
    }

    /**
     * Check if number is a twin (11, 22, 33, etc)
     * @param {Number} num - Number to check
     * @returns {Boolean}
     */
    isTwinNumber(num) {
        // Twin numbers: 11, 22, 33, 44, 55, 66, 77, 88, 99
        // In our case (0-9), we don't have true twins, but let's keep the logic
        // for future compatibility or if we extend to larger ranges
        const str = String(num);
        return str.length > 1 && /^(\d)\1+$/.test(str);
    }

    /**
     * Set the amount of numbers to generate
     * @param {Number} amount - Amount (1-9)
     */
    setAmount(amount) {
        this.amount = Math.max(1, Math.min(amount, 9));
    }

    /**
     * Get current amount
     * @returns {Number}
     */
    getAmount() {
        return this.amount;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumberGenerator;
}