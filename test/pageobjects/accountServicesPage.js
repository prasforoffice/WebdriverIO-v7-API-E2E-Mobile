const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountServicesPage extends Page {

    /**
     * define selectors using getter methods
     */

    get welcomeText () { return $('.smallText') }
    get accountServicesLabel () { return $('h2=Account Services')};
    get openNewAccountLink(){return $('=Open New Account')};
    get openNewAccountFormLabel(){return $('.title=Open New Account')};


    /**

     */
    
    async clickOpenNewAccountLink () {
        return await this.openNewAccountLink.click();
       
    }

 
}

module.exports = new AccountServicesPage();
