const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountsOverviewPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 


    get accountsOverviewTitle() { return $('.title=Accounts Overview') };
    get accountNumber() { return $('#accountId') };
    get accountType() { return $('#accountType') };
    get balance() { return $('#balance') };
    get availableBalance() { return $('#availableBalance') };
    get transactionTable() { return $('#transactionTable') };



    async openAccountFromOverviewPage(accountNumber) {
        await expect(this.accountsOverviewTitle).toBeExisting();
        await $(`'=${accountNumber}'`).click();
        // $('=Open New Account')
   
    }





}

module.exports = new AccountsOverviewPage();
