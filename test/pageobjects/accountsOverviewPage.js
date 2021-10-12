const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountsOverviewPage extends Page {

    get accountsOverviewTitle() { return $('.title=Accounts Overview') };

    async openAccountFromOverviewPage(accountNumber) {
        await browser.pause(3000);
        await expect(this.accountsOverviewTitle).toBeExisting(); 
        const link = await $("//a[contains(text(),'"+accountNumber+"')]"); 
        await link.click();
   
    }

}

module.exports = new AccountsOverviewPage();
