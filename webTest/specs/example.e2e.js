// ui tests

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        const page = await browser.url(`http://127.0.0.1:5500/src/index.html`);
        const $board = await $('#board');

        await expect($board).toBeDisplayed();
        await expect(await $('.square-h2 img').getAttribute('data-piece')).toEqual('wP');
        await $('.square-h2 img').moveTo();
        expect(await $$('.highlight')).toHaveLength(3);
        await expect(await $('.square-h2.highlight')).toExist();

    });
});


