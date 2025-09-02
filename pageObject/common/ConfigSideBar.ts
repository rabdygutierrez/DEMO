import { Page } from "playwright-core";
import { CommonActions } from "../common/CommonActions";

export class ConfigSideBar {
  commonActions: CommonActions;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
  }
}
