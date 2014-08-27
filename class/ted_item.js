/**
 * Created by caiyilei on 14-8-4.
 */

/**
 * create the object of the item,
 * can control items change size
 *
 * @constructor
 */
function TEDItem() {

    //1. use this to let the variable public

    //flag for the direction " bigger or smaller
    // true  = bigger
    var flag_direction = true;

    //flag for is running resize, whether the interval is running
    var flag_isRunning = false;

    //define the max size of the resize
    var maxSize = 0;

    //define the min size of the resize
    var minSize = 0;

    //set the timing of the interval
    var timing = 0;

    // interval object
    var interval;

    // define the id of the item
    var imgId;

    //define the speed for resize
    var speed;

    //define the path of the image
    var path;


    var image;


    // init function
    var init = function () {

    };

    this.setItem = function (id) {
        imgId = '#' + id;
    };

    this.setTiming = function (time) {
        timing = time;
    };

    this.setMaxSize = function (size) {
        maxSize = size;
    };

    this.setSpeed = function (sp) {
        speed = sp;
    };

    this.setMinSize = function (min) {
        minSize = min;
    };

    this.setPath = function (pa) {
        path = pa;
    };

    this.getWidth = function () {
        return image.width;

    }

    var originalWidth;
    var originalHeight;


    this.start = function () {
        /*
         use image model to deal the reszie function
         */
        image = new Image();
        image.src = '../source/image/tortoise.png';

        var heightMinSize = image.height * minSize / image.width;
        var heightMaxSize = image.height * maxSize / image.width;

        originalWidth = image.width;
        originalHeight = image.height;
        flag_isRunning = true;


        //random the items init size , max or min
        var size = Math.round(Math.random());
        if (size == 0) {
            var w = minSize;
            var h = heightMinSize;
        } else {
            var w = maxSize;
            var h = heightMaxSize;
        }

        // get the both size for model and image
        image.height = h;
        image.width = w;
        $(imgId).css({width: w, height: h});
        $(imgId).css("display", 'block');

        interval = setInterval(resize, timing);
    };
    this.stop = function () {
        clearTimeout(interval);
        flag_isRunning = false;
    };

    this.isRunning = function () {
        return flag_isRunning;
    };

    var resize = function () {

        var w, h;

        if (flag_direction && (image.width < maxSize)) {
            flag_direction = true;
        }
        if (image.width >= maxSize && flag_direction) {

            flag_direction = false;
        }
        if ((image.width < minSize) && !flag_direction) {
            flag_direction = true;
        }


        if (flag_direction) {
            w = image.width + speed;
        } else {
            w = image.width - speed;
        }



       var mathHeight = image.width * originalHeight / originalWidth;
        h = getNumFor2Decimal(mathHeight);
        image.height = h;
        image.width = w;
        $(imgId).css('width', w);
        $(imgId).css('height', h)
    };
    init();
}
