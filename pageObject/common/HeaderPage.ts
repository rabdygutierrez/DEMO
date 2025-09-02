import { Page } from "playwright-core";
import { CommonActions } from "../common/CommonActions";

export class HeaderPage {
  commonActions: CommonActions;

  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
  }

  async clickModule(menu: string) {
    await this.commonActions.getByRoleOptionClick(menu, 1);
  }
  async clickMenu(menu: string) {
    await this.commonActions.getByRoleButtonClick(menu, 1);
  }
  async clickSubMenu(menu: string) {
    await this.commonActions.getByRoleType('menuitem', menu, 1);
  }
}
