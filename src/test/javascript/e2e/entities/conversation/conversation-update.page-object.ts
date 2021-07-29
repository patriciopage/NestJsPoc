import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ConversationUpdatePage {
  pageTitle: ElementFinder = element(by.id('myApp.conversation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contentsInput: ElementFinder = element(by.css('textarea#conversation-contents'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContentsInput(contents) {
    await this.contentsInput.sendKeys(contents);
  }

  async getContentsInput() {
    return this.contentsInput.getAttribute('value');
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
    await this.setContentsInput('contents');
    expect(await this.getContentsInput()).to.match(/contents/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
