import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AttachmentComponentsPage from './attachment.page-object';
import AttachmentUpdatePage from './attachment-update.page-object';
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

describe('Attachment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let attachmentComponentsPage: AttachmentComponentsPage;
  let attachmentUpdatePage: AttachmentUpdatePage;
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
    attachmentComponentsPage = new AttachmentComponentsPage();
    attachmentComponentsPage = await attachmentComponentsPage.goToPage(navBarPage);
  });

  it('should load Attachments', async () => {
    expect(await attachmentComponentsPage.title.getText()).to.match(/Attachments/);
    expect(await attachmentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Attachments', async () => {
    const beforeRecordsCount = (await isVisible(attachmentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(attachmentComponentsPage.table);
    attachmentUpdatePage = await attachmentComponentsPage.goToCreateAttachment();
    await attachmentUpdatePage.enterData();

    expect(await attachmentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(attachmentComponentsPage.table);
    await waitUntilCount(attachmentComponentsPage.records, beforeRecordsCount + 1);
    expect(await attachmentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await attachmentComponentsPage.deleteAttachment();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(attachmentComponentsPage.records, beforeRecordsCount);
      expect(await attachmentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(attachmentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
