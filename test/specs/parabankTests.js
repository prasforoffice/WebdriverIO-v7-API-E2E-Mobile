const {
    ClassicRunner,
    RunnerOptions,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation
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

describe('Verification of opening two new accounts for both account types - CHECKING and SAVINGS', () => {

    var firstAccountNumber, secondAccountNumber, firstAccountBalance, secondAccountBalance;
    var billPaymentData, secondAccountData, firstAccountData;

    before(async () => {
        const runnerOptions = new RunnerOptions().testConcurrency(5);
        runner = new ClassicRunner(runnerOptions);
        eyes = new Eyes(runner);
        if (browser.config.enableEyesLogs) {
            eyes.setLogHandler(new ConsoleLogHandler(true));
        }
        configuration = eyes.getConfiguration();
        configuration.setApiKey("ArQif7103nbl107H5mbRjg7kI5LpQzokSnonnp4RUvQ0z2A110")
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
       
    });

    // Section for creating 1st account

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

    //Section for creating 2nd account

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
        /* First account verification */
        await AccountServicesPage.clickAccountsOverviewLink();
        await AccountsOverviewPage.openAccountFromOverviewPage(secondAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();
        await AccountDetailsPage.validateAccountBalance(secondAccountBalance, secondAccountAvlBalance);
        await eyes.check('Account Details - account #1 Page', Target.window().fully());

        /*  Second account verification */
        await AccountServicesPage.clickAccountsOverviewLink();
        await AccountsOverviewPage.openAccountFromOverviewPage(firstAccountNumber);
        await AccountDetailsPage.checkIfAccountDetailsScreenLoaded();
        var currentBalance = parseFloat(firstAccountBalance.replace(/[^\d\.]/, '')) - 200;
        currentBalance = AccountDetailsPage.convertNumberToCurrencyAmount(currentBalance);
        await AccountDetailsPage.validateAccountBalance(currentBalance, AccountDetailsPage.convertNumberToCurrencyAmount("0"));
        await eyes.check('Account Details - account #2 Page', Target.window().fully());
        await eyes.closeAsync();
    });


    afterEach(async () => {
        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortAsync();
      });
      
      after(async () => {
        const results = await runner.getAllTestResults();
        console.log(results);
      });


});



