import { Page } from "playwright-core";
import { CommonActions } from "./common/CommonActions";
import { TIMEOUT } from "dns";


export class AccountingPage {
  commonActions: CommonActions;
  constructor(page: Page) {
    this.commonActions = new CommonActions(page);
  }
  async clickbuttonNew() {
    await this.commonActions.getByRoleButtonClick('Nuevo', 2);
  }
  async clickButtonConfirmar() {
    await this.commonActions.getByRoleButtonClick('Confirmar', 4);
  }
  async clickTabForeinCurrency() {
    await this.commonActions.locatorClick('//a[@name="foreign_currency"]', 2);
  }
  async clickTabIVARetention() {
    await this.commonActions.locatorClick('//a[@name="iva_retention"]', 2);
  }
  async clickTabInvoice() {
    await this.commonActions.locatorClick('//a[@name="invoice_tab"]', 2);
  }

  async fillProviderInvoice(text: string) {
    await this.commonActions.page.getByPlaceholder('JRNL/2016/').fill(text);
  }
  async fillControlNumber(text: string) {
    await this.commonActions.getByLabelClickAndFill('Número de Control?', text, 0);
  }
  async selectProviderOption(text: string) {
    await this.commonActions.getByLabelClick('Proveedor', 2);
    await this.commonActions.getByRoleOptionClick(text, 1);
  }
  async clickCheckGenerateIVAWithholding () {
    await this.commonActions.getByLabelClick('¿Genera retención de IVA?', 0);
  }

  async selectInvoiceDate(date: string) {
    await this.commonActions.getByLabelClick('Fecha de la factura', 0);
    await this.commonActions.getByRoleButtonClick(date, 0);
  }

  async selectAccountingDate(date: string) {
    await this.commonActions.getByLabelClick('Fecha contable', 0);
    await this.commonActions.getByRoleButtonClick(date, 0);
  }

  async selectDueDate(date: string) {
    await this.commonActions.getByLabelClick('Fecha', 0);
    await this.commonActions.getByRoleButtonClick(date, 0);
  }

  async clickAddLine () {
    await this.commonActions.getByRoleButtonClick('Agregar una línea', 1);
  }

  async selectProduct (text: string) {
    await this.commonActions.page.getByRole('row', { name: '600000 Expenses 1,00 0,00 0,' }).getByRole('combobox').first().click();
    await this.commonActions.getByRoleOptionClick(text, 1);
  }


  async fillPrice(value: string) {
    await this.commonActions.page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').click();
    await this.commonActions.page.getByRole('cell', { name: '0,00', exact: true }).getByRole('textbox').fill(value);
  }

  async fillQuantity(value: string) {
    await this.commonActions.locatorClickAndFill('//div[@name="quantity"]/input[@inputmode="decimal"]', value, 0);
  }
  async selectTax(value: string, nameLink: string) {
    await this.commonActions.getByLabelClickExact('Delete', 0);	
    await this.commonActions.page.getByRole('row', { name: nameLink }).getByRole('combobox').nth(2).click();
    await this.commonActions.getByRoleOptionClick(value, 0);
  }

  async clickTabAccountingNotes() {
    await this.commonActions.locatorClick('//a[@name="aml_tab"]', 2);
  }

  async clickDiario() {
    await this.commonActions.getByLabelClick('Diario', 1);
  }

  async selectFacturas() {
    await this.commonActions.page.getByRole('option', { name: 'Facturas de proveedores' }).first().click();
    await this.commonActions.page.waitForTimeout(1000);
  } 
  

   async getReverseAlternatingRate() {
    const value = await this.getLocatorInputValue('//input[@id="foreign_rate_0"]', true, 'tasaAlternaInversa');
    return String(value);
  }

  async textSuccessParcialIsVisible() {
    const parcialLocator = this.commonActions.page.locator('//span[contains(@class, "text-bg-success") and text()="Parcial"]');
    const isVisible = await parcialLocator.isVisible();
    return isVisible;    
  }


  async invoiceStatus() {
    const draft = await this.commonActions.page.getAttribute('//div[@name="state"]//following::button[@data-value="draft"]', 'aria-checked');
    const posted = await this.commonActions.page.getAttribute('//div[@name="state"]//following::button[@data-value="posted"]', 'aria-checked');
    await this.commonActions.page.waitForTimeout(2000);
    return { draft, posted };
  }


