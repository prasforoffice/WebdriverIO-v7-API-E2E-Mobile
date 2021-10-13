const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OpenNewAccountPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 
    get openNewAccountAppPanel() { return $('//*[@ng-app="AddAccountApp"]') };
    get accountTypeDropDown() { return $('//*[@id="type"]') };
    get fromAccountDropDown() { return $('//*[@id="fromAccountId"]') };
    get openNewAccountButton() { return $('[value="Open New Account"]') };
    get accountOpenedTitle() { return $('.title=Account Opened!') };
    get newAccountNumber() { return $('//*[@id="newAccountId"]') };
    get accountDetailsTitle() { return $('.title=Account Details') };

    /**
     * @param {TestData} accountData 
     */

    async fillNewAccountOpeningForm(accountData) {
        await expect(this.openNewAccountAppPanel).toBeExisting();
        await this.selectAccountType(accountData.type);
        await this.selectFromAccount(accountData.fromAccount);
        await this.clickOpenNewAccountButton();
    }



    async selectAccountType(type) {
        await this.accountTypeDropDown.waitForExist();
        return (type == "CHECKING") ? await this.accountTypeDropDown.selectByAttribute('value', 0) : await this.accountTypeDropDown.selectByAttribute('value', 1);
    }

    async selectFromAccount(fromAccount) {
        await this.fromAccountDropDown.waitForExist({ timeout: 5000 });
        await this.fromAccountDropDown.selectByIndex(0);
    }


    async clickOpenNewAccountButton() {
        await browser.pause(3000);
        await this.openNewAccountButton.waitForDisplayed({ timeout: 10000 })
        return await this.openNewAccountButton.click();
    }

    async validateSucessMessages() {
        await expect(this.accountOpenedTitle).toBeExisting();
        await expect(this.newAccountNumber).toBeExisting();

    }

    async getNewAccountNumber() {
        await expect(this.newAccountNumber).toBeExisting();
        let number = await this.newAccountNumber.getText();
        return number;
    }

    async clickNewAccountNumber() {
        await expect(this.newAccountNumber).toBeExisting();
        await this.newAccountNumber.click();;
        await expect(this.accountDetailsTitle).toBeExisting();
    }

}

module.exports = new OpenNewAccountPage();
