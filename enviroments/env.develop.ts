// !!! Respetar la estructura de los datos
// * Siempre deberán estar anidados de la misma forma y
// * también deberán llevar siempre los mismos nombres.
// * De lo contrario, las pruebas fallarán.

export const DEVELOP = {
  // ! VARIABLES ARC
  PRACTICETESTAUTOMATION: {
    baseURL: process.env.PRACTICETESTAUTOMATION_DEVELOP_URL,
    username: process.env.PRACTICETESTAUTOMATION_DEVELOP_USERNAME,
    password: process.env.PRACTICETESTAUTOMATION_DEVELOP_PASSWORD,
  },
  // ! VARIABLES SAUCEDEMO
  SAUCEDEMO: {
    baseURL: process.env.SAUCEDEMO_DEVELOP_URL,
    username: process.env.SAUCEDEMO_DEVELOP_USERNAME,
    password: process.env.SAUCEDEMO_DEVELOP_PASSWORD,
  },

  BINAURAL: {
    baseURL: process.env.BINAURAL_DEVELOP_URL,
    username: process.env.BINAURAL_DEVELOP_USERNAME,
    password: process.env.BINAURAL_DEVELOP_PASSWORD,
  },
};
