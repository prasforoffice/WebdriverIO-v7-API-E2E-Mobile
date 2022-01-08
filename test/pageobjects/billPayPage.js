const Page = require('./page');
const ActionHelper = require('./../support/actionHelpers');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class BillPayPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 


    get billPaymentTitle() { return $('.title=Bill Payment Service') };
    get payeeNameTextbox() { return $('[name="payee.name"]') };
    get payeeAddressTextbox() { return $('[name="payee.address.street"]') };
    get payeeAddressCityTextbox() { return $('[name="payee.address.city"]') };
    get payeeAddressStateTextbox() { return $('[name="payee.address.state"]') };
    get payeeAddressZipTextbox() { return $('[name="payee.address.zipCode"]') };
    get payeePhoneNumberTextbox() { return $('[name="payee.phoneNumber"]') };
    get payeeAccountNumberTextbox() { return $('[name="payee.accountNumber"]') };
    get payeeVerifyAccountTextbox() { return $('[name="verifyAccount"]') };
    get amountTextbox() { return $('[name="amount"]') };
    get fromAccountList() { return $('[name="fromAccountId"]') };
    get submitButton() { return $('[value="Send Payment"]') };

    //Confirmation screen
    get billPaymentCompleteTitle() { return $('.title=Bill Payment Complete') };
    get confirmation_payeeName() { return $('#payeeName') };
    get confirmation_amount() { return $('#amount') };
    get confirmation_fromAccountNumber() { return $('#fromAccountId') };


    async fillBillPaymentForm(testData, toAccountNumber, fromAccountNumber) {
        await expect(this.billPaymentTitle).toBeExisting();
        await this.payeeNameTextbox.setValue(testData.name);

        await this.payeeAddressTextbox.setValue(testData.address);
        await this.payeeAddressCityTextbox.setValue(testData.city);
        await this.payeeAddressStateTextbox.setValue(testData.state);
        await this.payeeAddressZipTextbox.setValue(testData.pin);
        await this.payeePhoneNumberTextbox.setValue(testData.phone);

        await this.payeeAccountNumberTextbox.setValue(toAccountNumber);
        await this.payeeVerifyAccountTextbox.setValue(toAccountNumber);
        await this.amountTextbox.setValue(testData.amount);

        (fromAccountNumber) ? await this.fromAccountList.selectByAttribute('value', fromAccountNumber) : await this.fromAccountList.selectByAttribute('value', 0);
        await ActionHelper.pressKeyTab();
        await ActionHelper.pressKeyEnter();
        // await this.submitButton.click();
        await expect(this.billPaymentCompleteTitle).toBeExisting();
    }


    async validateBillPayConfirmationDetails(payeeName, amount, fromAccountNumber) {
        await expect(this.confirmation_payeeName).toHaveTextContaining(payeeName);
        await expect(this.confirmation_amount).toHaveTextContaining(amount);
        await expect(this.confirmation_fromAccountNumber).toHaveTextContaining(fromAccountNumber);
    }





}

module.exports = new BillPayPage();
