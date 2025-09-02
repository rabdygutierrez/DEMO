const randomString = (length) => {
  let characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "U",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  let n = characters.length - 1;
  let cad = "";
  for (let i = 0; i < length; i++) {
    let r = Math.floor(Math.random() * n);
    cad += characters[r];
  }

  return cad;
};

export { randomString };

const randomLetters = (length) => {
  let characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "U",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let n = characters.length - 1;
  let cad = "";
  for (let i = 0; i < length; i++) {
    let r = Math.floor(Math.random() * n);
    cad += characters[r];
  }

  return cad;
};

export { randomLetters };

const randomNumber = (length) => {
  let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let n = numbers.length - 1;
  let cad = "";
  for (let i = 0; i < length; i++) {
    let r = Math.floor(Math.random() * n);
    cad += numbers[r];
  }

  return cad;
};

export { randomNumber };

function randomRUT(length: number): string {
  let rut = "";
  let sum = 0;
  let factor = 2;
  let dv: string;

  // Generar números aleatorios para los primeros 7 dígitos del RUT
  while (rut.length < length - 1) {
    let num = Math.floor(Math.random() * 10);
    if (rut.length === 0 && num === 0) {
      continue; // Saltar si el primer número generado es 0
    }
    rut += num;
  }

  // Agregar lógica para asegurarse de que el RUT sea menor a 50 millones
  if (length === 7) {
    let maxFirstDigit = 4; // Establecer el máximo primer dígito a 4
    rut = Math.floor(Math.random() * maxFirstDigit + 1) + rut; // Generar un número aleatorio entre 1 y maxFirstDigit y concatenarlo al RUT
  } else {
    let maxFirstDigit = 3; // Establecer el máximo primer dígito a 3
    rut = Math.floor(Math.random() * maxFirstDigit + 4) + rut; // Generar un número aleatorio entre 4 y maxFirstDigit+3 y concatenarlo al RUT
  }

  // Calcular el dígito verificador (DV) para el RUT generado
  for (let i = rut.length - 1; i >= 0; i--) {
    sum += parseInt(rut.charAt(i)) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  let remainder = sum % 11;
  dv = remainder === 0 ? "0" : (11 - remainder).toString();

  if (length === 7) {
    // Si la longitud es 7, asegurarse de que el dígito verificador sea un número
    dv = dv === "K" ? "0" : dv;
  } else {
    // Si la longitud es 8, permitir tanto números como la letra "K" como dígito verificador
    dv = dv === "10" ? "K" : dv;
  }

  return rut + dv;
}

export { randomRUT };

function getDateFormat(date: Date): Record<string, any> {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthInLetters = monthsOfYear[date.getMonth()];
  const monthInNumber = date.getMonth() + 1;
  const fullYear = date.getFullYear();
  const shortYear = Number(String(fullYear).slice(-2));
  const longFormat = `${monthInLetters} ${dayOfMonth}, ${fullYear}`;
  const shortFormat = `${monthInNumber}/${dayOfMonth}/${shortYear}`;
  const monthAndYearLetters = `${monthInLetters} ${fullYear}`;
  const monthInLettersShort = monthInLetters.substring(0, 3).toUpperCase();
  const fullMonthAndYear = monthInLetters + " " + fullYear;
  const fullDateNumber = `${monthInNumber}/${dayOfMonth}/${fullYear}`;
  const dateToday = `${dayOfMonth}/${monthInNumber}/${fullYear}`;
  return {
    dayOfWeek, //dayOfWeek: "Friday",
    dayOfMonth, //dayOfMonth: 25,
    monthInLetters, //monthInLetters: "January",
    monthInNumber, //monthInNumber: 1,
    fullYear, //fullYear: 2024,
    shortYear, //shortYear: 24,
    longFormat, //longFormat: "January 25, 2024",
    shortFormat, //shortFormat: "1/25/24",
    monthAndYearLetters, //monthAndYearLetters: "January 2024",
    monthInLettersShort, //monthInLettersShort: "JAN",
    fullMonthAndYear, //fullMonthAndYear:  "JAN 2024"
    fullDateNumber, //fullDateNumber: "1/25/2024"
    dateToday, //fulldatetoday : "25/12/2024"
  };
}

export { getDateFormat };
