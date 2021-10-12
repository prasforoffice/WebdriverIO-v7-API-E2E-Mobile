const LoginPage = require('../pageobjects/loginPage');
const AccountServicesPage = require('../pageobjects/accountServicesPage');
const OpenNewAccountPage = require('../pageobjects/openNewAccountPage');
const AccountDetailsPage = require('../pageobjects/accountDetailsPage');
const AccountsOverviewPage = require('../pageobjects/accountsOverviewPage');
const BillPayPage = require('../pageobjects/billPayPage');
const Labels = require('../constants/pageLabels.js');
const Yaml = require('js-yaml');
const Fs = require('fs'); 


const TestData = Yaml.load(Fs.readFileSync('./test/testData/userInputs.yml')); //To read the test data yaml file

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    var firstAccountNumber, secondAccountNumber,firstAccountBalance,secondAccountBalance;
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

    // Section for creating 1st account

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
        await AccountDetailsPage.validateNewAccountDetails(firstAccountNumber,firstAccountData.type);
        firstAccountBalance = await AccountDetailsPage.getAccountBalance();
        firstAccountAvlBalance = await AccountDetailsPage.getAvailableBalance();


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
        await AccountDetailsPage.validateNewAccountDetails(secondAccountNumber,secondAccountData.type);
        secondAccountBalance = await AccountDetailsPage.getAccountBalance();
        secondAccountAvlBalance = await AccountDetailsPage.getAvailableBalance();
    });

    it('Verify user can launch and fill Bill Pay form', async () => {
        billPaymentData = TestData['BillPaymentData'];
        await AccountServicesPage.clickBillPayLink();
        await BillPayPage.fillBillPaymentForm(billPaymentData, secondAccountNumber, firstAccountNumber);
    });

    it('Validate the details on Bill Pay confirmation screen are correct', async () => {
        await BillPayPage.validateBillPayConfirmationDetails(billPaymentData.name, billPaymentData.amount, firstAccountNumber);
    });


    it('Validate the Bill payment transactions across two new accounts', async () => {
         /* First account verification */
        await AccountServicesPage.clickAccountsOverviewLink();
        // secondAccountNumber = "22446"
        await AccountsOverviewPage.openAccountFromOverviewPage(secondAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();
        // secondAccountBalance = "$100.00"
        // secondAccountAvlBalance = "$100.00"
        await AccountDetailsPage.validateAccountBalance(secondAccountBalance,secondAccountAvlBalance);

        /*  Second account verification */
        await AccountServicesPage.clickAccountsOverviewLink();
        // firstAccountNumber="22335";
        await AccountsOverviewPage.openAccountFromOverviewPage(firstAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();
        // firstAccountBalance="$100.00";
        var currentBalance = parseFloat(firstAccountBalance.replace(/[^\d\.]/, '')) - 200;
        currentBalance = AccountDetailsPage.convertNumberToCurrencyAmount(currentBalance);
        await AccountDetailsPage.validateAccountBalance(currentBalance,AccountDetailsPage.convertNumberToCurrencyAmount("0"));



    });

    



});



