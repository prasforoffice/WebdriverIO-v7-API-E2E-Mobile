const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OpenNewAccountPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 
    get openNewAccountAppPanel () { return $('//*[@ng-app="AddAccountApp"]') };
    get accountTypeDropDown () { return $('//*[@id="type"]')};
    get fromAccountDropDown () { return $('//*[@id="fromAccountId"]')};
    get openNewAccountButton(){return $('[value="Open New Account"]')};
    get accountOpenedTitle() {return $('//h1[contains(text(),"Account Opened!")]')};
    get newAccountNumber () { return $('//*[@id="newAccountId"]')};
    
    get accountDetailsTitle () { return $('.title=Account Details')};
    get accountNumber () { return $('//*[@id="accountId"]')};
    get accountType () { return $('//*[@id="accountType"]')};
    get balance(){ return $('//*[@id="balance"]')};
    get avalailableBalance(){ return $('//*[@id="availableBalance"]')};
    get transactionTable(){ return $('//*[@id="transactionTable"]')};

    

    

    // get accountTypeQuestion_label () { return $('xpath*=type of Account') };
    // get transferFundQuestion_label () { return $('//*[@xpath="1"]') };
    
    /**

     */
    async selectAccountType (type) {
        console.log("ACCOUNT TYPE= "+ type);
        await this.accountTypeDropDown.waitForExist();
         return (type == "CHECKING") ? await this.accountTypeDropDown.selectByAttribute('value', 0) : await this.accountTypeDropDown.selectByAttribute('value', 1);

        // if(type == "CHECKING")
        //     return await this.accountTypeDropDown.selectByAttribute('value', 0);
        // else
        //     return await this.accountTypeDropDown.selectByAttribute('value', 1);
       
    }

    async selectFromAccount (fromAccount) {
        await this.fromAccountDropDown.waitForExist({ timeout: 5000 });
        console.log("VALUE = " + await this.fromAccountDropDown.getValue());
        // await this.fromAccountDropDown.selectByVisibleText("12900");
        // await this.fromAccountDropDown.selectByAttribute('value',12900);
        await this.fromAccountDropDown.selectByIndex(0);
        // return fromAccount ?  await this.fromAccountDropDown.selectByAttribute('label',fromAccount.toString()): await this.fromAccountDropDown.selectByIndex(0)
       
    }


    async clickOpenNewAccountButton(){
        await this.openNewAccountButton.waitForExist();
        return await this.openNewAccountButton.click();
    }

    // async validateNewAccountMessages(){
    //     await this.accountOpenedTitle.waitForExist();
    //     await expect(OpenNewAccountPage.accountOpenedTitle).toBeExisting();
    // }

    async getNewAccountNumber(){
        await expect(this.newAccountNumber).toBeExisting();
        let number = await this.newAccountNumber.getValue();
        console.log("NEW="+ number);
        return number;
    }

    async clickNewAccountNumber(){
        await expect(this.newAccountNumber).toBeExisting();
        let number = await this.newAccountNumber.getValue();
        console.log("NEW="+ number);
        await this.newAccountNumber.click();;

        //-----
        await expect(this.accountDetailsTitle).toBeExisting();
        console.log("Account Details / num= " + await this.accountNumber.getValue());
        console.log("Account Details / type = " + await this.accountType.getValue());
        console.log("Account Details / balance = " + await this.balance.getValue());
        console.log("Account Details / avalailableBalance = " + await this.avalailableBalance.getValue());
        
        await expect(this.transactionTable).toBeExisting();
    }

    


 
}

module.exports = new OpenNewAccountPage();
