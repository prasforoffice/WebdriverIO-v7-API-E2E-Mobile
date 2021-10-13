
const supertest = require('supertest');
var url = 'https://parabank.parasoft.com';
var agent = supertest.agent(url);
var credentials = 'username=john&password=demo';
var openNewAccountParam = 'customerId=12212&newAccountType=0&fromAccountId=12345';

var firstAccount,firstAccountBalance,firstAccountAvlBalance
var secondAccount,secondAccountBalance,secondAccountAvlBalance

describe('ParaBank test', function() {
    describe('Login', function() {
        it('should login to Parabank with valid credentials', async (done) => {
            const res = await agent
                .post('/parabank/login.htm')
                .send(credentials)
                .set('Accept', 'text/html')
                .expect(302);
        });


        it('should correctly make an authenticated GET request - accounts', async (done) => {
            const res = await agent
                .get('/parabank/services_proxy/bank/customers/12212/accounts')
                .expect(200);
                console.log(JSON.stringify(res.body));

        }); 


        it('should correctly make an authenticated POST request to create first account', async (done) => {
            var param = '/parabank/services_proxy/bank/createAccount?'+openNewAccountParam;
            console.log("PARAM=" + param);
            const res = await agent
                .post(param)
                // .send(openNewAccountParam)
                .expect(200);
                // .then((res) => {
                //     expect(res.body).to.have.property('id');
                //     expect(res.body).to.have.property('type',"CHECKING");
                //     expect(res.body).to.have.property('customerId');
                //     expect(res.body).to.have.property('balance');
                //    });
                console.log("NEW RES:="+ JSON.stringify(res.body));
                firstAccount = res.body.id;
                firstAccountBalance = res.body.balance;
                console.log("ID = " + firstAccount);
                console.log("BALANCE = " + firstAccountBalance);
        }); 

        it('should correctly make an authenticated POST request to create second account', async (done) => {
            var param = '/parabank/services_proxy/bank/createAccount?'+openNewAccountParam;
            console.log("PARAM=" + param);
            const res = await agent
                .post(param)
                .expect(200);
                console.log("NEW RES:="+ JSON.stringify(res.body));
                secondAccount = res.body.id;
                secondAccountBalance = res.body.balance;
                console.log("2nd ID = " + firstAccount);
                console.log("2nd BALANCE = " + firstAccountBalance);
        }); 



        it('should correctly make an authenticated POST request to make Bill Payment between newly created accounts', async (done) => {
            var param = '/parabank/services_proxy/bank/billpay?'+billPayementParam;
            console.log("PARAM=" + param);
            const res = await agent
                .post(param)
                .expect(200);
                console.log("NEW RES:="+ JSON.stringify(res.body));
                secondAccount = res.body.id;
                secondAccountBalance = res.body.balance;
                console.log("2nd ID = " + firstAccount);
                console.log("2nd BALANCE = " + firstAccountBalance);
        }); 



    });
});



