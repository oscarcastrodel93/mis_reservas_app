export const getCurrentDateDB = function () {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    let date_db_format = year+"-"+month+"-"+date;
    return date_db_format;
}

export const getCurrentTime = function (index) {
    let time = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()];
    return index===undefined ? time[index] : time;
}
