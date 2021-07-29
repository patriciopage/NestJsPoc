import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AgentUpdatePage from './agent-update.page-object';

const expect = chai.expect;
export class AgentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.agent.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-agent'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AgentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('agent-heading'));
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
    await navBarPage.getEntityPage('agent');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAgent() {
    await this.createButton.click();
    return new AgentUpdatePage();
  }

  async deleteAgent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const agentDeleteDialog = new AgentDeleteDialog();
    await waitUntilDisplayed(agentDeleteDialog.deleteModal);
    expect(await agentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.agent.delete.question/);
    await agentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(agentDeleteDialog.deleteModal);

    expect(await isVisible(agentDeleteDialog.deleteModal)).to.be.false;
  }
}
