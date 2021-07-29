import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AttachmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('myApp.attachment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#attachment-url'));
  observationSelect: ElementFinder = element(by.css('select#attachment-observation'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async observationSelectLastOption() {
    await this.observationSelect.all(by.tagName('option')).last().click();
  }

  async observationSelectOption(option) {
    await this.observationSelect.sendKeys(option);
  }

  getObservationSelect() {
    return this.observationSelect;
  }

  async getObservationSelectedOption() {
    return this.observationSelect.element(by.css('option:checked')).getText();
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
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await this.observationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
