import { test, expect } from '@playwright/test';
import {
  randomString,
  randomLetters,
  randomNumber,
  getDateFormat,
} from "../utils/generateData";
import * as cf from "../utils/calculationFunctions";

const currentDate = new Date();
  const minAge = 18;
  const dob = new Date(
    currentDate.getFullYear() - minAge,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const formatDate = getDateFormat(dob);

test('test', async ({ page }) => {
  await page.goto('https://binaural-consultoria-test-bapteam.odoo.com/web/login?debug=1#action=menu&cids=1&menu_id=249');
  await page.getByPlaceholder('Email').fill('rabdygutierrez@gmail.com');
  await page.getByPlaceholder('Email').press('CapsLock');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Andres2008');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await page.getByRole('option', { name: 'Contabilidad' }).click();
  await page.getByRole('button', { name: 'Proveedores' }).click();
  await page.getByRole('menuitem', { name: 'Facturas' }).click();
  await page.getByRole('button', { name: 'Nuevo' }).click();
  //Toma el valor de la Tasa antes de llenar la factura
  await page.locator('//a[@name="foreign_currency"]').click(); //Moneda Alterna BS
  await page.waitForTimeout(6000);
  await page.locator('//input[@id="foreign_inverse_rate_1"]').click(); 
  const tasa_alterna_inversa = await page.locator('//input[@id="foreign_inverse_rate_1"]').inputValue();
  console.log('Valor de la Tasa Alterna Inversa:', tasa_alterna_inversa);
  await page.click('//a[@name="invoice_tab"]'); //Lineas de Factura
  //Llenar Factura
  const numeroControl = "BAP" +randomString(6);
  await page.getByPlaceholder('JRNL/2016/').fill(numeroControl);
  await page.getByLabel('Número de Control?').click();
  await page.getByLabel('Número de Control?').fill(numeroControl);
  await page.getByLabel('Proveedor').click();
  await page.waitForTimeout(3000);
  await page.getByRole('option', { name: 'Proveedor A 75%' }).click();
  await page.getByLabel('¿Genera retención de IVA?').check();
  await page.getByLabel('Fecha de la factura').click();
  await page.getByRole('button', { name: '13' }).click();
  await page.getByLabel('Fecha contable').click();
  await page.getByRole('button', { name: '16' }).click();
  await page.getByPlaceholder('Fecha').click();
  await page.getByRole('button', { name: '16' }).click();
  await page.getByLabel('Diario').click();
  //Agregar Productos (Se puede Parametrizar)
  await page.locator('.o_group').first().click();
  await page.getByRole('button', { name: 'Agregar una línea' }).click();
  await page.getByRole('row', { name: '600000 Expenses 1,00 0,00 0,' }).getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Producto A' }).click();
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').fill('100');
  await page.getByLabel('Delete', { exact: true }).click();
  await page.getByRole('row', { name: 'Producto A Internal link' }).getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: '16%' }).click();
  await page.getByRole('button', { name: 'Agregar una línea' }).click();
  await page.getByRole('row', { name: '600000 Expenses 1,00 0,00 0,' }).getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Producto B' }).click();
  await page.getByRole('row', { name: 'Producto B Internal link' }).getByRole('textbox').nth(1).click();
  await page.getByRole('row', { name: 'Producto B Producto B 600000' }).getByRole('textbox').nth(1).fill('2');
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').fill('50');
  await page.getByLabel('Delete', { exact: true }).click();
  await page.getByRole('row', { name: 'Producto B Internal link' }).getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: '8%' }).click();
  await page.getByRole('button', { name: 'Agregar una línea' }).click();
  await page.getByRole('row', { name: '600000 Expenses 1,00 0,00 0,' }).getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Producto C' }).click();
  await page.getByRole('row', { name: 'Producto C Internal link' }).getByRole('textbox').nth(1).click();
  await page.getByRole('row', { name: 'Producto C Producto C 600000' }).getByRole('textbox').nth(1).fill('2');
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').click();
  await page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').fill('25');
  await page.getByLabel('Delete', { exact: true }).click();
  await page.getByRole('row', { name: 'Producto C Internal link' }).getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: 'Exento' }).click();
  await page.waitForTimeout(3000);
  await page.locator('//a[@name="foreign_currency"]').click();
  await page.waitForTimeout(3000);    
  await page.click('//a[@name="invoice_tab"]'); //Lineas de Factura
  await page.waitForTimeout(3000);
  //Pestaña Lineas de Facturas Montos en Dolares
  console.log('Lineas de Facturas Montos en Dolares:');
   const Subtotal$ = await page.locator('//span[@name="Subtotal"]').innerText();
  console.log('Subtotal$:', Subtotal$);
  const TotalGIVA16$ = await page.innerText('//label[text()="Total G IVA 16%"]//following::td/span');
  console.log('TotalGIVA16$:', TotalGIVA16$);
  const IVA16$ = await page.innerText('//label[text()="IVA 16%"]//following::td/span');
  console.log('IVA16$:', IVA16$);
  const TotalGIVA8$ = await page.innerText('//label[text()="Total G IVA 8%"]//following::td/span');
  console.log('TotalGIVA8$:', TotalGIVA8$);
  const IVA8$ = await page.innerText('//label[text()="IVA 8%"]//following::td/span');
  console.log('IVA8$:', IVA8$);
  const TotalGExento$ = await page.innerText('//label[text()="Total G Exento"]//following::td/span');
  console.log('TotalGExento$:', TotalGExento$);
  const Total$ = await page.innerText('//label[text()="Total"]//following::td/span');
  console.log('Total$:', Total$);
  await page.waitForTimeout(3000);


  //Pestaña Apuntes Contables Montos en Dolares y BS
  console.log('Apuntes Contables Montos en Dolares y BS:');
  await page.click('//a[@name="aml_tab"]'); //
  const DebitoTotal$ = await page.innerText('//td[@class="o_list_number"]/span[@data-tooltip="Débito total"]');
  console.log('DebitoTotal$:', DebitoTotal$);
  const CreditoTotal$ = await page.innerText('//td[@class="o_list_number"]/span[@data-tooltip="Crédito total"]');
  console.log('CreditoTotal$:', CreditoTotal$);
  const TotalDebitoAlternoBS = await page.innerText('//td[@class="o_list_number"]/span[@data-tooltip="Total Débito Alterno"]');
  console.log('TotalDebitoAlternoBS:', TotalDebitoAlternoBS);
  const TotalCreditoAlternoBS = await page.innerText('//td[@class="o_list_number"]/span[@data-tooltip="Total Crédito Alterno"]');
  console.log('TotalCreditoAlternoBS:', TotalCreditoAlternoBS);
  await page.waitForTimeout(3000);
  //Pestaña Moneda Alterna Monto en BS
  console.log('Moneda Alterna Monto en BS:');
  await page.locator('//a[@name="foreign_currency"]').click();
  await page.waitForTimeout(3000);
  const SubtotalBS = await page.locator('//span[@name="Subtotal"]').innerText();
  console.log('SubtotalBS:', SubtotalBS);
  const TotalGIVA16Bs = await page.innerText('//label[text()="Total G IVA 16%"]//following::td/span');
  console.log('TotalGIVA16Bs:', TotalGIVA16Bs);
  const IVA16Bs = await page.innerText('//label[text()="IVA 16%"]//following::td/span');
  console.log('IVA16Bs:', IVA16Bs);
  const TotalGIVA8Bs = await page.innerText('//label[text()="Total G IVA 8%"]//following::td/span');
  console.log('TotalGIVA8Bs:', TotalGIVA8Bs);
  const IVA8Bs = await page.innerText('//label[text()="IVA 8%"]//following::td/span');
  console.log('IVA8Bs:', IVA8Bs);
  const TotalGExentoBs = await page.innerText('//label[text()="Total G Exento"]//following::td/span');
  console.log('TotalGExentoBs:', TotalGExentoBs);
  const TotalBs = await page.innerText('//label[text()="Total"]//following::td/span');
  console.log('TotalBs:', TotalBs);
  await page.waitForTimeout(3000);


// Ejemplo de uso: Función para calcular el monto retenido alterno
let vat16Result: number = cf.alternateRetentionAmount(1, 3654.36, 16, 75);  // Para IVA 16% con retención del 75%
console.log(`Alternate retention amount for VAT 16%: ${vat16Result}`);

let vat8Result: number = cf.alternateRetentionAmount(2, 1827.18, 8, 75, 6); // Para IVA 8% con retención del 75% y 6 decimales
console.log(`Alternate retention amount for VAT 8%: ${vat8Result}`);

});

