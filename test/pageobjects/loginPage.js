const Page = require('./page');
const ActionHelper = require('./../support/actionHelpers');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {

    /**
     * define selectors using getter methods
     */


    get inputUsername() { return $('[name="username"]') }
    get inputPassword() { return $('[name="password"]') }
    get btnSubmit() { return $('[value="Log In"]') }

    /**
     * Login using username and password
     * @param {*} username 
     * @param {*} password 
     */

    async login(username, password) {
        this.inputUsername.waitForExist();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await ActionHelper.pressKeyTab();
        
        // await this.btnSubmit.click();
        await ActionHelper.pressKeyEnter();
    }

    /**
     * Open url in browser
     * @returns 
     */
    open() {
        return super.open('parabank/index.htm');
    }


}

module.exports = new LoginPage();
