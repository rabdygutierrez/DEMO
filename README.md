# BapTeam

## Getting started

To make it easy for you to get started with GitHub, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.github.com/en/github/working-with-files/creating-new-files) or [upload](https://docs.github.com/en/github/working-with-files/adding-a-file-to-a-repository) files

- [ ] [Add files using the command line](https://docs.github.com/en/github/using-git/adding-a-file-to-a-repository-using-the-command-line) or push an existing Git repository with the following command:


```
cd existing_repo
git remote add origin https://github.com/AdminBapTeam/playwright-test.git
git branch -M main
git push -u origin main
```


## Integrate with your tools

- [ ] [Set up project integrations](https://github.com/AdminBapTeam/playwright-test/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/inviting-collaborators-to-a-personal-repository)
- [ ] [Create a new pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)
- [ ] [Automatically close issues from pull requests](https://docs.github.com/en/github/managing-your-work-on-github/closing-issues-using-keywords)
- [ ] [Enable pull request reviews](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews)
- [ ] [Set up branch protection rules](https://docs.github.com/en/github/administering-a-repository/about-protected-branches)

## Test and Deploy

Use the built-in continuous integration in GitHub Actions.

- [ ] [Get started with GitHub Actions](https://docs.github.com/en/actions/quickstart)
- [ ] [Analyze your code for known vulnerabilities with CodeQL](https://docs.github.com/en/code-security/supply-chain-security/what-is-codeql)
- [ ] [Deploy to cloud services or other platforms using GitHub Actions](https://docs.github.com/en/actions/deployment)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

<style>
H1 {
  color: #6684e6;
  font-size: 30px;
  font-weight: bold;
}
H2 {
  color: #69a94b;
  font-weight: bold;
  font-variant-caps: petite-caps;
}
H3 {
  color: #ba8435;  font-weight: bold;
}
H4 {
  color: #69a94b;
  font-weight: bold;
  font-style: italic;
  font-variant: small-caps;
}
H5 {
  color: #741b1d;
}
</style>

![Playwright](https://www.lambdatest.com/resources/images/header/Playwright_logo.svg)

![bap-team](url-logo)

![NodeJS](https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg)
![TypeScript](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg)
![VSCode](https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg)

# TEST AUTOMATION ENGINEER GUIDE

## Configurando nuestro proyecto

Para configurar correctamente tu proyecto de Playwright, deberás seguir los pasos listados a continuación.

### Nodejs

1. Instalar https://nodejs.org/es

### VSCode

1. Instalar: https://code.visualstudio.com/
2. Instalar: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

### Crear un directorio para el proyecto

1. Abrir una terminal en Visual Studio Code

```sh
mkdir arc-playwright-test
cd arc-playwright-test
```

### Clonar el repositorio

```sh
git clone url_repo
```

### Instalar paquetes requeridos y dependencias

```sh
cd e2e
npm i
```

### Verificar que la instalación fue exitosa

```sh
npx playwright test --grep "@tag"
```

### Algunas pautas básicas a la hora de hacer scripts automatizados

Antes de realizar un Pull Request, verificar que tu código cumple con estas pautas básicas.

#### Contextualizando un script

Quitar el contexto {page} de la asincronía donde definimos el caso.

- 1. Correcto

```TypeScript
test('nameTestCase @tag', async () => {
  // pasos
});
```

- 2. Incorrecto

```TypeScript
test('nameTestCase @tag', async ({page}) => {
  // pasos
});
```

#### beforeEach e inicios de sesión

Los inicios de sesión se definen en cada caso de prueba, no en las instancias beforeEach.

```TypeScript
test('nameTestCase @tag', async () => {
  await loginPage.loginARC(username, password, baseURL);
  // pasos
});
```

#### Declaración de constantes

Las constantes se declaran siempre al principio de cada caso.

- 1. Correcto
```TypeScript
test('nameTestCase @tag', async () => {
  const enviroment = new Enviroment('ARC');
  const {baseURL, username, password} = enviroment;  
  const oldPath = "test-files/xlsxTestBapTeam.xlsx";
  const name = randomLetters(8);
  const newPath = "test-files/" + name + "xlsxTestBapTeam.xlsx";
  await loginPage.loginARC(username, password, baseURL);
  await loginPage.verifyARC();
  await sideBar.searchAgent('Jeaninne Rivera');
  await sideBar.clickModuleACA();
  await acaPage.clickSelectOptionPolicyAssignment();   
  await acaPage.clickAssignment();
  await acaPage.clickButtonNext();
  await acaPage.renameFile(oldPath, newPath);
  await acaPage.fileUploadFile(newPath);
  await acaPage.renameFile(newPath, oldPath );
  await acaPage.clickButtonSubmit();
});
  ```

- 2. Incorrecto
```TypeScript
  test('nameTestCase @tag', async () => {
  const enviroment = new Enviroment('ARC');
  const {baseURL, username, password} = enviroment; 
  await loginPage.loginARC(username, password, baseURL); 
  await loginPage.verifyARC();
  await sideBar.searchAgent('Jeaninne Rivera');
  await sideBar.clickModuleACA();
  await acaPage.clickSelectOptionPolicyAssignment();   
  await acaPage.clickAssignment();
  await acaPage.clickButtonNext();
  const name = randomLetters(8);
  const oldPath = "test-files/xlsxTestBapTeam.xlsx";
  const newPath = "test-files/" + name + "xlsxTestBapTeam.xlsx";
  await acaPage.renameFile(oldPath, newPath);
  await acaPage.fileUploadFile(newPath);
  await acaPage.renameFile(newPath, oldPath );
  await acaPage.clickButtonSubmit();
  });

  ```

#### Cierre de contextos iniciados

No es necesario declarar el cierre de un contexto en cada caso. El contexto mainPage es finalizado luego de cada caso de forma automática en la instancia afterEach() que debería estar al final de cada .spec.ts.

- 1. Correcto
```TypeScript
test.afterEach(async () => { await mainPage.close(); });
```

- 2. Incorrecto
```TypeScript
test('nameTestCase @tag', async () => {
  // pasos
  await mainPage.close();
});
```

#### Espaciado y formato

Respetar los espacios entre las porciones de código y utilizar los separadores siguiendo el ejemplo a continuación.

```TypeScript
import { test, expect } from "@playwright/test";
import { BrowserContext, Page } from "playwright-core";
// otros import

let mainPage: Page;
let loginPage: LoginPage;
// otros let

test.beforeEach(async ({ page, context }) => {  mainPage = page;
  loginPage = new LoginPage(mainPage);
  browserContext = context;
  sideBar = new SideBar(mainPage);
});

```

#### Ejecuciones en el Pipeline

Las ejecuciones de los casos de prueba se realizan en el pipeline llamado  `arc-playwright-test`

- Pipeline: url_pipeline

- 1. Presionar el botón `Run pipeline`.
- 2. Escojer la rama correspondiente (por ej: `task_123456`).
- 3. Ingresar el comando de ejecución en el campo testNames siguiendo los ejemplos a continuación.

Por defecto, el pipeline siempre antepondrá las palabras `npx playwright test` a nuestro comando. Por lo que solo deberás indicarle lo que viene a continuación.

Una test suite específica:
```TypeScript
- nameFile.spec.ts
```

Un tag específico:
```TypeScript
- --grep "@tag"
```

Una test suite de un tenant específico:
```TypeScript
- --grep "@tag" nameFile.spec.ts
```

4. Importante: tener en cuenta que el primer guion y el primer espacio son necesarios al ejecutar en el pipeline

Una test suite de un tenant específico:
```TypeScript
- antes-de-esto-va-un-guion-y-un-espacio
```

#### Mantencion QA y DEVELOP

Se debe realizar mantencion en la rama qa (sin excepcion), cuando se entregue el ambiente para regresion, se debe realizar un PR desde qa hacia develop y ejecutar la regresion sobre la rama develop.

###### Otros

- 1. Para cambios en el Framework, consultar el archivo `CHANGELOG.md`
- 2. Última actualización: 26/08/2024
- 3. Autor: Raúl Gutiérrez
