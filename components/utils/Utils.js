import { Toast } from 'native-base';

export const getCurrentDateDB = function () {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    let date_db_format = year + "-" + (month<10 ? '0'+month : month) + "-" + (date<10 ? '0'+date : date);
    return date_db_format;
}

export const getCurrentTime = function (index) {
    let time = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()];
    return index===undefined ? time : time[index];
}

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
