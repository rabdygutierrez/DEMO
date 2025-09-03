import { test, expect } from '@playwright/test';
import { Page } from "playwright-core";
import { FunctionDemo } from "../testingFunction/FunctionDemo.spec";
import {
  randomString,
  randomLetters,
  randomNumber,
  getDateFormat,
} from "../utils/generateData";

let mainPage: Page;
let functionDemo: FunctionDemo;

test.beforeEach(async ({ page, context }) => {
  mainPage = page;
  functionDemo = new FunctionDemo(mainPage);
});

//test.describe(`Tests Demo: `, () => {

test('Flujo DEMO', async ({ page }) => {
  //inicio de sesion
  await functionDemo.login();

  // navegacion al modulo de ventas - Crear Producto
  const nombreProducto = "Producto-" + randomString(6);
  const expectResultProduct = await functionDemo.createProduct(nombreProducto);
  expect(expectResultProduct).toBe(true);

  // navegacion al modulo de CRM Crear Cliente
  const nombreCliente = "Cliente-" + randomString(6);
  const expectResultCustomer = await functionDemo.createCustomer(nombreCliente);
  expect(expectResultCustomer).toBe(true);

  // navegacion al modulo de CRM Crear Cotizacion
  const expectResultCotization = await functionDemo.createCotization(nombreCliente, nombreProducto);
  expect(expectResultCotization).toBe(true);


  // navegacion al modulo de CRM Cambiar Status Presupuesto
  const expectResultChangeStatus = await functionDemo.changeStatusCotization(nombreCliente);
  expect(expectResultChangeStatus).toBe(true);

  // navegacion al modulo de Ventas Crear Pedido de Venta
  await functionDemo.createSalesOrder(nombreCliente);
});

test.afterEach(async () => {await mainPage.close();});