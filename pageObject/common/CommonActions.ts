import { Page } from "playwright-core";
export class CommonActions {
  locator(arg0: string) {
    throw new Error("Method not implemented.");
  }
  page: Page;
  time: number;
  waitTimeOut = 30000;
  constructor(page: Page) {
    this.page = page;
    this.time = 1;
  }

  // Actualización: 21/06/2024
  // Por: Raúl Gutiérrez
  // Para comprender este archivo, favor de leer:
  // 1. https://playwright.dev/docs/locators
  // 2. https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/
  // Los métodos comunes tienen 2 versiones, con y sin iframe.

  // Valida que el elemento este disponible, visible y habilitado
  private async waitForElementValidation(locator: any) {
    await locator.waitFor({ state: "attached", timeout: this.waitTimeOut });
    await locator.waitFor({ state: "visible", timeout: this.waitTimeOut });
    const isEnabled = await locator.isEnabled();
    if (!isEnabled) {
      throw new Error(`El elemento no está habilitado.`);
    }
  }

  // goto url
  async visitPageAndWait(page: any, timeOutSeconds: number) {
    await this.page.goto(page, { timeout: timeOutSeconds * 1000 });
    await this.page.waitForLoadState();
    await this.page.waitForLoadState( "networkidle");
    await this.page.waitForTimeout(1000 * this.time);
  }