  async getDataInvoiceLine() {
    console.log('Lineas de Facturas Montos en Dolares:');
    let Subtotal$ = await this.getLocatorInnerText('//span[@name="Subtotal"]', true, 'Subtotal$');
    let TotalGIVA16$ = await this.getLocatorInnerText('//label[text()="Total G IVA 16%"]//following::td/span', true, 'TotalGIVA16$');
    let IVA16$ = await this.getLocatorInnerText('//label[text()="IVA 16%"]//following::td/span', true, 'IVA16$');
    let TotalGIVA8$ = await this.getLocatorInnerText('//label[text()="Total G IVA 8%"]//following::td/span', true, 'TotalGIVA8$');
    let IVA8$ = await this.getLocatorInnerText('//label[text()="IVA 8%"]//following::td/span', true, 'IVA8$');
    let TotalGExento$ = await this.getLocatorInnerText('//label[text()="Total G Exento"]//following::td/span', true, 'TotalGExento$');
    let Exento$ = await this.getLocatorInnerText('//label[text()="Exento"]//following::td/span', true, 'Exento$');
    let Total$ = await this.getLocatorInnerText('//label[text()="Total"]//following::td/span', true, 'Total$');
    Subtotal$ = Subtotal$.replace(/\s+/g, '');
    TotalGIVA16$ = TotalGIVA16$.replace(/\s+/g, '');
    IVA16$ = IVA16$.replace(/\s+/g, '');
    TotalGIVA8$ = TotalGIVA8$.replace(/\s+/g, '');
    IVA8$ = IVA8$.replace(/\s+/g, '');
    TotalGExento$ = TotalGExento$.replace(/\s+/g, '');
    Exento$ = Exento$.replace(/\s+/g, '');
    Total$ = Total$.replace(/\s+/g, '');
     // Agregar console.log para visualizar los valores
     console.log({
      Subtotal$,
      TotalGIVA16$,
      IVA16$,
      TotalGIVA8$,
      IVA8$,
      TotalGExento$,
      Exento$,
      Total$,
  });
    return {Subtotal$, TotalGIVA16$, IVA16$, TotalGIVA8$, IVA8$, TotalGExento$, Exento$, Total$};
  }

  async getDataAccountingNotes() {
    console.log('Apuntes Contables Montos en Dolares y BS:');
    let DebitoTotal$ = await this.getLocatorInnerText('//td[@class="o_list_number"]/span[@data-tooltip="Débito total"]', true, 'DebitoTotal$');
    let CreditoTotal$ = await this.getLocatorInnerText('//td[@class="o_list_number"]/span[@data-tooltip="Crédito total"]', true, 'TotalDebitoAlternoBS');
    let TotalDebitoAlternoBS = await this.getLocatorInnerText('//td[@class="o_list_number"]/span[@data-tooltip="Total Débito Alterno"]', true, 'TotalDebitoAlternoBS');
    let TotalCreditoAlternoBS = await this.getLocatorInnerText('//td[@class="o_list_number"]/span[@data-tooltip="Total Crédito Alterno"]', true, 'TotalCreditoAlternoBS:');
    DebitoTotal$ = DebitoTotal$.replace(/\s+/g, '');
    CreditoTotal$ = CreditoTotal$.replace(/\s+/g, '');
    TotalDebitoAlternoBS = TotalDebitoAlternoBS.replace(/\s+/g, '');
    TotalCreditoAlternoBS = TotalCreditoAlternoBS.replace(/\s+/g, '');
    // Agregar console.log para visualizar los valores
      console.log({
      DebitoTotal$,
      CreditoTotal$,
      TotalDebitoAlternoBS,
      TotalCreditoAlternoBS,
      });
    return {DebitoTotal$, CreditoTotal$, TotalDebitoAlternoBS, TotalCreditoAlternoBS};
  }

  async getDataForeinCurrency () {
    console.log('Moneda Alterna Monto en BS:');
    let SubtotalBs = await this.getLocatorInnerText('//span[@name="Subtotal"]', true, 'SubtotalBS');
    let TotalGIVA16Bs = await this.getLocatorInnerText('//label[text()="Total G IVA 16%"]//following::td/span', true, 'TotalGIVA16Bs');
    let IVA16Bs = await this.getLocatorInnerText('//label[text()="IVA 16%"]//following::td/span', true, 'TotalGIVA16Bs');
    let TotalGIVA8Bs = await this.getLocatorInnerText('//label[text()="Total G IVA 8%"]//following::td/span', true, 'IVA16Bs');
    let IVA8Bs = await this.getLocatorInnerText('//label[text()="IVA 8%"]//following::td/span', true, 'IVA8Bs');
    let TotalGExentoBs = await this.getLocatorInnerText('//label[text()="Total G Exento"]//following::td/span', true, 'TotalGExentoBs');
    let ExentoBs = await this.getLocatorInnerText('//label[text()="Exento"]//following::td/span', true, 'ExentoBs');
    let TotalBs = await this.getLocatorInnerText('//label[text()="Total"]//following::td/span', true, 'TotalBs');
    SubtotalBs = SubtotalBs.replace(/\s+/g, '');
    TotalGIVA16Bs = TotalGIVA16Bs.replace(/\s+/g, '');
    IVA16Bs = IVA16Bs.replace(/\s+/g, '');
    TotalGIVA8Bs = TotalGIVA8Bs.replace(/\s+/g, '');
    IVA8Bs = IVA8Bs.replace(/\s+/g, '');
    TotalGExentoBs = TotalGExentoBs.replace(/\s+/g, '');
    ExentoBs = ExentoBs.replace(/\s+/g, '');
    TotalBs = TotalBs.replace(/\s+/g, '');
    // Agregar console.log para visualizar los valores
    console.log({
      SubtotalBs,
      TotalGIVA16Bs,
      IVA16Bs,
      TotalGIVA8Bs,
      IVA8Bs,
      TotalGExentoBs,
      ExentoBs,
      TotalBs,
  });
    return {SubtotalBs, TotalGIVA16Bs, IVA16Bs, TotalGIVA8Bs, IVA8Bs, TotalGExentoBs, ExentoBs, TotalBs};
  }
  
