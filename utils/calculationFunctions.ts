//Función para calcular el monto retenido alterno
const alternateRetentionAmount = (
    quantity: number,          // La cantidad de productos
    alternatePrice: number,    // El precio alterno por unidad
    ivaPercentage: number,     // El porcentaje de IVA (16%, 8%, etc.)
    retentionPercentage: number, // El porcentaje de retención (75%, etc.)
    decimals: number = 4,       // Opcional: número de decimales, valor por defecto 4
    consoleLog: boolean = false, // Opcional: activar la impresión de valores en consola
    tagConsoleLog: string = 'roundedAmount' // Opcional: colocar una etiqueta para identificar la impresión en consola
): any => {
    // Calcular el IVA basado en el porcentaje
    const iva = ivaPercentage / 100;

    // Calcular el monto base del IVA
    let baseAmount = quantity * alternatePrice * iva;

    // Aplicar el porcentaje de retención
    let retainedAmount = baseAmount * (retentionPercentage / 100);

    // Redondear al número de decimales especificado
    const roundedIVA = baseAmount.toFixed(decimals);
    // Formatear el valor con punto como separador de miles
    const parts1 = roundedIVA.split('.');
    const integerPart1 = parts1[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Separar miles
    const decimalPart1 = parts1[1] || '00'; // Obtener parte decimal o '00' si no hay
    const roundedIVA_exp = `${integerPart1},${decimalPart1}Bs`;

    const roundedAmount = retainedAmount.toFixed(decimals);
    // Formatear el valor con punto como separador de miles
    const parts2 = roundedAmount.split('.');
    const integerPart2 = parts2[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Separar miles
    const decimalPart2 = parts2[1] || '00'; // Obtener parte decimal o '00' si no hay
    const roundedAmount_exp = `${integerPart2},${decimalPart2}Bs`;

    if (consoleLog) {
        console.log(`${tagConsoleLog}: ${roundedIVA_exp}`);
        console.log(`${tagConsoleLog}: ${roundedAmount_exp}`);
    }
    const result = {
        roundedIVA_exp: roundedIVA_exp,
        roundedAmount_exp: roundedAmount_exp,
    }
    return result;
};

export { alternateRetentionAmount };


// Función para convertir valores de factura a bolívares
const convertAmountFrom$$ToBs = (
    valueIn$: { [key: string]: string }, // Objeto con valores en formato string
    exchangeRate: string,                          // Tasa de cambio en formato string
    decimals: number = 2,                           // Opcional: número de decimales, valor por defecto 2
    consoleLog: boolean = false, // Opcional: activar la impresión de valores en consola
    tagConsoleLog: string = 'valueBs' // Opcional: colocar una etiqueta para identificar la impresión en consola
): { [key: string]: string } => {
    const valueInBs: { [key: string]: string } = {};
    
    // Convertir la tasa de cambio a número
    const exchangeRateNum = parseFloat(exchangeRate.replace(',', '.'));

    // Iterar sobre las propiedades del objeto de entrada
    for (const key in valueIn$) {
        if (valueIn$.hasOwnProperty(key)) {
            // Extraer el valor numérico del string
            const numericValue = parseFloat(valueIn$[key].replace(/[$.]/g, '').replace(',', '.').trim());
            // Convertir el valor a bolívares
            const convertedValue = numericValue * exchangeRateNum;
            // Formatear el resultado a string con el número de decimales especificado
            const roundedValue = convertedValue.toFixed(decimals);
            
            // Formatear el valor con punto como separador de miles
            const parts = roundedValue.split('.');
            const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Separar miles
            const decimalPart = parts[1] || '00'; // Obtener parte decimal o '00' si no hay

            // Almacenar el resultado en el nuevo objeto con el nombre adecuado
            valueInBs[`${key.replace('$_exp', 'Bs_exp')}`] = `${integerPart},${decimalPart}Bs`;
        }
    }
    if (consoleLog) {
        console.log(`${tagConsoleLog}: ${JSON.stringify(valueInBs, null, 2)}`);
    }
    return valueInBs;
};

export { convertAmountFrom$$ToBs };