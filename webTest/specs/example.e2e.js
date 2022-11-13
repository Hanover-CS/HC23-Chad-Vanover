// const { BrowserView } = require('electron');
// const LoginPage = require('../pageobjects/login.page');
// const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        const page = await browser.url(`http://127.0.0.1:5500/src/index.html`);
        const $board = await $('#board');
        // const $square = await $board.$('.square-h2');
        // const $img = await $('.square-h2 img');
        expect($board).toBeDisplayed();
        expect(await $('.square-h2 img').getAttribute('data-piece')).toEqual('wP');
        await $('.square-h2 img').moveTo();
        // await LoginPage.open();

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        // await expect(SecurePage.flashAlert).toBeExisting();
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!');
    });
});


