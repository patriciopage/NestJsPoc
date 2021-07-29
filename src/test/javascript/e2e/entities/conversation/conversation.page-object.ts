import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ConversationUpdatePage from './conversation-update.page-object';

const expect = chai.expect;
export class ConversationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.conversation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-conversation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ConversationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('conversation-heading'));
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
    await navBarPage.getEntityPage('conversation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateConversation() {
    await this.createButton.click();
    return new ConversationUpdatePage();
  }

  async deleteConversation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const conversationDeleteDialog = new ConversationDeleteDialog();
    await waitUntilDisplayed(conversationDeleteDialog.deleteModal);
    expect(await conversationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.conversation.delete.question/);
    await conversationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(conversationDeleteDialog.deleteModal);

    expect(await isVisible(conversationDeleteDialog.deleteModal)).to.be.false;
  }
}
