const LoginPage = require('../pageobjects/loginPage');
const AccountOverviewPage = require('../pageobjects/accountOverviewPage');
const Labels = require('../constants/pageLabels.js');
const Yaml = require('js-yaml');
const Fs = require('fs');


const TestData = Yaml.load(Fs.readFileSync('./test/testData/userInputs.yml')); //To read the test data yaml file

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    before(async () => {
        await LoginPage.open();
    });

    it('Verify user can login with valid credentials', async () => {
        let loginData = TestData['LoginData'];
        await LoginPage.open();
        await LoginPage.login(loginData.username,loginData.password);
        await expect(AccountOverviewPage.welcomeText).toBeExisting();
    });

    it('Verify user sees a welcome message with a full name', async () => {
        await expect(AccountOverviewPage.welcomeText).toHaveTextContaining(Labels.WELCOME_TEXT);
    });

});



