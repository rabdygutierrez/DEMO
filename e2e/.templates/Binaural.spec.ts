import { test, expect } from '@playwright/test';
import { BrowserContext, Page } from "playwright-core";
import { LoginPage } from "../../pageObject/LoginPage";
import { HeaderPage } from "../../pageObject/common/HeaderPage";
import { SideBar } from "../../pageObject/common/SideBar";
import { AccountingPage } from "../../pageObject/AccountingPage";
import { Enviroment } from "../../enviroments/Enviroments";
import {initializeValues } from '../../initializeTestValues/initializeValuesSoucedemo.spec';

import * as cf from "../../utils/calculationFunctions";


let mainPage: Page;
let browserContext: BrowserContext;
let loginPage: LoginPage;
let headerPage: HeaderPage;
let sideBar: SideBar;
let accountingPage: AccountingPage;
const enviroment = new Enviroment("BINAURAL");
const { baseURL, username, password } = enviroment;

test.beforeEach(async ({ page, context }) => {
  browserContext = context;
  mainPage = page;
  loginPage = new LoginPage(mainPage);
  headerPage = new HeaderPage(mainPage);
  sideBar = new SideBar(mainPage);
  accountingPage = new AccountingPage(mainPage);
});

test('Test Demo', async () => { 
  const dataTest = initializeValues("E2E-BI-0000");
  await loginPage.loginBINAURAL(username, password, baseURL);
  await headerPage.clickModule("Contabilidad");
  await headerPage.clickMenu("Proveedores");
  await headerPage.clickSubMenu("Facturas");
  await accountingPage.clickbuttonNew();
  
  //Toma el valor de la Tasa antes de llenar la factura
  await accountingPage.clickTabForeinCurrency();
  const tasaAlternaInversa = await accountingPage.getReverseAlternatingRate();
  dataTest.valueInvoiceLineBs = cf.convertAmountFrom$$ToBs(dataTest.valueInvoiceLine$, tasaAlternaInversa, 2);
  dataTest.valueAccountingNotesBs = cf.convertAmountFrom$$ToBs(dataTest.valueAccountingNotes$, tasaAlternaInversa, 2);
  
  await accountingPage.clickTabInvoice(); //Lineas de Factura
  
  //Llenar Factura
  await accountingPage.fillProviderInvoice(dataTest.controlNumber);
  await accountingPage.fillControlNumber(dataTest.controlNumber);
  await accountingPage.selectProviderOption(dataTest.providerOption);
  await accountingPage.clickCheckGenerateIVAWithholding();
  await accountingPage.selectInvoiceDate('13');
  await accountingPage.selectAccountingDate('16');
  await accountingPage.selectDueDate('16');
  await accountingPage.clickDiario();
  await accountingPage.selectFacturas();
      
  //Agregar Productos (Se puede Parametrizar)
  await accountingPage.clickAddLine();
  await accountingPage.selectProduct(dataTest.products[0].nameProduct);
  await accountingPage.fillQuantity(dataTest.products[0].quantity);
  await accountingPage.fillPrice(dataTest.products[0].price);
  await accountingPage.selectTax(dataTest.products[0].tax, dataTest.products[0].nameLink);
  await accountingPage.clickAddLine();
  await accountingPage.selectProduct(dataTest.products[1].nameProduct);
  await accountingPage.fillQuantity(dataTest.products[1].quantity);
  await accountingPage.fillPrice(dataTest.products[1].price);
  await accountingPage.selectTax(dataTest.products[1].tax, dataTest.products[1].nameLink);
  await accountingPage.clickAddLine();
  await accountingPage.selectProduct(dataTest.products[2].nameProduct);
  await accountingPage.fillQuantity(dataTest.products[2].quantity);
  await accountingPage.fillPrice(dataTest.products[2].price);
  await accountingPage.selectTax(dataTest.products[2].tax, dataTest.products[2].nameLink);
  await accountingPage.clickTabForeinCurrency();
  await accountingPage.clickTabInvoice();
  
  //Pestaña Lineas de Facturas Montos en Dolares
  const dataInvoiceLine = await accountingPage.getDataInvoiceLine();
  expect.soft(dataInvoiceLine.Subtotal$).toBe(dataTest.valueInvoiceLine$.Subtotal$_exp);
  expect.soft(dataInvoiceLine.TotalGIVA16$).toBe(dataTest.valueInvoiceLine$.TotalGIVA16$_exp);
  expect.soft(dataInvoiceLine.IVA16$).toBe(dataTest.valueInvoiceLine$.IVA16$_exp);
  expect.soft(dataInvoiceLine.TotalGIVA8$).toBe(dataTest.valueInvoiceLine$.TotalGIVA8$_exp);
  expect.soft(dataInvoiceLine.IVA8$).toBe(dataTest.valueInvoiceLine$.IVA8$_exp);
  expect.soft(dataInvoiceLine.TotalGExento$).toBe(dataTest.valueInvoiceLine$.TotalGExento$_exp);
  expect.soft(dataInvoiceLine.Exento$).toBe(dataTest.valueInvoiceLine$.Exento$_exp);
  expect.soft(dataInvoiceLine.Total$).toBe(dataTest.valueInvoiceLine$.Total$_exp);
  
  //Pestaña Apuntes Contables Montos en Dolares y BS
  console.log('Apuntes Contables Montos en Dolares y BS:');
  await accountingPage.clickTabAccountingNotes();
  const dataAccountingNotes = await accountingPage.getDataAccountingNotes();
  expect.soft(dataAccountingNotes.DebitoTotal$).toBe(dataTest.valueAccountingNotes$.TotalDebito$_exp);
  expect.soft(dataAccountingNotes.CreditoTotal$).toBe(dataTest.valueAccountingNotes$.TotalCredito$_exp);
  expect.soft(dataAccountingNotes.TotalDebitoAlternoBS).toBe(dataTest.valueAccountingNotesBs.TotalDebitoBs_exp);
  expect.soft(dataAccountingNotes.TotalCreditoAlternoBS).toBe(dataTest.valueAccountingNotesBs.TotalDebitoBs_exp);
      
  //Pestaña Moneda Alterna Monto en BS
  console.log('Moneda Alterna Monto en BS:');
  await accountingPage.clickTabForeinCurrency();
  const dataForeinCurrency = await accountingPage.getDataForeinCurrency();
  expect.soft(dataForeinCurrency.SubtotalBs).toBe(dataTest.valueInvoiceLineBs.SubtotalBs_exp);
  expect.soft(dataForeinCurrency.TotalGIVA16Bs).toBe(dataTest.valueInvoiceLineBs.TotalGIVA16Bs_exp);
  expect.soft(dataForeinCurrency.IVA16Bs).toBe(dataTest.valueInvoiceLineBs.IVA16Bs_exp);
  expect.soft(dataForeinCurrency.TotalGIVA8Bs).toBe(dataTest.valueInvoiceLineBs.TotalGIVA8Bs_exp);
  expect.soft(dataForeinCurrency.IVA8Bs).toBe(dataTest.valueInvoiceLineBs.IVA8Bs_exp);
  expect.soft(dataForeinCurrency.TotalGExentoBs).toBe(dataTest.valueInvoiceLineBs.TotalGExentoBs_exp);
  expect.soft(dataForeinCurrency.ExentoBs).toBe(dataTest.valueInvoiceLineBs.ExentoBs_exp);
  expect.soft(dataForeinCurrency.TotalBs).toBe(dataTest.valueInvoiceLineBs.TotalBs_exp);
  
  // Función para calcular el monto retenido alterno
  const valueAlternatePrice$ = {
    priceProductA$_exp: dataTest.products[0].price,
    priceProductB$_exp: dataTest.products[1].price,
  }
  dataTest.valueAlternatePriceBs = cf.convertAmountFrom$$ToBs(valueAlternatePrice$, tasaAlternaInversa, 2, true, "valueAlternatePriceBs" )

  const valueAlternateRetentionAmount16 = cf.alternateRetentionAmount (
    parseFloat(dataTest.products[0].quantity),
    parseFloat(dataTest.valueAlternatePriceBs.priceProductABs_exp.replace('Bs', '').replace(/\./g, '').replace(',', '.')), 
    parseFloat(dataTest.products[0].tax.replace('%', '')), 
    parseFloat(dataTest.retention), 
    2, true, "vat16Result_exp");  // Para IVA 16% con retención del 75%
    const RetencionIVAAlterno16BS_exp = valueAlternateRetentionAmount16.roundedIVA_exp;
    const MontoRetenidoAlterno16BS_exp = valueAlternateRetentionAmount16.roundedAmount_exp;
  
  const valueAlternateRetentionAmount8 = cf.alternateRetentionAmount(
    parseFloat(dataTest.products[0].quantity),
    parseFloat(dataTest.valueAlternatePriceBs.priceProductBBs_exp.replace('Bs', '').replace(/\./g, '').replace(',', '.')), 
    parseFloat(dataTest.products[0].tax.replace('%', '')), 
    parseFloat(dataTest.retention), 
    2, true, "vat8Result_exp");// Para IVA 8% con retención del 75% 
    const RetencionIVAAlterno8BS_exp = valueAlternateRetentionAmount8.roundedIVA_exp
    const MontoRetenidoAlterno8BS_exp = valueAlternateRetentionAmount8.roundedAmount_exp;
  
  // Validar Opcion Borrador
  let estadoFactura :any;
  estadoFactura = await accountingPage.invoiceStatus();
  expect.soft(estadoFactura.draft).toBe("true");
  estadoFactura = await accountingPage.invoiceStatus();    
  expect.soft(estadoFactura.posted).toBe("false");
  
  //Publicar Factura
  await accountingPage.clickButtonConfirmar();
  estadoFactura = await accountingPage.invoiceStatus();
  expect.soft(estadoFactura.draft).toBe("false");
  estadoFactura = await accountingPage.invoiceStatus();    
  expect.soft(estadoFactura.posted).toBe("true");
  expect.soft(await accountingPage.textSuccessParcialIsVisible()).toBe(true);
  
  //Pestaña Retencion de IVA
  await accountingPage.clickTabIVARetention();
  const dataIVARetention = await accountingPage.getDataIVARetention();    
  expect.soft(dataIVARetention.RetencionIVAAlterno16BS).toBe(RetencionIVAAlterno16BS_exp);
  expect.soft(dataIVARetention.RetencionIVAAlterno8BS).toBe(RetencionIVAAlterno8BS_exp);
  expect.soft(dataIVARetention.MontoRetenidoAlterno16BS).toBe(MontoRetenidoAlterno16BS_exp);
  expect.soft(dataIVARetention.MontoRetenidoAlterno8BS).toBe(MontoRetenidoAlterno8BS_exp);
});


test.afterEach(async () => {await mainPage.close();});