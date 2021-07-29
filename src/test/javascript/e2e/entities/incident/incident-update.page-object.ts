import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IncidentUpdatePage {
  pageTitle: ElementFinder = element(by.id('myApp.incident.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createdAtInput: ElementFinder = element(by.css('input#incident-createdAt'));
  statusSelect: ElementFinder = element(by.css('select#incident-status'));
  conversationSelect: ElementFinder = element(by.css('select#incident-conversation'));
  agentSelect: ElementFinder = element(by.css('select#incident-agent'));
  customerSelect: ElementFinder = element(by.css('select#incident-customer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async conversationSelectLastOption() {
    await this.conversationSelect.all(by.tagName('option')).last().click();
  }

  async conversationSelectOption(option) {
    await this.conversationSelect.sendKeys(option);
  }

  getConversationSelect() {
    return this.conversationSelect;
  }

  async getConversationSelectedOption() {
    return this.conversationSelect.element(by.css('option:checked')).getText();
  }

  async agentSelectLastOption() {
    await this.agentSelect.all(by.tagName('option')).last().click();
  }

  async agentSelectOption(option) {
    await this.agentSelect.sendKeys(option);
  }

  getAgentSelect() {
    return this.agentSelect;
  }

  async getAgentSelectedOption() {
    return this.agentSelect.element(by.css('option:checked')).getText();
  }

  async customerSelectLastOption() {
    await this.customerSelect.all(by.tagName('option')).last().click();
  }

  async customerSelectOption(option) {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  async getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await this.conversationSelectLastOption();
    await this.agentSelectLastOption();
    await this.customerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
