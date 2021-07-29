import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CommentComponentsPage from './comment.page-object';
import CommentUpdatePage from './comment-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Comment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentComponentsPage: CommentComponentsPage;
  let commentUpdatePage: CommentUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    commentComponentsPage = new CommentComponentsPage();
    commentComponentsPage = await commentComponentsPage.goToPage(navBarPage);
  });

  it('should load Comments', async () => {
    expect(await commentComponentsPage.title.getText()).to.match(/Comments/);
    expect(await commentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Comments', async () => {
    const beforeRecordsCount = (await isVisible(commentComponentsPage.noRecords)) ? 0 : await getRecordsCount(commentComponentsPage.table);
    commentUpdatePage = await commentComponentsPage.goToCreateComment();
    await commentUpdatePage.enterData();

    expect(await commentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(commentComponentsPage.table);
    await waitUntilCount(commentComponentsPage.records, beforeRecordsCount + 1);
    expect(await commentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await commentComponentsPage.deleteComment();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(commentComponentsPage.records, beforeRecordsCount);
      expect(await commentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(commentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
