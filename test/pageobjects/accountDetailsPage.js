const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountDetailsPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 


    get accountDetailsTitle() { return $('.title=Account Details') };
    get accountNumber() { return $('#accountId') };
    get accountType() { return $('#accountType') };
    get balance() { return $('#balance') };
    get availableBalance() { return $('#availableBalance') };
    get transactionTable() { return $('#transactionTable') };

    async checkIfAccountDetailsScreenLoaded(expectedAccNumber, expectedAccType) {
        await expect(this.accountDetailsTitle).toBeExisting();
    }

    async validateNewAccountDetails(expectedAccNumber, expectedAccType) {
        await expect(this.transactionTable).toBeExisting();
        await expect(this.accountNumber).toHaveTextContaining(expectedAccNumber);
        await expect(this.accountType).toHaveTextContaining(expectedAccType);
    }

    async getAccountBalance() {
        return await this.balance.getText();
    }

    async getAvailableBalance() {
        return await this.availableBalance.getText();
    }

    async validateAccountBalance(balanceAmount,availableBalAmount) {

        // balanceAmount = this.convertNumberToCurrencyAmount(balanceAmount);
        // availableBalAmount = this.convertNumberToCurrencyAmount(availableBalAmount);

        await expect(this.balance).toHaveTextContaining(balanceAmount);
        await expect(this.availableBalance).toHaveTextContaining(availableBalAmount);
    }

    convertNumberToCurrencyAmount(number){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })

          return formatter.format(number);
    };
 

}

module.exports = new AccountDetailsPage();
