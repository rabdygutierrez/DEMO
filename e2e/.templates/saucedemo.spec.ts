import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObject/LoginPage";
import { BrowserContext, Page } from "playwright-core";
import { SideBar } from "../../pageObject/common/SideBar";
import { SaucedemoPage } from "../../pageObject/SaucedemoPage";
import { Enviroment } from "../../enviroments/Enviroments";
import { FunctionSaucedemo } from "../../testingFunction/functionSaucedemo.spec";
import { initializeValues } from "../../initializeTestValues/initializeValuesSoucedemo.spec";

let loginPage: LoginPage;
let mainPage: Page;
let browserContext: BrowserContext;
let sideBar: SideBar;
let saucedemoPage: SaucedemoPage;
let functionSaucedemo: FunctionSaucedemo;
const enviroment = new Enviroment("SAUCEDEMO");
const { baseURL, username, password } = enviroment;

test.beforeEach(async ({ page, context }) => {
  mainPage = page;
  loginPage = new LoginPage(mainPage);
  browserContext = context;
  sideBar = new SideBar(mainPage);
  saucedemoPage = new SaucedemoPage(mainPage);
  functionSaucedemo = new FunctionSaucedemo(mainPage);
});

test('Test SauceDemo flujoExitoso', async ({ page }) => {
  await loginPage.loginSAUCEDEMO(enviroment.username, enviroment.password, enviroment.baseURL);
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await saucedemoPage.addProductToCart();
  await saucedemoPage.enterCart();
  await expect( page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
  await saucedemoPage.checkout();
  await saucedemoPage.firstName("first name");
  await saucedemoPage.lastName("last name");
  await saucedemoPage.postalCode("32020");
  await saucedemoPage.continue();
  await saucedemoPage.finish();
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});
test('Test SauceDemo locked out.', async ({ page }) => {
  await loginPage.loginSAUCEDEMO("locked_out_user", enviroment.password, enviroment.baseURL);
  const textElement = await page.locator('[data-test="error"]').textContent();
  expect(textElement).toContain("Epic sadface: Sorry, this user has been locked out.");
});

test('Test SauceDemo problem user', async ({ page }) => {
  await loginPage.loginSAUCEDEMO("problem_user", enviroment.password, enviroment.baseURL);    
  await saucedemoPage.addProductToCart();
  await saucedemoPage.enterCart();  
  await saucedemoPage.checkout();
  await saucedemoPage.firstName("first name");
  await saucedemoPage.lastName("last name");
  await saucedemoPage.postalCode("32020");
  await saucedemoPage.continue();    
 await expect(page.getByText('Error: Last Name is required')).toBeVisible();
});

test('test usuarioFallaRendimiento', async ({ page }) => {
  let diff: any;
  let starTime: any;
  let endTime: any;
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('performance_glitch_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  starTime = new Date();
  await page.locator('[data-test="login-button"]').click();
  expect(await page.getByText('Swag Labs')).toBeVisible();
  endTime = new Date();
  diff = endTime - starTime;
  expect(diff > 1);
}); 

test('Test SauceDemo error user', async ({ page }) => {
  
  await loginPage.loginSAUCEDEMO("error_user", enviroment.password, enviroment.baseURL);
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await saucedemoPage.addProductToCart();
  await saucedemoPage.enterCart();
  await expect( page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
  await saucedemoPage.checkout();
  await saucedemoPage.firstName("first name");
  await saucedemoPage.lastName("last name");
  await saucedemoPage.postalCode("32020");
  await saucedemoPage.continue();
  const [response] = await Promise.all([
    page.waitForResponse(response => 
      response.url().includes('https://events.backtrace.io/api/unique-events/submit') && 
      response.status() === 401
    ),
    saucedemoPage.finish()
  ]);
  // Validar el cuerpo de la respuesta
  const responseBody = await response.json();
  expect(response.status()).toBe(401);
  expect(responseBody.error.message).toBe("Unauthorized request");
  expect(responseBody.error.code).toBe(6);
});

test.afterEach(async () => {
  await mainPage.close();
  await mainPage.context().close();
});