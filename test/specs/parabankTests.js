const LoginPage = require('../pageobjects/loginPage');
const AccountServicesPage = require('../pageobjects/accountServicesPage');
const OpenNewAccountPage = require('../pageobjects/openNewAccountPage');
const AccountDetailsPage = require('../pageobjects/accountDetailsPage');
const Labels = require('../constants/pageLabels.js');
const Yaml = require('js-yaml');
const Fs = require('fs');


const TestData = Yaml.load(Fs.readFileSync('./test/testData/userInputs.yml')); //To read the test data yaml file

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    var newAccountNumber_1;
    before(async () => {
        await LoginPage.open();
    });

    it('Verify user can login with valid credentials', async () => {
        let loginData = TestData['LoginData'];
        await LoginPage.open();
        await LoginPage.login(loginData.username, loginData.password);
        await expect(AccountServicesPage.welcomeText).toBeExisting();
    });

    it('Verify user sees a welcome message with a full name in Account Services section', async () => {
        await expect(AccountServicesPage.accountServicesLabel).toBeExisting();
        await expect(AccountServicesPage.welcomeText).toHaveTextContaining(Labels.WELCOME_TEXT);
    });

    it('Verify user is able to click Open New Account link', async () => {
        await AccountServicesPage.clickOpenNewAccountLink();
        await expect(AccountServicesPage.openNewAccountFormLabel).toBeExisting();
    });

    it('Verify user is able to Fill up Open New Account form to create first account', async () => {
        let firstAccountData = TestData['FirstAccountData'];
        await OpenNewAccountPage.fillNewAccountOpeningForm(firstAccountData);
        await OpenNewAccountPage.validateSucessMessages();
        newAccountNumber_1 = await OpenNewAccountPage.getNewAccountNumber()
        console.log("New Account generated= " + newAccountNumber_1);
        await OpenNewAccountPage.clickNewAccountNumber();

    });


    it('Verify user is able to launch Account Details page of the new account ', async () => {

        await OpenNewAccountPage.clickNewAccountNumber();

    });

    it('Verify user is able to validate details on Accounts Details Page', async () => {
        await AccountDetailsPage.validateNewAccountDetails();

    });


});



