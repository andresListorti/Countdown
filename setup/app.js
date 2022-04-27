const months = [
  "January",
  "February",
  "March",
  "April",
  "Mayo",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Lunes",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const regalo = document.querySelector(".giveaway");
const fechaFinal = document.querySelector(".deadline");
const itemsDeadline = document.querySelectorAll(".deadline-format h4");

let futuraFecha = new Date(2022, 4, 30, 11, 30, 00); // year, month -el mes es 0 index ojoooooo-, dia-date, hora, min, seg
// console.log(futuraFecha);

const year = futuraFecha.getFullYear();
const horas = futuraFecha.getHours();
const minutos = futuraFecha.getMinutes();

let mes = futuraFecha.getMonth();
mes = months[mes];

let dia = futuraFecha.getDate();

const weekday = weekdays[futuraFecha.getDay()]; // este otorga dia de la semana numerado como los meses de 0index y de domingo a sabado

regalo.textContent = `el regalo se va a dar el ${weekday}, ${dia} de ${mes} de ${year} a las ${horas}:${minutos}am`;

// futuro tiempo en milisegundos
const tiempoFuturo = futuraFecha.getTime(); // getTime nos da el tiempo enmilisegundos
// console.log(tiempoFuturo);

function getTiempoPendiente() {
  const today = new Date().getTime(); // el hoy tambien tiene un valor en milisegundos
  const t = tiempoFuturo - today; //el valor entre hoy y el futuro es el valor t
  // con  sole.log(today); // valor variable constantemente
  // console.log(t); // valor variable constantemente

  // 1 segundo = 1000 milisegundos
  // 1 minuto = 60 s o 60.000 milisegundos
  // 1 hora = 60 minutos o 3.600.000 milisegundos
  //
  // 1 dia = 24 horas o 86.400.000 milisegundos /// valor PPAL para llevar a variable y luego dividir
  //
  // 1 mes = 30 dias o 2.592.000.000 milisegundos
  // 1 year = 12 meses 31.104.000.000 milisegundos

  const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
  const unaHoraEnMilisegundos = 60 * 60 * 1000;
  const unMinutoEnMilisegundos = 60 * 1000;

  let diasPendientes = t / unDiaEnMilisegundos;
  diasPendientes = Math.floor(diasPendientes);
  // console.log(diasPendientes);

  let horasPendientes = (t % unDiaEnMilisegundos) / unaHoraEnMilisegundos; // lo que sobra de dividir el pendiente sobre el valor dia (o sea, el t remanente luego de sacar el t de dias-solo quedaran unas horas o minutos) --- eso, sobre el valor hora en milisegundos es dividido luego
  horasPendientes = Math.floor(horasPendientes);
  // console.log(horasPendientes);

  let minutosPendientes = Math.floor(
    (t % unaHoraEnMilisegundos) / unMinutoEnMilisegundos
  ); // lo que sobra de dividir el pendiente sobre el valor hora (o sea, el t remanente luego de sacar el t de horas-solo quedaran unos minutos o seg) ---esooo.... sobre el valor minuto en milisegundos, es dividido luego
  // console.log(minutosPendientes);

  let segundosPendientes = Math.floor((t % unMinutoEnMilisegundos) / 1000); // lo que sobra de dividir el pendiente sobre el valor minuto (o sea, el t remanente luego de sacar el t de minutos-solo quedaran unos segundos) ---esooo.... sobre el valor del segundo en milisegundos es dividido luego que en este caso es 1000
  // console.log(segundosPendientes);

  // set values array

  const valores = [
    diasPendientes,
    horasPendientes,
    minutosPendientes,
    segundosPendientes,
  ];
  // console.log(valores);

  // esta funcion le agrega un cero adelante si es un item solo menor a 10
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  itemsDeadline.forEach(function (item, index) {
    // console.log(index);
    // // console.log(item);
    // console.log(item.innerHTML);
    item.innerHTML = format(valores[index]); //asignamos a cada interno HTML de cada item iterado, el valor de cada valores[index] que seran 4 idem porque son los itemsDeadline puestos ver app:js:27
  });

  // antes de cerrar la funcion ppal getTiempoPendiente preparamos algo para el final de la cuenta que evita un error de diseniiioo

  if (t < 0) {
    clearInterval(cuentaAbajo);
    fechaFinal.innerHTML = `<h4 class="expired">perdone se ha terminado el regalo</h4>`;
  }
}

// cuenta regresiva

let cuentaAbajo = setInterval(getTiempoPendiente, 1000); // este metodo hace operar la funcion cada los milisegundos referidos en este caso cada segundo
getTiempoPendiente();
