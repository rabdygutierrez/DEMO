import { CommonActions } from "../pageObject/common/CommonActions";
import { BrowserContext, Page } from "playwright-core";

import {
  randomString,
  randomLetters,
  randomNumber,
  getDateFormat,
} from "../utils/generateData";

const TIMEOUT = 1000;

export class FunctionDemo {
  commonActions: CommonActions;
  mainPage: Page;
  constructor(page: Page) {

    this.commonActions = new CommonActions(page);
    this.mainPage = this.commonActions.page;
  }

  async login() {
    await this.commonActions.page.goto('https://test-harold.odoo.com/web/login');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Correo electrónico').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Correo electrónico').fill('harold.valencia@itbcgroup.com');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Contraseña').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Contraseña').fill('HV48260.');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
  }

  async createProduct(nameProducto: string) {
    let expectResult = false;
    await this.commonActions.page.getByRole('option', { name: 'Ventas', exact: true }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Productos' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('menuitem', { name: 'Productos' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Nuevo' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Por ejemplo, hamburguesa de').fill(nameProducto);
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Tipo de producto?').selectOption('"product"');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Unidad de medida?').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Unidad de medida?').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Precio de Venta $').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Precio de Venta $').fill('500');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Categoría de producto').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('option', { name: 'Punto de Venta' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Guardar de forma manual').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.getByText('Producto creado').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Menú de inicio').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    return expectResult;
  }

  async createCustomer(nameCustomer: string) {
    let expectResult = false;
    await this.commonActions.page.getByRole('option', { name: 'CRM' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Nuevo' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('combobox').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('combobox').fill(nameCustomer);
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('option', { name: `Crear "${nameCustomer}"`}).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Por ejemplo, precios de').fill(`Oportunidad ${nameCustomer}`);
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Por ejemplo, "correo@').fill(`${nameCustomer}@yopmail.com`);
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Por ejemplo, "0123456789"').fill('04125550100');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Agregar', exact: true }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.getByText(`Oportunidad ${nameCustomer}`).first().isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Menú de inicio').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    return expectResult;
  }

  async createCotization(nameCustomer: string, nameProduct: string) {
    let expectResult = false;
    await this.commonActions.page.getByRole('option', { name: 'CRM' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByText(`Oportunidad ${nameCustomer}`).first().click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Nueva cotización' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Vencimiento').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: '' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: '' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: '30' }).nth(1).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Tarifa?').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('option', { name: 'Lista de Precios en USD (USD)' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Agregar un producto' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByPlaceholder('Comience a escribir para').fill(`${nameProduct}`);
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('option', { name: `${nameProduct}`, exact: true }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('cell', { name: '1,00' }).getByRole('textbox').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('cell', { name: '1,00' }).getByRole('textbox').fill('100');
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.locator('td:nth-child(10)').first().click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByText('$ 58.000,0000').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Confirmar' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: '' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: ' Imprimir' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('menuitem', { name: 'Cotización en PDF' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.getByText('Cotización confirmada').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.getByText('Pedido de venta creado').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Menú de inicio').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    return expectResult;
  }

  async changeStatusCotization(nameCustomer: string) {
    let expectResult = false;
    await this.commonActions.page.getByRole('option', { name: 'CRM' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Ventas' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Reportes' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByText(`Oportunidad ${nameCustomer}`).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('radio', { name: 'Calificado' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('radio', { name: 'Propuesta' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.getByText('Lead/oportunidad creada').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('radio', { name: 'Ganado' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    expectResult = await this.commonActions.page.locator('span.text-bg-success').isVisible();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByLabel('Menú de inicio').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    return expectResult;
  }

  async createSalesOrder(nameCustomer: string) {
    await this.commonActions.page.getByRole('option', { name: 'Ventas', exact: true }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('cell', { name: `${nameCustomer}` }).first().click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Crear factura' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByRole('button', { name: 'Crear borrador de factura' }).click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
    await this.commonActions.page.getByText('Cerrar').click();
    await this.commonActions.page.waitForTimeout(TIMEOUT);
  }

}