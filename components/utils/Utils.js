import { Toast } from 'native-base';
import { system_enums } from './Enums';

/**
 * Retorna fecha actual en formato YYYY-MM-DD
 * @returns [str] fecha
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
 * @returns [array] or int
 */
export const getCurrentTime = function (index) {
    let time = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()];
    return index===undefined ? time : time[index];
}

/**
 * Recibe una fecha en formato YYYY-MM-DD y la retorna en un formato mas entendible
 * @param db_date fecha en formato YYYY-MM-DD
 * @returns [str] fecha en formato entendible. Ej: Lunes, 15 de Julio de 2019
 */
export const getHumanDate = function(db_date){
    try{
        let date_part = db_date.split("-");
        let jsDate = new Date(date_part[0], parseInt(date_part[1]) - 1, date_part[2].substr(0,2));
        
        let human_date = system_enums['days_of_week_js'][jsDate.getDay()]+", ";
        human_date += jsDate.getDate()+" de "+system_enums['months_js'][jsDate.getMonth()+1]+" de "+jsDate.getFullYear();
        return human_date;
    }
    catch(e){
        return '';
    }
}

export const getBackendURL = function(){
    return "http://192.168.0.27:8000";
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
