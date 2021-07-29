import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ConversationComponentsPage from './conversation.page-object';
import ConversationUpdatePage from './conversation-update.page-object';
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

describe('Conversation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conversationComponentsPage: ConversationComponentsPage;
  let conversationUpdatePage: ConversationUpdatePage;
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
    conversationComponentsPage = new ConversationComponentsPage();
    conversationComponentsPage = await conversationComponentsPage.goToPage(navBarPage);
  });

  it('should load Conversations', async () => {
    expect(await conversationComponentsPage.title.getText()).to.match(/Conversations/);
    expect(await conversationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Conversations', async () => {
    const beforeRecordsCount = (await isVisible(conversationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(conversationComponentsPage.table);
    conversationUpdatePage = await conversationComponentsPage.goToCreateConversation();
    await conversationUpdatePage.enterData();

    expect(await conversationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(conversationComponentsPage.table);
    await waitUntilCount(conversationComponentsPage.records, beforeRecordsCount + 1);
    expect(await conversationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await conversationComponentsPage.deleteConversation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(conversationComponentsPage.records, beforeRecordsCount);
      expect(await conversationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(conversationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
