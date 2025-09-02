import { CommonActions } from "../pageObject/common/CommonActions";
import { BrowserContext, Page } from "playwright-core";
import { SaucedemoPage } from "../pageObject/SaucedemoPage";

export class FunctionSaucedemo {
  commonActions: CommonActions;
  mainPage: Page;
  saucedemoPage: SaucedemoPage;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
    this.mainPage = this.commonActions.page;
    this.saucedemoPage = new SaucedemoPage(this.mainPage);
  }

  async funtionExample(dataTest: any) {

  }

}