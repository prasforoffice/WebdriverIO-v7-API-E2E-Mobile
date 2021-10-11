const Page = require('./page');

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

    get fromAccountTextbox() { return $('[name="fromAccountId"]') };
    get submitButton() { return $('[value="Send Payment"]') };




    async fillBillPaymentForm() {
        await expect(this.billPaymentTitle).toBeExisting();
        await this.payeeNameTextbox.setValue()

        
    }





}

module.exports = new BillPayPage();
