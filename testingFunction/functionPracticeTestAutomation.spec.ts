import { CommonActions } from "../pageObject/common/CommonActions";
import { BrowserContext, Page } from "playwright-core";
import { PracticeTestAutomationPage } from "../pageObject/PracticeTestAutomationPage";

export class FunctionPracticeTestAutomation {
  commonActions: CommonActions;
  mainPage: Page;
  practiceTestAutomationPage: PracticeTestAutomationPage;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
    this.mainPage = this.commonActions.page;
    this.practiceTestAutomationPage = new PracticeTestAutomationPage(this.mainPage);
  }

  async funtionExample(dataTest: any) {

  }

}