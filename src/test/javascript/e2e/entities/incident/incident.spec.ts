import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IncidentComponentsPage from './incident.page-object';
import IncidentUpdatePage from './incident-update.page-object';
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

describe('Incident e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let incidentComponentsPage: IncidentComponentsPage;
  let incidentUpdatePage: IncidentUpdatePage;
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
    incidentComponentsPage = new IncidentComponentsPage();
    incidentComponentsPage = await incidentComponentsPage.goToPage(navBarPage);
  });

  it('should load Incidents', async () => {
    expect(await incidentComponentsPage.title.getText()).to.match(/Incidents/);
    expect(await incidentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Incidents', async () => {
    const beforeRecordsCount = (await isVisible(incidentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(incidentComponentsPage.table);
    incidentUpdatePage = await incidentComponentsPage.goToCreateIncident();
    await incidentUpdatePage.enterData();

    expect(await incidentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(incidentComponentsPage.table);
    await waitUntilCount(incidentComponentsPage.records, beforeRecordsCount + 1);
    expect(await incidentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await incidentComponentsPage.deleteIncident();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(incidentComponentsPage.records, beforeRecordsCount);
      expect(await incidentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(incidentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
