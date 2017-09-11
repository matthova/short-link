/* global browser, describe, expect, it */
describe('Login-logout functionality', () => {
  it('should not be able to reach "/links" when not signed in', () => {
    browser.url('http://localhost:3000');
    console.log('eyyy', browser.getTitle());
    expect(true).to.equal(false);
  });
  it('should be able to reach the login page when not signed in', () => {
    expect(true).to.equal(false);
  });
  it('should be able to reach the signup page when not signed in', () => {
    expect(true).to.equal(false);
  });
  it('should be redirected to the "login" page when not signed in and visiting the "links" page', () => {
    expect(true).to.equal(false);
  });
  it('should be able to reach the "links" page when signed in', () => {
    expect(true).to.equal(false);
  });
  it('should be redirected to the "links" page when signed in and vists the "login" page', () => {
    expect(true).to.equal(false);
  });
  it('should be redirected to the "links" page when signed in and visits the "signup" page', () => {
    expect(true).to.equal(false);
  });
  it('should be able to reach the login page when not signed in', () => {
    expect(true).to.equal(false);
  });
  it('should be able to reach the login page when not signed in', () => {
    expect(true).to.equal(false);
  });
  it('should be able to reach the login page when not signed in', () => {
    expect(true).to.equal(false);
  });
});
