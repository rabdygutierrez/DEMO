import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObject/LoginPage";
import { BrowserContext, Page } from "playwright-core";
import { SideBar } from "../../pageObject/common/SideBar";
import { PracticeTestAutomationPage } from "../../pageObject/PracticeTestAutomationPage";
import { Enviroment } from "../../enviroments/Enviroments";
import { FunctionPracticeTestAutomation } from "../../testingFunction/functionPracticeTestAutomation.spec";


let loginPage: LoginPage;
let mainPage: Page;
let browserContext: BrowserContext;
let sideBar: SideBar;
let practiceTestAutomationPage: PracticeTestAutomationPage;
let functionPracticeTestAutomation: FunctionPracticeTestAutomation;
const enviroment = new Enviroment("PRACTICETESTAUTOMATION");
const { baseURL, username, password } = enviroment;

test.beforeEach(async ({ page, context }) => {
    mainPage = page;
    loginPage = new LoginPage(mainPage);
    browserContext = context;
    sideBar = new SideBar(mainPage);
    practiceTestAutomationPage = new PracticeTestAutomationPage(mainPage);
    functionPracticeTestAutomation = new FunctionPracticeTestAutomation(mainPage);
  });

  test('Practice Test Automation Login', async ({ page }) => {
    await loginPage.loginPRACTICETESTAUTOMATION(enviroment.username, enviroment.password, enviroment.baseURL);
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  });
  
  test.afterEach(async () => {
    await mainPage.close();
    await mainPage.context().close();
  });