describe('Button component', () => {
    beforeEach(() => {browser.get('http://localhost:8000/#/e2e')});

    it('should have same content as passed', () => {
       let button1 = element(by.id('bt-button1'));
       expect(button1.getText()).toEqual('bt-button1');
    });
});
