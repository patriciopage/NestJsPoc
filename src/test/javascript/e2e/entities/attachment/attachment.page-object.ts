import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AttachmentUpdatePage from './attachment-update.page-object';

const expect = chai.expect;
export class AttachmentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.attachment.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-attachment'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AttachmentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('attachment-heading'));
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
    await navBarPage.getEntityPage('attachment');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAttachment() {
    await this.createButton.click();
    return new AttachmentUpdatePage();
  }

  async deleteAttachment() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const attachmentDeleteDialog = new AttachmentDeleteDialog();
    await waitUntilDisplayed(attachmentDeleteDialog.deleteModal);
    expect(await attachmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.attachment.delete.question/);
    await attachmentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(attachmentDeleteDialog.deleteModal);

    expect(await isVisible(attachmentDeleteDialog.deleteModal)).to.be.false;
  }
}