  // getByRoleButton // click a un botón
  async getByRoleButtonClick(name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("button", { name }).first();
    } else {
      locator = this.page.getByRole("button", { name }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByRoleOption // click a opción de un dropdown
  async getByRoleOptionClick(name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("option", { name}).first();
    } else {
      locator = this.page.getByRole("option", { name}).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  async getByRoleOptionClickExact(name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("option", { name, exact: true }).first();
    } else {
      locator = this.page.getByRole("option", { name, exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByRoleTab // click a una pestaña dentro de tab bar
  async getByRoleTabClick(name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("tab", { name }).first();
    } else {
      locator = this.page.getByRole("tab", { name }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }
  

  // getByRoleArticle // click a un artículo
  async getByRoleArticleClick(name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("article", { name }).first();
    } else {
      locator = this.page.getByRole("article", { name }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByRoleCheckbox // marca un checkbox como check (true)
  async getByRoleCheckbox(name: string, seconds: number , iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole("checkbox", { name }).first();
    } else {
      locator = this.page.getByRole("checkbox", { name }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.getByRole("checkbox").check();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByPlaceholder // click en placeholder y rellenar
  async getByPlaceholderClickAndFill(placeholder: string, text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByPlaceholder(placeholder).first();
    } else {
      locator = this.page.getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await locator.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // placeholderClick // click a un elemento segun el placeholder
  async placeholderClick(text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByPlaceholder(text).first();
    } else {
      locator = this.page.getByPlaceholder(text).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByLabel // click en label
  async getByLabelClick(label: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByLabel(label).first();
    } else {
      locator = this.page.getByLabel(label).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  async getByLabelClickExact(label: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByLabel(label, { exact: true }).first();
    } else {
      locator = this.page.getByLabel(label, { exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByLabel // click en label y rellenar
  async getByLabelClickAndFill(label: string, text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByLabel(label).first();
    } else {
      locator = this.page.getByLabel(label).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await locator.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorClick // click en un locator
  async locatorClick(locator: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorClickAndFill // click y rellenar un locator
  async locatorClickAndFill(locator: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorClickAndType // click y rellenar un locator
  async locatorClickAndType(locator: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.type(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

    // locatorClickClearType // click y rellenar un locator
    async locatorClickClearType(locator: string, text: string, seconds: number, iframe?: string) {
      let selector: any;
      if (iframe) {
        const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
        selector = frame.locator(locator).first();
      } else {
        selector = this.page.locator(locator).first();
      }
      await this.waitForElementValidation(selector);
      await selector.click();
      await selector.clear();
      await selector.type(text);
      await this.page.waitForTimeout(seconds * 1000 * this.time);
    }
  

  // locatorPressKeyboard // pulsar una tecla
  async locatorPressKeyboard(locator: string, keyboard: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.press(keyboard);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorOption // seleccionar opción de un locator
  async locatorOption(locator: string, option: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator);
    } else {
      selector = this.page.locator(locator);;
    }
    await this.waitForElementValidation(selector);
    await selector.selectOption(option);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByTextClick// click a un elemento segun el texto
  async getByTextClick(text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByText(text).first();
    } else {
      locator = this.page.getByText(text).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByTextExactClick// click a un elemento segun el texto
  async getByTextExactClick(text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByText(text, { exact: true }).first();
    } else {
      locator = this.page.getByText(text, { exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByTextClickExact// click a un elemento segun el texto exacto
  async getByTextClickExact(text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByText(text, { exact: true }).first();
    } else {
      locator = this.page.getByText(text, { exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByRoleType // click a un elemento según tipo de Role
  async getByRoleType(type: any, name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole(type, { name, exact: true }).first();
    } else {
      locator = this.page.getByRole(type, { name, exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // getByRoleType // click a un elemento según tipo de Role y rellenar
  async getByRoleTypeAndFill(type: any, name: string, text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole(type, { name, exact: true }).first();
    } else {
      locator = this.page.getByRole(type, { name, exact: true }).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await locator.type(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorByTextClick // click en un locator, by Text
  async locatorByTextClick(locator: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).getByText(text).first();
    } else {
      selector = this.page.locator(locator).getByText(text).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // byLabelRoleClick // click en un label seguido de Role
  async byLabelRoleClick(label: string, typeRole: any, name: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByLabel(label).getByRole(typeRole, { name, exact: true}).first();
    } else {
      locator = this.page.getByLabel(label).getByRole(typeRole, { name, exact: true}).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorByLabelClick // click en un locator, by Label
  async locatorByLabelClick(locator: string, label: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).getByLabel(label).first();
    } else {
      selector = this.page.locator(locator).getByLabel(label).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorByPlaceholderClick // click en un locator, by Placeholder
  async locatorByPlaceholderClick(locator: string, placeholder: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.locator(locator).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // fileUploadLocator // cargar un archivo por un locator
  async fileUploadLocator(locator: string, filePath: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await selector.setInputFiles(filePath);
    await this.page.waitForTimeout(seconds * 1000);
  }

  // locatorFilter // click en un locator, filter
  async locatorFilterClick(locator: string, filter: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).filter({ hasText: filter }).first();
    } else {
      selector = this.page.locator(locator).filter({ hasText: filter }).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorFilterByLocator // click en un locator, filter, by locator
  async locatorFilterByLocatorClick(firstLocator: string, filter: string, secondLocator: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(firstLocator).filter({ hasText: filter }).locator(secondLocator).first();
    } else {
      selector = this.page.locator(firstLocator).filter({ hasText: filter }).locator(secondLocator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorFilterByLocatorClickAndType // click en un locator, filter, by locator, type
  async locatorFilterByLocatorClickAndType(firstLocator: string, filter: string, secondLocator: string, text: string, seconds: number, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.locator(firstLocator).filter({ hasText: filter }).locator(secondLocator).first();
    } else {
      locator = this.page.locator(firstLocator).filter({ hasText: filter }).locator(secondLocator).first();
    }
    await this.waitForElementValidation(locator);
    await locator.click();
    await this.page.keyboard.type(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorFilterByPlaceHolder // click en un locator, filter, by placeholder
  async locatorFilterByPlaceHolderClick(locator: string, filter: string, placeholder: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // locatorFilterByLabel // click en un locator, filter, by label
  async locatorFilterByLabelClick(locator: string, filter: string, label: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).filter({ hasText: filter }).getByLabel(label).first();
    } else {
      selector = this.page.locator(locator).filter({ hasText: filter }).getByLabel(label).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }


  // locatorFilterByPlaceHolder // click en un locator, filter, by placeholder
  async locatorFilterByPlaceHolderClickAndFill(locator: string, filter: string, placeholder: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

   // locatorFilterByPlaceHolder // click en un locator, filter, by placeholder
   async locatorFilterByPlaceHolderClickClearFill(locator: string, filter: string, placeholder: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.clear();
    await selector.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }


  // byLabelLocatorFilterByPlaceHolder // click en un locator, filter, by placeholder
  async byLabelLocatorFilterByPlaceHolderClickAndFill(label: string, locator: string, filter: string, placeholder: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.getByLabel(label).locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.getByLabel(label).locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.fill(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // byLabelLocatorFilterByPlaceHolderClickAndType // click en un locator, filter, by placeholder
  async byLabelLocatorFilterByPlaceHolderClickAndType(label: string, locator: string, filter: string, placeholder: string, text: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.getByLabel(label).locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    } else {
      selector = this.page.getByLabel(label).locator(locator).filter({ hasText: filter }).getByPlaceholder(placeholder).first();
    }
    await this.waitForElementValidation(selector);
    await selector.click();
    await selector.type(text);
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }

  // waitforGetByRole // Espera que el Elemento se encuentre en pantalla
  async waitforGetByRole(typeRole: any, name: string, waitForState: any, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByRole(typeRole, { name, exact: true }).first();
    } else {
      locator = this.page.getByRole(typeRole, { name, exact: true }).first();
    }
    await locator.waitFor({ state: waitForState });
  }


  // waitforGetByText // Espera que el Elemento se encuentre en pantalla
  async waitforGetByText(text: string, waitForState: any, iframe?: string) {
    let locator: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      locator = frame.getByText(text, { exact: true }).first();
    } else {
      locator = this.page.getByText(text, { exact: true }).first();
    }
    await locator.waitFor({ state: waitForState });
  }

  // locatorInnerText // Obtiene el texto de un localizador
  async locatorInnerText(locator: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await selector.waitFor({ state: 'visible' });
    const selectorIsVisible = await selector.isVisible();
    let innerTextSeletor: any;
    if (selectorIsVisible) {
      innerTextSeletor = selector.innerText();
    } else {
      innerTextSeletor = null;
    }
    await this.page.waitForTimeout(seconds * 1000 * this.time);
    return innerTextSeletor;
  }

  // locatorClear // limpiar un elemento usando un locator
  async locatorClear(locator: string, seconds: number, iframe?: string) {
    let selector: any;
    if (iframe) {
      const frame = this.page.frameLocator('internal:attr=[title="' + iframe + '"i]').first();
      selector = frame.locator(locator).first();
    } else {
      selector = this.page.locator(locator).first();
    }
    await this.waitForElementValidation(selector);
    await selector.clear();
    await this.page.waitForTimeout(seconds * 1000 * this.time);
  }
}
