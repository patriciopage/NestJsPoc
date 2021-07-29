import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ObservationUpdatePage from './observation-update.page-object';

const expect = chai.expect;
export class ObservationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.observation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-observation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ObservationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('observation-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('observation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateObservation() {
    await this.createButton.click();
    return new ObservationUpdatePage();
  }

  async deleteObservation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const observationDeleteDialog = new ObservationDeleteDialog();
    await waitUntilDisplayed(observationDeleteDialog.deleteModal);
    expect(await observationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.observation.delete.question/);
    await observationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(observationDeleteDialog.deleteModal);

    expect(await isVisible(observationDeleteDialog.deleteModal)).to.be.false;
  }
}
