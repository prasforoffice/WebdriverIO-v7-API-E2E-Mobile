const LoginPage = require('../pageobjects/loginPage');
const AccountOverviewPage = require('../pageobjects/accountOverviewPage');
const Labels = require('../constants/pageLabels.js');

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    before(async () => {
        await LoginPage.open();
    });

    it('user should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('john', 'demo');
        await expect(AccountOverviewPage.welcomeText).toBeExisting();
        // await console.log("WELCOME = " + AccountOverviewPage.getWelcomeText());
        await expect(AccountOverviewPage.welcomeText).toHaveTextContaining('Welcome');
    });

    it('user should see a welcome message with a name', async () => {
        // await expect(AccountOverviewPage.welcomeText).toHaveTextContaining('Welcome John Smith');
        await expect(AccountOverviewPage.welcomeText).toHaveTextContaining(Labels.WELCOME_TEXT);

    });

});



