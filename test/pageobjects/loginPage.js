const Page = require('./page');

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
    // get inputUsername() { return $('#username') }
    // get inputPassword() { return $('#password') }
    // get btnSubmit() { return $('#value="Log In"') }



    /**
     * Login using username and password
     * @param {*} username 
     * @param {*} password 
     */

    async login(username, password) {
        this.inputUsername.waitForExist();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
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
