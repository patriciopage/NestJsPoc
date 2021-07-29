import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AgentComponentsPage from './agent.page-object';
import AgentUpdatePage from './agent-update.page-object';
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

describe('Agent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agentComponentsPage: AgentComponentsPage;
  let agentUpdatePage: AgentUpdatePage;
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
    agentComponentsPage = new AgentComponentsPage();
    agentComponentsPage = await agentComponentsPage.goToPage(navBarPage);
  });

  it('should load Agents', async () => {
    expect(await agentComponentsPage.title.getText()).to.match(/Agents/);
    expect(await agentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Agents', async () => {
    const beforeRecordsCount = (await isVisible(agentComponentsPage.noRecords)) ? 0 : await getRecordsCount(agentComponentsPage.table);
    agentUpdatePage = await agentComponentsPage.goToCreateAgent();
    await agentUpdatePage.enterData();

    expect(await agentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(agentComponentsPage.table);
    await waitUntilCount(agentComponentsPage.records, beforeRecordsCount + 1);
    expect(await agentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await agentComponentsPage.deleteAgent();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(agentComponentsPage.records, beforeRecordsCount);
      expect(await agentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(agentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
