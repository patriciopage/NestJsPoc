import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CommentUpdatePage from './comment-update.page-object';

const expect = chai.expect;
export class CommentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.comment.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-comment'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CommentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('comment-heading'));
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
    await navBarPage.getEntityPage('comment');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateComment() {
    await this.createButton.click();
    return new CommentUpdatePage();
  }

  async deleteComment() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const commentDeleteDialog = new CommentDeleteDialog();
    await waitUntilDisplayed(commentDeleteDialog.deleteModal);
    expect(await commentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.comment.delete.question/);
    await commentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(commentDeleteDialog.deleteModal);

    expect(await isVisible(commentDeleteDialog.deleteModal)).to.be.false;
  }
}
