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



    async validateNewAccountDetails(expectedAccNumber,expectedAccType) {
        await expect(this.accountDetailsTitle).toBeExisting();

        let accountNumber = await this.accountNumber.getText();
        let accountType = await this.accountType.getText();
        let accountBalance = await this.balance.getText();
        let availableBalance = await this.availableBalance.getText();

        await expect(this.transactionTable).toBeExisting();
        await expect(this.accountNumber).toHaveTextContaining(expectedAccNumber);
        await expect(this.accountType).toHaveTextContaining(expectedAccType);

        
    }





}

module.exports = new AccountDetailsPage();
