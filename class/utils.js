/**
 * Created by caiyilei on 14-8-9.
 */

// get the _GET param
function getArgs() {
    var args = {};
    var match;
    match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while ((match = reg.exec(search)) !== null) {
        args[match[1]] = match[2];
    }
    return args;
}


function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}




function getNumFor2Decimal(number) {
  return Math.round(number * 100) / 100;
}