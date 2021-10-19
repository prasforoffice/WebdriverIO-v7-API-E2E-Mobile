# assignmentsAB

This is an E2E integration tests project for testing ParaBank application (https://parabank.parasoft.com/parabank/index.htm).In this project user interacts with Parabank web application and creates new accounts, carries out Bill payment transactions and perfroms relevant validations across screens.

These tests are developed in Javascript with [WebDriverIO V7](http://webdriver.io/) and [Mocha](https://mochajs.org/)


## Features

-   Javascript
-   Page Object Design Pattern
-   [Applitools Eyes](https://info.applitools.com/ucY76)
-   Spec reporter
-   Allure report (screenshots on failure as well passed steps)
-   SuperTest for API testing
-   Automatic capture and export of API response 
-   Mocha awesome report for API tests

## Requirements

-   node >= 14.x.x - [how to install Node](https://nodejs.org/en/download/)
-   npm >= 6.14.x - [how to install NPM](https://www.npmjs.com/get-npm)
-   An Applitools account and the API KEY . In case its not available then a new account can be created from https://auth.applitools.com/users/register 
-   APPLITOOLS KEY : Collect the API Key by clicking the  'My API Key' under the Applitools account section.Paste the Key in this filepath - test/testData/keys.yml


## Config Files

-  WebdriverIO configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `./test/config/` directory and end with `*.conf.js`.  These can be called via the the cli.

## Getting Started

### Install the dependencies:
        npm install

### Run e2e tests:
        npm run test:e2e

### Run visual regression test (Applitools):
        npm run tests:vr

### Run API tests :
        npm run tests:api


## Reports

### Spec
Test reporter, that prints detailed results to console.

### Allure
Run this command to generate the allure report in the directory `./test/reports/allure-report`:


        npm run report:generate

You can run this command to start a server on your machine and open the allure report on the browser:

        npm run report:open


### Mocha Awesome Report
Mocha HTML report with ApiTestReport.html would be generated in this path - test/reports/apiTest

### Automatic API response export 
Responses of API services captured can be found in it respective files under path test/reports/apiResponse

