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



    async validateNewAccountDetails() {
        await expect(this.accountDetailsTitle).toBeExisting();

        let accountNumber = await this.accountNumber.getText();
        let accountType = await this.accountType.getText();
        let accountBalance = await this.balance.getText();
        let availableBalance = await this.availableBalance.getText();


        console.log("Account Details / num= " + accountNumber);
        console.log("Account Details / type = " + accountType);
        console.log("Account Details / balance = " + accountBalance);
        console.log("Account Details / avalailableBalance = " + availableBalance);

        await expect(this.transactionTable).toBeExisting();
    }





}

module.exports = new AccountDetailsPage();
