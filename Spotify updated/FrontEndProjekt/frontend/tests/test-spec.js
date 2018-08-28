describe('angularjs test cases', () => {

  it('should get the title Frontend', () => {
    browser.waitForAngularEnabled(false);
    browser.get('http://localhost:4200/');

    expect(browser.getTitle()).toEqual('Frontend');
  });

  it('should test if the awesome face is displayed', () => {
    browser.waitForAngularEnabled(false);
    browser.get('http://localhost:4200/');

    expect(element(by.id('default_picture')).isDisplayed()).toBe(true);
  });

  it('should test if a playlst could be added', () => {
    browser.waitForAngularEnabled(false);
    browser.get('http://localhost:4200/');

    element(by.id('add_playlist_btn')).click();
    element(by.id('playlist_inputfield')).sendKeys('JochensBestOfVol');
    element(by.id('ok_btn')).click();

    browser.get('http://localhost:4200/playlist/JochensBestOfVol');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/playlist/JochensBestOfVol');
  })
});
