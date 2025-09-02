import { CommonActions } from "../pageObject/common/CommonActions";
import { BrowserContext, Page } from "playwright-core";
//import { SaucedemoPage } from "../pageObject/SaucedemoPage";

export class FunctionDemo {
  commonActions: CommonActions;
  mainPage: Page;
  //saucedemoPage: SaucedemoPage;
  constructor(page: Page) {

    this.commonActions = new CommonActions(page);
    this.mainPage = this.commonActions.page;
   // this.saucedemoPage = new SaucedemoPage(this.mainPage);
  }

  async login() {
  await this.commonActions.page.goto('https://test-harold.odoo.com/web/login');
  await this.commonActions.page.getByPlaceholder('Correo electrónico').click();
  await this.commonActions.page.getByPlaceholder('Correo electrónico').fill('harold.valencia@itbcgroup.com');
  await this.commonActions.page.getByPlaceholder('Contraseña').click();
  await this.commonActions.page.getByPlaceholder('Contraseña').fill('HV48260.');
  await this.commonActions.page.getByRole('button', { name: 'Iniciar sesión' }).click();
  }

}