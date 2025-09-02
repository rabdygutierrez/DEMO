import { test, expect } from '@playwright/test';
import { Page } from "playwright-core";
//import { FunctionDemo } from "../testingFunction/FunctionDemo.spec";
import {
  randomString,
  randomLetters,
  randomNumber,
  getDateFormat,
} from "../utils/generateData";

let mainPage: Page;
//let functionDemo: FunctionDemo;

test.beforeEach(async ({ page, context }) => {
  mainPage = page;
//functionDemo=functionDemo;
});

//test.describe(`Tests Demo: `, () => {

test('Flujo DEMO', async ({ page }) => {
    //inicio de sesion
  await mainPage.goto('https://test-harold.odoo.com/web/login');
  await mainPage.getByPlaceholder('Correo electrónico').click();
  await mainPage.getByPlaceholder('Correo electrónico').fill('harold.valencia@itbcgroup.com');
  await mainPage.getByPlaceholder('Contraseña').click();
  await mainPage.getByPlaceholder('Contraseña').fill('HV48260.');
  await mainPage.getByRole('button', { name: 'Iniciar sesión' }).click();
  await mainPage.waitForTimeout(10000);
    // navegacion al modulo de ventas - Crear Producto
  await mainPage.getByRole('option', { name: 'Ventas', exact: true }).click();
  await mainPage.getByRole('button', { name: 'Productos' }).click();
  await mainPage.getByRole('menuitem', { name: 'Productos' }).click();
  await mainPage.getByRole('button', { name: 'Nuevo' }).click();
  const nombreProducto = "Producto-" +randomString(6);
  await mainPage.getByPlaceholder('Por ejemplo, hamburguesa de').fill(nombreProducto);
  await mainPage.getByLabel('Tipo de producto?').selectOption('"product"');
  await mainPage.getByLabel('Unidad de medida?').click();
  await mainPage.getByLabel('Unidad de medida?').click();
  await mainPage.getByLabel('Precio de Venta $').click();
  await mainPage.getByLabel('Precio de Venta $').fill('500');
  await mainPage.getByLabel('Categoría de producto').click();
  await mainPage.getByRole('option', { name: 'Punto de Venta' })
  await mainPage.getByLabel('Guardar de forma manual').click();
  await mainPage.waitForTimeout(10000);
  //esperar hasta que salga producto creado
  await expect(mainPage.getByText('Producto creado')).toBeVisible();
   
  
  // navegacion al modulo de CRM - Crear Cliente

  await mainPage.getByLabel('Menú de inicio').click();
  const nombreCliente = "Cliente-" +'G38P6I'//randomString(6);
  await mainPage.getByRole('option', { name: 'CRM' }).click();
  await mainPage.getByRole('button', { name: 'Nuevo' }).click();
  await mainPage.getByRole('combobox').click();
  await mainPage.getByRole('combobox').fill(nombreCliente);
  await mainPage.getByRole('option', { name: nombreCliente }).click();
  await mainPage.getByPlaceholder('Por ejemplo, precios de').fill(`Oportunidad ${nombreCliente}`);
  await mainPage.getByPlaceholder('Por ejemplo, "correo@').fill(`${nombreCliente}@yopmail.com`);
  await mainPage.getByPlaceholder('Por ejemplo, "0123456789"').fill('04125550100');
  await mainPage.getByRole('button', { name: 'Agregar', exact: true }).click();
  await mainPage.waitForTimeout(10000);
  await expect(mainPage.getByText(`Oportunidad ${nombreCliente}`)).toBeVisible();
  

    // navegacion al modulo de CRM Crear Cotizacion
    await mainPage.getByLabel('Menú de inicio').click() 
    await mainPage.getByRole('option', { name: 'CRM' }).click();
    await mainPage.waitForTimeout(10000);
    await mainPage.getByText(`Oportunidad ${nombreCliente}`).click();
    await mainPage.getByRole('button', { name: 'Nueva cotización' }).click();
    await mainPage.getByLabel('Vencimiento').click();
    await mainPage.getByRole('button', { name: '' }).click();
    await mainPage.getByRole('button', { name: '' }).click();
    await mainPage.getByRole('button', { name: '30' }).nth(1).click();
    await mainPage.getByRole('option', { name: 'Lista de Precios en USD (USD)' }).click();
    await mainPage.getByRole('button', { name: 'Agregar un producto' }).click();
    await mainPage.getByPlaceholder('Comience a escribir para').fill('POS');
    await mainPage.getByRole('option', { name: `${nombreProducto}` }).click();
    await mainPage.getByRole('cell', { name: '1,00' }).getByRole('textbox').click();
    await mainPage.getByRole('cell', { name: '1,00' }).getByRole('textbox').fill('100');
    await mainPage.locator('td:nth-child(10)').first().click();
    await mainPage.getByText('58.000,00 Bs.').click();
    await mainPage.getByLabel('Tarifa?').click();
    await mainPage.getByText('$ 58.000,0000').click();
    await mainPage.getByRole('button', { name: '' }).click();
    await mainPage.getByRole('menuitem', { name: 'Entrada de ingresos acumulados' }).press('Escape');
    await mainPage.getByRole('button', { name: 'Confirmar' }).click();
    await mainPage.waitForTimeout(10000);  
    await mainPage.getByRole('button', { name: '' }).click();
    await mainPage.getByRole('menuitem', { name: 'Cotización en PDF' }).click();


    // navegacion al modulo de CRM Cambiar Status Presupuesto
 
    await mainPage.getByRole('option', { name: 'CRM' }).click();
    await mainPage.getByRole('button', { name: 'Ventas' }).click();
    await mainPage.getByRole('button', { name: 'Reportes' }).click();
    await mainPage.getByText(`${nombreCliente}`).click();
    await mainPage.getByRole('radio', { name: 'Calificado' }).click();
    await mainPage.getByRole('radio', { name: 'Propuesta' }).click();
    await mainPage.getByRole('radio', { name: 'Ganado' }).click();
    await mainPage.waitForTimeout(10000);  
    await mainPage.getByLabel('Menú de inicio').click();

    // navegacion al modulo de Ventas Crear Pedido de Venta
    await mainPage.getByRole('option', { name: 'Ventas', exact: true }).click();
    await mainPage.getByRole('cell', { name: '/08/2025 18:47:19' }).click();
    await mainPage.getByRole('button', { name: 'Crear factura' }).click();
    await mainPage.getByRole('button', { name: 'Crear borrador de factura' }).click();
    await mainPage.waitForTimeout(10000);    
    await mainPage.getByText('Cerrar').click();

  });
    // });

test.afterEach(async () => {await mainPage.close();});     