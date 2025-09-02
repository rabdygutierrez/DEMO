import {
    randomString,
    randomLetters,
    randomNumber,
    getDateFormat,
  } from "../utils/generateData";

function initializeValues(numberTest: string) {
    let dataValues: any;
    switch (numberTest) {
      case "E2E-BI-0000":
        dataValues = initializeValuesE2BI0000();
        break;
    default:
        throw new Error("Invalid test number");
    }
    return dataValues;
}

export { initializeValues };

function initializeValuesE2BI0000() {
    const dataTest = {
      controlNumber: "BAP" + randomString(6),
      providerOption: 'Proveedor A 75%',
      retention: "75",
      products: [
        {
          nameProduct: "Producto A",
          quantity: "10",
          price: "100",
          tax: "16%",
          nameLink: "Producto A Internal link"
        },
        {
          nameProduct: "Producto B",
          quantity: "2",
          price: "50",
          tax: "8%",
          nameLink: "Producto B Internal link"
        },
        {
          nameProduct: "Producto C",
          quantity: "2",
          price: "25",
          tax: "Exento",
          nameLink: "Producto C Internal link"
        }
      ],
      valueInvoiceLine$: {
        Subtotal$_exp: '$250,00',
        TotalGIVA16$_exp: '$100,00',
        IVA16$_exp: '$16,00',
        TotalGIVA8$_exp: '$100,00',
        IVA8$_exp: '$8,00',
        TotalGExento$_exp: '$50,00',
        Exento$_exp: '$0,00',
        Total$_exp: '$274,00',
      },
      valueAccountingNotes$: {
        TotalDebito$_exp: '$274,00',
        TotalCredito$_exp: '$274,00',
      },
      };
    return dataTest;
  }


  /*
  VALORES CALCULADOS MANUALMENTE PARA EL CASO DE PRUEBA
  SE TIENE SÓLO PARA REFERENCIAS Y VERIFICACIONES
  SubtotalBs_exp: '9.135,90Bs',
  TotalGIVA16Bs_exp: '3.654,36Bs',
  IVA16Bs_exp: '584,70Bs',
  TotalGIVA8Bs_exp: '3.654,36Bs',
  IVA8Bs_exp: '292,35Bs',
  TotalGExentoBs_exp: '1.827,18Bs',
  ExentoBs_exp: '0,00Bs',
  TotalBs_exp: '10.012,95Bs',
  TotalDebitoAlternoBS_exp: '10.012,95Bs',
  TotalCreditoAlternoBS_exp: '10.012,95Bs',
  RetencionIVAAlterno16BS_exp: '584,70Bs',
  RetencionIVAAlterno8BS_exp: '292,35Bs',
  MontoRetenidoAlterno16BS_exp: '438,52Bs',
  MontoRetenidoAlterno8BS_exp: '219,26Bs',
  */