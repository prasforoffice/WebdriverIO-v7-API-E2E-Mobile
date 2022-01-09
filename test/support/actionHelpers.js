module.exports = class ActionHelpers {
    
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        // return browser.url(`https://the-internet.herokuapp.com/${path}`)
        return browser.url(`/${path}`)
    }

    static pressKeyTab(){
        browser.keys("Tab");
        return browser.pause(1000);
    }
    static pressKeyEnter(){
        browser.keys("Enter");
        return browser.pause(1000);
    }


   

}