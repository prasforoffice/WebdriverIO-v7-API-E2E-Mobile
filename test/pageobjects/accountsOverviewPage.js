const Page = require('./page');
const WebTable = require('./webTable');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountsOverviewPage extends Page {

    /**
     * define selectors using getter methods
     */
    // 


    get accountsOverviewTitle() { return $('.title=Accounts Overview') };
    // get accountTable() { return $$('*=activity.htm?id=') };
    // get accountTable() { return $$('//*[@id="accountTable"]/tbody/tr') };


    async openAccountFromOverviewPage(accountNumber) {

        // var webTable = new WebTable($('//*[@id="accountTable"]'));
        // console.log("No of rows : "+webTable.getRowCount())

		// console.log("No of Columns : "+webTable.getColumnCount())

		// console.log("No Of rows : " +webTable.getTableSize())

		// console.log("Nof Of columns : " +webTable.getTableSize())

		// console.log("Data in row : " +webTable.rowData(1))

		// console.log("Data in Column : " +webTable.columnData(1))

		// console.log("Cell data : " +webTable.getCellData(1, 2))

		// console.log("Presence of data : "+webTable.presenceOfData("accountNumber"))

		// console.log("Total data : " +webTable.getAllData())

        
        await expect(this.accountsOverviewTitle).toBeExisting();
        await browser.pause(5000);
        
        const accountTable= await $$('//*[@id="accountTable"]/tbody/tr') ;
        
        // const accountTable= await $$('//*[@id="accountTable"]/tbody/tr') ;


        console.log("LENGTH=" + accountTable.length);


        for(let i=0;i<accountTable.length;i++){
            let text =  await accountTable[0].getText();
            console.log("VALUE= " + text);
            
            if(text.includes(accountNumber)){
                // await accountTable[i].click();
                const link = await accountTable[i].$$("//td["+i+"]/a") //.$('a');
               
                // const link= await $$('//*[@id="accountTable"]/tbody/tr[1]/td[1]/a') ;
                await link.click();

                await use(2000);
                break;
            }
        }

   
    }







}

module.exports = new AccountsOverviewPage();
