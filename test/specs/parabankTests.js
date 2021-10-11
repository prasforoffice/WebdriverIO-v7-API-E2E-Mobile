const LoginPage = require('../pageobjects/loginPage');
const AccountServicesPage = require('../pageobjects/accountServicesPage');
const OpenNewAccountPage = require('../pageobjects/openNewAccountPage');
const AccountDetailsPage = require('../pageobjects/accountDetailsPage');
const BillPayPage = require('../pageobjects/billPayPage');
const Labels = require('../constants/pageLabels.js');
const Yaml = require('js-yaml');
const Fs = require('fs');


const TestData = Yaml.load(Fs.readFileSync('./test/testData/userInputs.yml')); //To read the test data yaml file

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    var firstAccountNumber, secondAccountNumber;
    var billPaymentData, secondAccountData, firstAccountData;

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

    //Section for creating 1st account

    it('Verify user is able to launch,fill and submit New Account form to create 1st account', async () => {
        firstAccountData = TestData['FirstAccountData'];
        await AccountServicesPage.clickOpenNewAccountLink();
        await expect(AccountServicesPage.openNewAccountFormLabel).toBeExisting();
        await OpenNewAccountPage.fillNewAccountOpeningForm(firstAccountData);
        await OpenNewAccountPage.validateSucessMessages();
        firstAccountNumber = await OpenNewAccountPage.getNewAccountNumber()
    });

    it('Verify user is able to launch & validate Account Details page of the 1st account ', async () => {
        await OpenNewAccountPage.clickNewAccountNumber();
        await AccountDetailsPage.validateNewAccountDetails();
    });

    //Section for creating 2nd account

    it('Verify user is able to launch,fill and submit New Account form to create 2nd account', async () => {
        secondAccountData = TestData['SecondAccountData'];
        await AccountServicesPage.clickOpenNewAccountLink();
        await expect(AccountServicesPage.openNewAccountFormLabel).toBeExisting();
        await OpenNewAccountPage.fillNewAccountOpeningForm(secondAccountData);
        await OpenNewAccountPage.validateSucessMessages();
        secondAccountNumber = await OpenNewAccountPage.getNewAccountNumber()

    });

    it('Verify user is able to launch & validate Account Details page of the 2nd account ', async () => {
        await OpenNewAccountPage.clickNewAccountNumber();
        await AccountDetailsPage.validateNewAccountDetails();
    });

    it('Verify user can launch and fill Bill Pay form', async () => {
        billPaymentData = TestData['BillPaymentData'];
        await AccountServicesPage.clickBillPayLink();
        await BillPayPage.fillBillPaymentForm(billPaymentData, secondAccountNumber, firstAccountNumber);
    });

    it('Validate the details on Bill Pay confirmation screen are corrct', async () => {
        await BillPayPage.validateBillPayConfirmationDetails(billPaymentData.name, billPaymentData.amount, firstAccountNumber);
    });


});



