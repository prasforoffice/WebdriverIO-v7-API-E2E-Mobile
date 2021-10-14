
const { expect } = require('chai');
const supertest = require('supertest');
const addContext = require('mochawesome/addContext');

var url = 'https://parabank.parasoft.com';
var agent = supertest.agent(url);
var credentials = 'username=john&password=demo';

var openFirstAccountParam = 'customerId=12212&newAccountType=0&fromAccountId=12345';
var openSecondAccountParam = 'customerId=12212&newAccountType=1&fromAccountId=12345';


var firstAccount, firstAccountBalance, firstAccountAvlBalance
var secondAccount, secondAccountBalance, secondAccountAvlBalance

describe('ParaBank Assignment', function () {

    describe('Bill Transfer across 2 new accounts', function () {


        /** 
        * Login
        */

        it('should login to Parabank with valid credentials', async () => {
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
                console.log(JSON.stringify(res.body));

        });



        // /** 
        // * Create 1st  Account 
        // */

        // it('should correctly make an authenticated POST request to create first account', async () => {
        //     var param = '/parabank/services_proxy/bank/createAccount?' + openFirstAccountParam;
        //     console.log("FIRST PARAM=" + param);
        //     const res = await agent
        //         .post(param)
        //         .expect(200);

        //     expect(res.body).to.have.property('id');
        //     expect(res.body).to.have.property('type',"CHECKING");
        //     expect(res.body).to.have.property('customerId');
        //     expect(res.body).to.have.property('balance');

        //     console.log("FIRST RES:=" + JSON.stringify(res.body));
        //     firstAccount = res.body.id;
        //     firstAccountBalance = res.body.balance;
        //     console.log("ID = " + firstAccount);
        //     console.log("BALANCE = " + firstAccountBalance);
        // });


        // // /** 
        // // * Create 2nd  Account 
        // // */

        // it('should correctly make an authenticated POST request to create second account', async () => {
        //     var param = '/parabank/services_proxy/bank/createAccount?' + openSecondAccountParam;
        //     console.log("SECOND PARAM=" + param);
        //     const res = await agent
        //         .post(param)
        //         .expect(200);
        //     console.log("SECOND RES:=" + JSON.stringify(res.body));
        //     secondAccount = res.body.id;
        //     secondAccountBalance = res.body.balance;
        //     console.log("2nd ID = " + secondAccount);
        //     console.log("2nd BALANCE = " + secondAccountBalance);
        // });



        // // /** 
        // // * Bill Payment & Verification
        // // */


        // it('should correctly make an authenticated POST request to make Bill Payment between newly created accounts', async () => {
        //     var amount = "200";
        //     var payeeName = "John Travolta";
        //     var billPayementParam = `accountId=${firstAccount}&amount=${amount}`
        //     var billPayRequestPayload =
        //     {
        //         "address":
        //         {
        //             "street": "XYZ Apartment 123 Street India",
        //             "city": "Kolkata",
        //             "state": "West Bengal",
        //             "zipCode": "700001"
        //         },
        //         "name": `${payeeName}`,
        //         "phoneNumber": "9999999999",
        //         "accountNumber": `${secondAccount}`
        //     }

        //     var param = '/parabank/services_proxy/bank/billpay?' + billPayementParam;
        //     console.log("PARAM=" + param);
        //     const res = await agent
        //         .post(param)
        //         .send(billPayRequestPayload)
        //         .set('Accept', 'application/json, text/plain, */*')
        //         .expect(200);
        //     console.log("BILL RES:=" + JSON.stringify(res.body));

        //     res_payeeName = res.body.payeeName;
        //     res_amount = res.body.amount;
        //     res_accountId = res.body.accountId;

        //     console.log("Bill PayeeName = " + res_payeeName);
        //     console.log("Bill Amount = " + res_amount);
        //     console.log("Bill AccountId = " + res_accountId);

        //     expect(res_payeeName).to.equal(payeeName);
        //     expect(res_amount).to.equal(parseFloat(amount));
        //     expect(res_accountId).to.equal(parseInt(firstAccount));

        // });

        // // /** 
        // //  * First  Account Verification
        // //  */

        // it('should make an authenticated GET request to collect and validate the updated balances of donor account', async () => {
        //     var account = firstAccount;

        //     var path = `/parabank/services_proxy/bank/accounts/${account}`;
        //     console.log("PATH=" + path)
        //     const res = await agent
        //         .get(path)
        //         .expect(200);

        //     console.log("ACCOUNT DETAILS= " + JSON.stringify(res.body));

        //     var accountId = res.body.id;
        //     var balance = res.body.balance;
        //     var customerId = res.body.customerId;
        //     var accountType = res.body.type;

        //     console.log(`balance ${balance} , customerId = ${customerId}  , accountId = ${accountId} , accountType = ${accountType} `)

        //     expect(accountId).to.equal(parseInt(firstAccount));
        //     expect(balance).to.equal(-100);
        //     expect(customerId).to.equal(12212);
        //     expect(accountType).to.equal("CHECKING");

        // });


        // it('should make an authenticated GET request and validate the transaction of the donor account', async () => {
        //     var account = firstAccount;
        //     var path = `/parabank/services_proxy/bank/accounts/${account}/transactions`
        //     console.log("PATH=" + path)

        //     const res = await agent
        //         .get(path)
        //         .expect(200);

        //     console.log("TRANSACTION RES:=" + JSON.stringify(res.body));

        //     res.body.forEach(element => {

        //         console.log("DESCRIPTION " + element.description);
        //         console.log("Transaction ID " + element.id);
        //         console.log("Account ID " + element.accountId);
        //         console.log("TYPE " + element.type);
        //         console.log("AMOUNT " + element.amount);

        //         if (element.description.includes("Bill Payment to")) {
        //             expect(element.amount).to.be.equal(200);
        //             expect(element.type).to.be.equal("Debit");
        //             expect(element.accountId).to.be.equal(parseInt(firstAccount));


        //         }

        //     });
        // });

        // /** 
        //  * Second Account Verification
        //  */

        // it('should make an authenticated GET request to collect and validate the updated balances of donor account', async () => {
        //     var account = secondAccount;

        //     var path = `/parabank/services_proxy/bank/accounts/${account}`;
        //     console.log("PATH=" + path)
        //     const res = await agent
        //         .get(path)
        //         .expect(200);

        //     console.log("2nd ACCOUNT DETAILS= " + JSON.stringify(res.body));

        //     var accountId = res.body.id;
        //     var balance = res.body.balance;
        //     var customerId = res.body.customerId;
        //     var accountType = res.body.type;

        //     console.log(`balance ${balance} , customerId = ${customerId}  , accountId = ${accountId} , accountType = ${accountType} `)

        //     expect(accountId).to.equal(parseInt(account));
        //     expect(balance).to.equal(100);
        //     expect(customerId).to.equal(12212);
        //     expect(accountType).to.equal("SAVINGS");

        // });


        // it('should make an authenticated GET request and validate the transaction of the donor account', async () => {
        //     var account = secondAccount;
        //     var path = `/parabank/services_proxy/bank/accounts/${account}/transactions`
        //     console.log("PATH=" + path)

        //     const res = await agent
        //         .get(path)
        //         .expect(200);

        //     console.log("TRANSACTION 2nd RES:=" + JSON.stringify(res.body));



        //     res.body.forEach(element => {

        //         console.log("DESCRIPTION " + element.description);
        //         console.log("ID " + element.id);
        //         console.log("Account ID " + element.accountId);
        //         console.log("TYPE " + element.type);
        //         console.log("AMOUNT " + element.amount);

        //         if (element.description.includes("Funds Transfer Received")) {
        //             expect(element.amount).to.be.equal(100);
        //             expect(element.type).to.be.equal("Credit");
        //             expect(element.accountId).to.be.equal(parseInt(account));
        //         }

        //     });
        // });
    });
});



