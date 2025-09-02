import { Page } from "playwright-core";
import { CommonActions } from "./common/CommonActions";

export class SaucedemoPage {
    commonActions: CommonActions;
    constructor(page: Page) {
      this.commonActions = new CommonActions(page);
    }

    async addProductToCart() {
        await this.commonActions.locatorClick('[data-test="add-to-cart-sauce-labs-backpack"]', 2);
    }
    async enterCart() {
        await this.commonActions.page.locator('a').filter({ hasText: '1' }).click();
        await this.commonActions.page.waitForTimeout(2000);
    }
    async removeProduct() {
        await this.commonActions.locatorClick('[data-test="remove-sauce-labs-backpack"]',2);
    }
    async continueShopping() {
        await this.commonActions.locatorClick('[data-test="continue-shopping"]', 2);
    }
    async checkout() {
        await this.commonActions.locatorClick('[data-test="checkout"]', 2);
    }
    async firstName(name:string) {
        await this.commonActions.locatorClickAndFill('[data-test="firstName"]', name, 2);
    }
    async lastName(name:string) {
        await this.commonActions.locatorClickAndFill('[data-test="lastName"]', name, 2);
    }
    async postalCode(postalCode:string) {
        await this.commonActions.locatorClickAndFill('[data-test="postalCode"]', postalCode, 2);
    }
    async continue() {
        await this.commonActions.locatorClick('[data-test="continue"]', 2);
    }
    async finish() {
        await this.commonActions.locatorClick('[data-test="finish"]', 2);
    }







}