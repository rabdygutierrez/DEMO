import { Page } from "playwright-core";
import { CommonActions } from "./common/CommonActions";
import { Enviroment } from "../enviroments/Enviroments";

export class LoginPage {
  page: Page;
  commonActions: CommonActions;
  enviroment: Enviroment;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
  }

  // SAUCEDEMO
  async loginSAUCEDEMO(user: string, pass: string, url: string) {
    await this.commonActions.visitPageAndWait(url, 60);
    await this.commonActions.locatorClickAndFill("#user-name", user, 1);
    await this.commonActions.locatorClickAndFill("#password", pass, 1);
    await this.commonActions.locatorClick("#login-button", 4);
  }

  // PRACTICETESTAUTOMATION
  async loginPRACTICETESTAUTOMATION(user: string, pass: string, url: string) {
    await this.commonActions.visitPageAndWait(url, 60);
    await this.commonActions.locatorClickAndFill("#username", user, 1);
    await this.commonActions.locatorClickAndFill("#password", pass, 1);
    await this.commonActions.locatorClick("#submit", 4);
  }

// BINAURAL
  async loginBINAURAL(user: string, pass: string, url: string) {
    await this.commonActions.visitPageAndWait(url, 60);
    await this.commonActions.getByPlaceholderClickAndFill('Email', user, 0);
    await this.commonActions.getByPlaceholderClickAndFill('Password', pass, 0);
    await this.commonActions.getByRoleButtonClick('Log in', 0);
  }
}
