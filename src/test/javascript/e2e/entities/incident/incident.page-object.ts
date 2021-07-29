import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import IncidentUpdatePage from './incident-update.page-object';

const expect = chai.expect;
export class IncidentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.incident.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-incident'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class IncidentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('incident-heading'));
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
    await navBarPage.getEntityPage('incident');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateIncident() {
    await this.createButton.click();
    return new IncidentUpdatePage();
  }

  async deleteIncident() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const incidentDeleteDialog = new IncidentDeleteDialog();
    await waitUntilDisplayed(incidentDeleteDialog.deleteModal);
    expect(await incidentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.incident.delete.question/);
    await incidentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(incidentDeleteDialog.deleteModal);

    expect(await isVisible(incidentDeleteDialog.deleteModal)).to.be.false;
  }
}
