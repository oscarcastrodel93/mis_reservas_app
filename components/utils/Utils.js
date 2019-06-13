import { Toast } from 'native-base';

/**
 * Retorna fecha actual en formato YYYY-MM-DD
 */
export const getCurrentDateDB = function () {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    let date_db_format = year + "-" + (month<10 ? '0'+month : month) + "-" + (date<10 ? '0'+date : date);
    return date_db_format;
}

/**
 * Retorna array con la hora actual [hora, minutos, segundos]
 * @param index Identifica cual indice del array se debe retornar
 * @returns array or int
 */
export const getCurrentTime = function (index) {
    let time = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()];
    return index===undefined ? time : time[index];
}

/**
 * Genera mensajes en la parte inferior de la aplicacion
 * @param message (Mensaje a mostrar)
 * @param type (Tipo de alerta: danger, warning, success. Si esta en false muestra una por defecto)
 * @param duration (Tiempo que dura la alerta antes de ocultarse automáticamente)
 */
export const ToastService = {
    showToast: (message, type=false, duration = 5000) => {
        Toast.show({
            type,
            text: message,
            duration,
            position: 'bottom',
            textStyle: { textAlign: 'center' },
            buttonTextStyle: { color: "#cdcdcd" },
            buttonText: 'Ok',
        });
    },
  };
