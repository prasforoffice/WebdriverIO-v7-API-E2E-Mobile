//#### REFACTORED ####
const { expect } = require('chai');
const supertest = require('supertest');
const addContext = require('mochawesome/addContext');
const fs = require('fs'); 
const Yaml = require('js-yaml');


const url = 'https://parabank.parasoft.com';
var agent = supertest.agent(url);
var transferAmount = "200";
var payeeName = "John Travolta";
const TestData = Yaml.load(fs.readFileSync('./test/testData/userInputs.yml')); //To read the test data yaml file

const apiResponsePath = 'test/reports/apiResponse/';

var firstAccount, secondAccount, firstAccountBalance, secondAccountBalance, sourceAccount;



describe('ParaBank Assignment', function () {


    describe('Create 2 new accounts and complete Bill Transfer between them ', function () {


        /** 
        * Login
        */

        it('should login to Parabank with valid credentials', async () => {
            var credentials = `username=${TestData['LoginData'].username}&password=${TestData['LoginData'].password}`;
            const res = await agent
                .post('/parabank/login.htm')
                .send(credentials)
                .set('Accept', 'text/html')
                .expect(302);

        });



        /** 
        * GetAccount details
        */

        it('should correctly make an authenticated GET request - accounts', async () => {
            const res = await agent
                .get('/parabank/services_proxy/bank/customers/12212/accounts')
                .expect(200);

            res.body.some(element => {
                if (parseFloat(element.balance) > 200) {
                    sourceAccount = element.id;
                    return true;
                }
            });

            fs.writeFileSync(apiResponsePath+'getAccounts.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });

           

        });



        /** 
        * Create 1st  Account 
        */

        it('should correctly make an authenticated POST request to create first account', async () => {
            var openFirstAccountPath = `customerId=12212&newAccountType=0&fromAccountId=${sourceAccount}`;
            var param = '/parabank/services_proxy/bank/createAccount?' + openFirstAccountPath;
            const res = await agent
                .post(param)
                .expect(200);

            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('type', "CHECKING");
            expect(res.body).to.have.property('customerId');
            expect(res.body).to.have.property('balance');

            firstAccount = res.body.id;  // storing the first account from response
            firstAccountBalance = res.body.balance; // storing the first account balance from response
            console.log("firstAccountBalance " + firstAccountBalance);

            fs.writeFileSync(apiResponsePath+'firstAccount.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });
        });


        // /** 
        // * Create 2nd  Account 
        // */

        it('should correctly make an authenticated POST request to create second account', async () => {
            var openSecondAccountPath = `customerId=12212&newAccountType=1&fromAccountId=${sourceAccount}`;
            var param = '/parabank/services_proxy/bank/createAccount?' + openSecondAccountPath;
            const res = await agent
                .post(param)
                .expect(200);

            secondAccount = res.body.id;   // storing the 2nd account from response
            secondAccountBalance = res.body.balance;  // storing the 2nd account balance from response
            console.log("secondAccountBalance " + secondAccountBalance);
            fs.writeFileSync(apiResponsePath+'secondAccount.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });
        });



        /** 
        * Bill Payment & Verification
        */


        it('should correctly make an authenticated POST request to make Bill Payment between newly created accounts', async () => {
            var billPayementParam = `accountId=${firstAccount}&amount=${transferAmount}`
            var path = '/parabank/services_proxy/bank/billpay?' + billPayementParam;
            var billPayRequestPayload =
            {
                "address":
                {
                    "street": "XYZ Apartment 123 Street India",
                    "city": "Kolkata",
                    "state": "West Bengal",
                    "zipCode": "700001"
                },
                "name": `${payeeName}`,
                "phoneNumber": "9999999999",
                "accountNumber": `${secondAccount}`
            }

            const res = await agent
                .post(path)
                .send(billPayRequestPayload)
                .set('Accept', 'application/json, text/plain, */*')
                .expect(200);

            res_payeeName = res.body.payeeName;
            res_amount = res.body.amount;
            res_accountId = res.body.accountId;

            fs.writeFileSync(apiResponsePath+'Bill_Payment.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });


            expect(res_payeeName).to.equal(payeeName);
            expect(res_amount).to.equal(parseFloat(transferAmount));
            expect(res_accountId).to.equal(parseInt(firstAccount));



        });

        // /** 
        //  * First  Account Verification
        //  */

        it('should make an authenticated GET request to collect and validate the updated balances of donor account', async () => {
            var account = firstAccount;
            console.log("FIRST BALANCE"+ parseFloat(firstAccountBalance) - parseFloat(transferAmount));
            var path = `/parabank/services_proxy/bank/accounts/${account}`;
            const res = await agent
                .get(path)
                .expect(200);

            var accountId = res.body.id;
            var balance = res.body.balance;
            var customerId = res.body.customerId;
            var accountType = res.body.type;

            fs.writeFileSync(apiResponsePath+'First_Account_Details.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });

            expect(accountId).to.equal(parseInt(firstAccount));
           
            expect(balance).to.equal((parseFloat(firstAccountBalance) - parseFloat(transferAmount)));
            expect(customerId).to.equal(12212);
            expect(accountType).to.equal("CHECKING");

  

        });


        it('should make an authenticated GET request and validate the transaction of the donor account', async () => {
            var account = firstAccount;
            var path = `/parabank/services_proxy/bank/accounts/${account}/transactions`
            const res = await agent
                .get(path)
                .expect(200);

                fs.writeFileSync(apiResponsePath+'First_Account_Tansaction_Details.json',JSON.stringify(res.body),function(err){
                    if (err) {
                        console.log(err);
                    }
                });


            res.body.some(element => {
                if (element.description.includes("Bill Payment to " + payeeName)) {
                    expect(element.amount).to.be.equal(parseFloat(transferAmount));
                    expect(element.type).to.be.equal("Debit");
                    expect(element.accountId).to.be.equal(parseInt(firstAccount));
                    return true;

                }

            });


        });

        /** 
         * Second Account Verification
         */

        it('should make an authenticated GET request to collect and validate the updated balances of receiver account', async () => {
            var account = secondAccount;
            console.log("BALANCE TO " + (parseFloat(secondAccountBalance) + parseFloat(transferAmount)));
            var path = `/parabank/services_proxy/bank/accounts/${account}`;
            const res = await agent
                .get(path)
                .expect(200);

            var accountId = res.body.id;
            var balance = res.body.balance;
            var customerId = res.body.customerId;
            var accountType = res.body.type;

            fs.writeFileSync(apiResponsePath+'Second_Account_Details.json',JSON.stringify(res.body),function(err){
                if (err) {
                    console.log(err);
                }
            });

            expect(accountId).to.equal(parseInt(account));
           
            expect(balance).to.equal((parseFloat(secondAccountBalance) + parseFloat(transferAmount)));
            expect(customerId).to.equal(12212);
            expect(accountType).to.equal("SAVINGS");




        });


        it('should make an authenticated GET request and validate the transaction of the receiver account', async () => {
            var account = secondAccount;
            var path = `/parabank/services_proxy/bank/accounts/${account}/transactions`
            const res = await agent
                .get(path)
                .expect(200);

            fs.writeFileSync(apiResponsePath+'Second_Account_Transaction_Details.json',JSON.stringify(res.body),function(err){
                    if (err) {
                        console.log(err);
                    }
            });
            res.body.some(element => {
                if (element.description.includes("Funds Transfer Received")) {
                    expect(element.amount).to.be.equal(parseFloat(transferAmount));
                    expect(element.type).to.be.equal("Credit");
                    expect(element.accountId).to.be.equal(parseInt(account));
                    return true;
                }

            });

  

        });
    });
});



