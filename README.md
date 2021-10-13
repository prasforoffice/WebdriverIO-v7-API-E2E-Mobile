# assignmentsAB

This is an E2E integration tests project for testing ParaBank application (https://parabank.parasoft.com/parabank/index.htm).In this project user interacts with Parabank web application and creates new accounts, carries out Bill payment transactions and perfroms relevant validations across screens.

These tests are developed in Javascript with [WebDriverIO V7](http://webdriver.io/) and [Mocha](https://mochajs.org/)


## Features

-   Javascript
-   Page Object Design Pattern
-   [Applitools Eyes](https://info.applitools.com/ucY76)
-   Spec reporter
-   Allure report (screenshots on failure as well passed steps)


## Requirements

-   node >= 14.x.x - [how to install Node](https://nodejs.org/en/download/)
-   npm >= 6.14.x - [how to install NPM](https://www.npmjs.com/get-npm)

## Config Files

 WebdriverIO configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `./test/config/` directory and end with `*.conf.js`.  These can be called via the the cli.

## Getting Started

### Install the dependencies:

```bash
npm install
```


### Run e2e tests:

```bash
npm run test:e2e
```

### Run visual regression tests using Applitools:

```bash
npm run tests:vr
```

## Reports

### Spec

Test reporter, that prints detailed results to console.

### Allure

Run this command to generate the allure report in the directory `./test/reports/allure-report`:

```bash
npm run report:generate
```

You can run this command to start a server on your machine and open the allure report on the browser:

```bash
npm run report:open
```

