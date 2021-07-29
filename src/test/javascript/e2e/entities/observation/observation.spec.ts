import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ObservationComponentsPage from './observation.page-object';
import ObservationUpdatePage from './observation-update.page-object';
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

describe('Observation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let observationComponentsPage: ObservationComponentsPage;
  let observationUpdatePage: ObservationUpdatePage;
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
    observationComponentsPage = new ObservationComponentsPage();
    observationComponentsPage = await observationComponentsPage.goToPage(navBarPage);
  });

  it('should load Observations', async () => {
    expect(await observationComponentsPage.title.getText()).to.match(/Observations/);
    expect(await observationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Observations', async () => {
    const beforeRecordsCount = (await isVisible(observationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(observationComponentsPage.table);
    observationUpdatePage = await observationComponentsPage.goToCreateObservation();
    await observationUpdatePage.enterData();

    expect(await observationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(observationComponentsPage.table);
    await waitUntilCount(observationComponentsPage.records, beforeRecordsCount + 1);
    expect(await observationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await observationComponentsPage.deleteObservation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(observationComponentsPage.records, beforeRecordsCount);
      expect(await observationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(observationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
