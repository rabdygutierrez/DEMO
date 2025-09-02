import { Page } from "playwright-core";
import { CommonActions } from "./CommonActions";

export class SideBar {
  commonActions: CommonActions;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
  }

  async clickMenu(menu: string) {
    await this.commonActions.getByRoleButtonClick(menu, 2);
  }

  async clickModulePayments() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "Payments", 2);
  }

  async clickModuleMedicare() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "Medicare", 2);
  }

  async searchAgentAndSelectProfile(text: string, profile: string) {
    await this.commonActions.getByRoleTypeAndFill(
      "textbox",
      "Search agent",
      text.substring(0, text.length - 2),
      1
    );
    await this.commonActions.getByTextClick(text, 4);
    await this.commonActions.page
      .locator("app-menu-arc")
      .getByText("logout")
      .waitFor({ state: "visible" });
    await this.commonActions.locatorClick(
      `//cdk-select[contains(@class, "rol-select")]/div[@class="select-input-container d-flex align-items-center"]`,
      4
    );
    await this.commonActions
    .locatorClick(`(//app-menu-item//span[text()="${profile}"])[2]`, 
      4
    )
  }

  async clickModuleACA() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "ACA", 4);
  }

  async clickModuleLife() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "Life", 4);
  }

  async clickModuleContracts() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "Contracts", 4);
  }

  async clickModuleOpportunities() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, "Opportunities", 4);
  }

  async clickModuleMyBusiness() {
    const locator = "app-menu-arc";
    await this.commonActions.locatorByTextClick(locator, 'My business', 4);
  }
}