  async getDataIVARetention () {
    console.log('Retención IVA Montos en BS:');
    let RetencionIVAAlterno16BS = await this.getLocatorInnerText('(//div[@name="foreign_iva_amount"]/span)[1]', true,'RetencionIVAAlterno16BS');    
    let RetencionIVAAlterno8BS = await this.getLocatorInnerText('(//div[@name="foreign_iva_amount"]/span)[2]', true,'RetencionIVAAlterno8BS');
    let MontoRetenidoAlterno16BS = await this.getLocatorInnerText('(//div[@name="foreign_retention_amount"]/span)[1]', true,'MontoRetenidoAlterno16BS');
    let MontoRetenidoAlterno8BS = await this.getLocatorInnerText('(//div[@name="foreign_retention_amount"]/span)[2]', true,'MontoRetenidoAlterno16BS'); 
    RetencionIVAAlterno16BS = RetencionIVAAlterno16BS.replace(/\s+/g, '');
    RetencionIVAAlterno8BS = RetencionIVAAlterno8BS.replace(/\s+/g, '');
    MontoRetenidoAlterno16BS = MontoRetenidoAlterno16BS.replace(/\s+/g, '');
    MontoRetenidoAlterno8BS = MontoRetenidoAlterno8BS.replace(/\s+/g, '');   
     // Agregar console.log para visualizar los valores
      console.log({
      RetencionIVAAlterno16BS,
      RetencionIVAAlterno8BS,
      MontoRetenidoAlterno16BS,
      MontoRetenidoAlterno8BS,
       });
    return {RetencionIVAAlterno16BS, RetencionIVAAlterno8BS, MontoRetenidoAlterno16BS, MontoRetenidoAlterno8BS};
  }
   //FUNCIONES ESPECIALES

   //FUNCIÓN PARA TOMAR EL VALOR DE UN INPUT DADO UN LOCALIZADOR
  async getLocatorInputValue(locator: string, consoleLog: boolean = false, tagConsoleLog: string = 'innerText'): Promise<string> {
    try {
      // Localizar el elemento una sola vez
      const element = this.commonActions.page.locator(locator).first();
      // Esperar a que el elemento sea visible
      await element.waitFor({ state: 'visible' });
      // Verifica si el elemento está habilitado
      const isEnabled = await element.isEnabled();
      if (!isEnabled) {
        throw new Error(`El elemento no está habilitado: ${locator}`);
      }
      // Obtener el valor del input
      const inputValue = await element.inputValue();
      // Consola opcional
      if (consoleLog) {
        console.log(`${tagConsoleLog}: ${inputValue}`);
      }
      return inputValue; // Devuelve el valor
    } catch (error) {
      console.error(`Error obteniendo el valor del input en ${locator}:`, error);
      throw error; // Propaga el error para que el caso de prueba falle correctamente
    }
  }

  //FUNCIÓN PARA TOMAR EL TEXTO DE UN ELEMENTO DADO UN LOCALIZADOR
  async getLocatorInnerText(locator: string, consoleLog: boolean = false, tagConsoleLog: string = 'innerText'): Promise<string> {
    try {
      // Localizar el elemento una sola vez
      const element = this.commonActions.page.locator(locator).first();
      // Esperar a que el elemento sea visible
      await element.waitFor({ state: 'visible' });
      // Verifica si el elemento está habilitado
      const isEnabled = await element.isEnabled();
      if (!isEnabled) {
        throw new Error(`El elemento no está habilitado: ${locator}`);
      }
      // Obtener el texto interno
      const innerText = await element.innerText(); // Cambiar inputValue() a innerText()
      // Loguear el valor si se indica
      if (consoleLog) {
        console.log(`${tagConsoleLog}: ${innerText}`);
      }
      return innerText;
    } catch (error) {
      console.error(`Error obteniendo innerText del elemento en ${locator}:`, error);
      throw error; // Propaga el error para que el caso de prueba falle correctamente
    }
  }
} 