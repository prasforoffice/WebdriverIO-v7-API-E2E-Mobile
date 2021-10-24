const {
    ClassicRunner,
    Eyes,
    Target,
    BatchInfo
} = require('@applitools/eyes-webdriverio');


let eyes;
let configuration;
let runner;



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
const Keys = Yaml.load(Fs.readFileSync('./test/testData/keys.yml')); //To read the test data yaml file


describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    var firstAccountNumber, secondAccountNumber, firstAccountBalance, secondAccountBalance;
    var billPaymentData, secondAccountData, firstAccountData;

    before(async () => {
        runner = new ClassicRunner();
        eyes = new Eyes(runner);
        if (browser.config.enableEyesLogs) {
            eyes.setLogHandler(new ConsoleLogHandler(true));
        }
        eyes.setMatchLevel("Layout2");
        configuration = eyes.getConfiguration();
        configuration.setApiKey(Keys['APPLITOOLS'].API_KEY)
        configuration.setBatch(new BatchInfo('Visual Regression Testing - Assignment'))
        await LoginPage.open();
    });

    beforeEach(async function () {
        const appName = await this.test.parent.title;
        const testName = await this.currentTest.title;

        configuration.setAppName(appName);
        configuration.setTestName(testName);

        // Set the configuration to eyes
        eyes.setConfiguration(configuration);
        browser = await eyes.open(browser);
    });


    it('Verify user can login with valid credentials', async () => {
        let loginData = TestData['LoginData'];
        await LoginPage.open();
        await LoginPage.login(loginData.username, loginData.password);
        await expect(AccountServicesPage.welcomeText).toBeExisting();
        await eyes.check('Login Window', Target.window().fully());
    });

    it('Verify user sees a welcome message with a full name in Account Services section', async () => {
        await expect(AccountServicesPage.accountServicesLabel).toBeExisting();
        await expect(AccountServicesPage.welcomeText).toHaveTextContaining(Labels.WELCOME_TEXT);
        await eyes.check('Welcome message', Target.window().fully());
    });

    /* Section for creating 1st account*/

    it('Verify user is able to launch,fill and submit New Account form to create 1st account', async () => {
        firstAccountData = TestData['FirstAccountData'];
        await AccountServicesPage.clickOpenNewAccountLink();
        await eyes.check('New Account Form', Target.window().fully());
        await expect(AccountServicesPage.openNewAccountFormLabel).toBeExisting();
        await OpenNewAccountPage.fillNewAccountOpeningForm(firstAccountData);
        await eyes.check('New account#1 success page', Target.window().fully());
        await OpenNewAccountPage.validateSucessMessages();
        firstAccountNumber = await OpenNewAccountPage.getNewAccountNumber()
    });

    it('Verify user is able to launch & validate Account Details page of the 1st account ', async () => {
        await OpenNewAccountPage.clickNewAccountNumber();
        await eyes.check('New account details page', Target.window().fully());
        await AccountDetailsPage.validateNewAccountDetails(firstAccountNumber, firstAccountData.type);
        firstAccountBalance = await AccountDetailsPage.getAccountBalance();
        firstAccountAvlBalance = await AccountDetailsPage.getAvailableBalance();
    });

    /* Section for creating 2nd account */

    it('Verify user is able to launch,fill and submit New Account form to create 2nd account', async () => {
        secondAccountData = TestData['SecondAccountData'];
        await AccountServicesPage.clickOpenNewAccountLink();
        await eyes.check('New Account Form', Target.window().fully());
        await expect(AccountServicesPage.openNewAccountFormLabel).toBeExisting();
        await OpenNewAccountPage.fillNewAccountOpeningForm(secondAccountData);
        await eyes.check('New account#2 success page', Target.window().fully());
        await OpenNewAccountPage.validateSucessMessages();
        secondAccountNumber = await OpenNewAccountPage.getNewAccountNumber()

    });

    it('Verify user is able to launch & validate Account Details page of the 2nd account ', async () => {
        await OpenNewAccountPage.clickNewAccountNumber();
        await eyes.check('New account details page', Target.window().fully());
        await AccountDetailsPage.validateNewAccountDetails(secondAccountNumber, secondAccountData.type);
        secondAccountBalance = await AccountDetailsPage.getAccountBalance();
        secondAccountAvlBalance = await AccountDetailsPage.getAvailableBalance();
    });

    it('Verify user can launch and fill Bill Pay form', async () => {
        billPaymentData = TestData['BillPaymentData'];
        await AccountServicesPage.clickBillPayLink();
        await eyes.check('Bill Payment page', Target.window().fully());
        await BillPayPage.fillBillPaymentForm(billPaymentData, secondAccountNumber, firstAccountNumber);
    });

    it('Validate the details on Bill Pay confirmation screen are correct', async () => {
        await eyes.check('Bill Payment confrmation page', Target.window().fully());
        await BillPayPage.validateBillPayConfirmationDetails(billPaymentData.name, billPaymentData.amount, firstAccountNumber);
    });


    it('Validate the Bill payment transactions across two new accounts', async () => {

        /* First Account - Donor Account Validation */
        await AccountServicesPage.clickAccountsOverviewLink();
        await AccountsOverviewPage.openAccountFromOverviewPage(firstAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();

        var newBalance = parseFloat(firstAccountBalance.replace(/[^\d\.]/, '')) - parseFloat(billPaymentData.amount);
        newBalance = AccountDetailsPage.convertNumberToCurrencyAmount(newBalance);
        var newAvlBalance = parseFloat(firstAccountAvlBalance.replace(/[^\d\.]/, '')) - parseFloat(billPaymentData.amount);
        if (newAvlBalance < 0) newAvlBalance = 0  // Avaialble balance = 0 for negative balance
        newAvlBalance = AccountDetailsPage.convertNumberToCurrencyAmount(newAvlBalance);
        await AccountDetailsPage.validateAccountBalance(newBalance, newAvlBalance);
        await eyes.check('Account Details - Donor account Page', Target.window().fully());


        /* Second Account - Reciever Account Validation */
        await AccountServicesPage.clickAccountsOverviewLink();
        await AccountsOverviewPage.openAccountFromOverviewPage(secondAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();
        var newAccBalance = parseFloat(secondAccountBalance.replace(/[^\d\.]/, '')) + parseFloat(billPaymentData.amount);
        var newAccAvlBalance = parseFloat(secondAccountAvlBalance.replace(/[^\d\.]/, '')) + parseFloat(billPaymentData.amount);
        if (newAccAvlBalance < 0) newAccAvlBalance = 0  // Avaialble balance = 0 for negative balance
        newAccBalance = AccountDetailsPage.convertNumberToCurrencyAmount(newAccBalance);
        newAccAvlBalance = AccountDetailsPage.convertNumberToCurrencyAmount(newAccAvlBalance);
        await AccountDetailsPage.validateAccountBalance(newAccBalance, newAccAvlBalance);
        await eyes.check('Account Details - receiver account Page', Target.window().fully());

    });


    afterEach(async () => {
        await eyes.closeAsync();
    });

    after(async () => {
        const results = await runner.getAllTestResults();
        console.log(results);
    });


});



