// !!! Respetar la estructura de los datos
// * Siempre deberán estar anidados de la misma forma y
// * también deberán llevar siempre los mismos nombres.
// * De lo contrario, las pruebas fallarán.

export const QA = {
  // ! VARIABLES ARC
  PRACTICETESTAUTOMATION: {
    baseURL: process.env.PRACTICETESTAUTOMATION_QA_URL,
    username: process.env.PRACTICETESTAUTOMATION_QA_USERNAME,
    password: process.env.PRACTICETESTAUTOMATION_QA_PASSWORD,
  },
  
  // ! VARIABLES SAUCEDEMO
  SAUCEDEMO: {
    baseURL: process.env.SAUCEDEMO_QA_URL,
    username: process.env.SAUCEDEMO_QA_USERNAME,
    password: process.env.SAUCEDEMO_QA_PASSWORD,
  },

  BINAURAL: {
    baseURL: process.env.BINAURAL_QA_URL,
    username: process.env.BINAURAL_QA_USERNAME,
    password: process.env.BINAURAL_QA_PASSWORD,
  },
};
