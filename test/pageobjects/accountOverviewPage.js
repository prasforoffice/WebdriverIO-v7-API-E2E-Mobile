const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    // get welcomeText () { return $('.smallText= John Smith') }
    get welcomeText () { return $('.smallText') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
     async getWelcomeText () {
        // await this.welcomeText.waitForExist();
        return await this.welcomeText.getText();
    }

 
}

module.exports = new SecurePage();
