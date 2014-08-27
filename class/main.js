function Main() {

    var index;
    var sharkIndex;
    var currentItem;
    var score;
    var stageID = document.getElementById('stage');
    var isMoving = false;
    var isStarted = false;
    var backSound;
    var lastWidth;
    var isLose = false;
    var sharkHeight = 569;
    var allItemHeight = 0;
    var sharkSpacing = 8;
    var screenMaxHeight=0;
    var screenMaxWidth=0;


    this.setScreenMaxWidth = function(width){
        screenMaxWidth = width;
    }

    this.setScreenMaxHeight = function(height){
        screenMaxHeight = height;
    }


    var createImageItem = function (index) {
        var imgDiv = document.createElement('div');
        imgDiv.style.width = "100%";
        imgDiv.style.textAlign = "center";
        imgDiv.style.position = "absolute";
        imgDiv.id = "itemDiv" + index;
        imgDiv.style.width = document.getElementById('stage').style.width;
        stageID.appendChild(imgDiv);

        var imgTag = document.createElement("img");
        imgTag.style.display = 'none';
        imgTag.src = "../source/image/tortoise.png";
        imgTag.style.margin = "0 auto";
        imgTag.id = "itemImg" + index;
        imgDiv.appendChild(imgTag);
    };

    var init = function () {
        index = 1;
        sharkIndex = 1;
        isStarted = false;
        score = new TEDScore();
    };


    function shark_itemHidden(start) {

        var end = start + sharkSpacing - 1;
        for (var i = start; i <= (start + 8); i++) {

            console.log('start   ' + start + '  ' + end);
            if (document.getElementById("itemDiv" + i)) {
                var itemDiv = document.getElementById("itemDiv" + i).style.display = 'none';
            } else {
                console.log(i);
            }
        }

        lastWidth = 99999;
    }

    // touch event
    var handleTouchEvent = function (event) {
        //only find the first click
        if (event.touches.length == 1) {
            switch (event.type) {
                case "touchstart":
                {
                    clickevent();
                    break;
                }
                case "touchend":
                    //alert(2);
                    break;
                case "touchmove":
                    event.returnValue = false;
                    break;
            }
        }
    };

    var clickevent = function () {
        if (!isStarted) {
            return;
        }

        if (currentItem.isRunning()) {
            currentItem.stop();
            fall();
        }
    }


    //start game
    startGame = function () {
        createItems();
        isStarted = true;
    };


    this.registerTouch = function () {
//        $("body").mousedown(function () {
//            // also can use function(e), e is the param for event, use console.log() to var Dump
//            clickevent();
//        })

        //register Finger touch event
        document.addEventListener("touchstart", handleTouchEvent, false);
        document.addEventListener("touchend", handleTouchEvent, false);
        document.addEventListener("touchmove", handleTouchEvent, false);

    }


    this.prepareGame = function () {
        $('#startimg').css('padding-top', '200px');
        backSound = new ted_sound('myaudio');
        backSound.play();
        startGame();
        create_Shark();
    }


    //next game
    var gameNext = function () {
        index++;
        console.log('index:' + index);
        createItems();

    };


    //the method for items fall,
    var fall = function () {

        isMoving = true;
        var itemDiv = document.getElementById("itemDiv" + index);
        var stageHeight = stageID.offsetHeight;
        var itemsHeight = 0;
        for (var i = 1; i <= index; i++) {
            var itemIndex = document.getElementById("itemImg" + i);
            itemsHeight += itemIndex.offsetHeight;
            if (i != 1) {
                itemsHeight -= (itemIndex.offsetHeight * 0.2);
            }

        }
        allItemHeight = itemsHeight;
        var goDown = stageHeight - itemsHeight;


        changePosition(itemDiv, goDown);

        // judge the game is over
        if (currentItem.getWidth() >= lastWidth) {
            isLose = true;
        } else {
            isLose = false;
        }


        lastWidth = currentItem.getWidth();
    };

    var Shark_Appear = function () {
        var shark = document.getElementById('itemDivShark');
        shark.style.paddingTop = (0 - sharkHeight) + 'px';
        var stageHeight = stageID.offsetHeight;
        var height = stageHeight + sharkHeight;
        var topValue = 0 - sharkHeight;
        var fp = 30;

        var sharkFall = setInterval(function () {
            if (topValue >= height) {
                sharkIndex++;
                clearTimeout(sharkFall);
                gameNext();
            } else {
                topValue += fp;
                shark.style.paddingTop = topValue + 'px';
                var hiddenIndex = (sharkIndex - 1) * 8 + 1;
                if (topValue >= allItemHeight) {
                    //console.log(hiddenIndex);
                    console.log(topValue + ' ' + allItemHeight);
                    shark_itemHidden(hiddenIndex);
                }

            }
        }, 10);
    }


    /*create the shark*/
    var create_Shark = function () {

        var imgDiv = document.createElement('div');
        imgDiv.id = "itemDivShark";
        imgDiv.style.width = "100%";
        imgDiv.style.height = sharkHeight + 'px';
        imgDiv.style.textAlign = "center";
        imgDiv.style.position = "absolute";
        imgDiv.style.width = document.getElementById('stage').style.width;
        imgDiv.style.top = (0 - sharkHeight) + 'px';
        stageID.appendChild(imgDiv);

        var imgTag = document.createElement("img");
        imgTag.src = "../source/image/shark.png";
        imgTag.style.margin = "0 auto";
        imgTag.id = "itemImgShark";
        imgDiv.appendChild(imgTag);

        document.getElementById('itemDivShark').top = '-637px';
    }


    var shark_ClearScreen = function () {
        Shark_Appear();
    }


    var changePosition = function (item, height) {
        var topValue = 0;
        var fp = (height - 10) / 40;
        var imageFall = setInterval(function () {
            if (topValue >= height) {
                //game end
                clearTimeout(imageFall);
                isMoving = false;
                if (isLose) {
                    $('#end').show();
                    backSound.stop();
                    return;
                }

                if ((index % sharkSpacing) == 0) {
                    console.log('shark appear,index:' + index + ' %:' + (index % 10));
                    shark_ClearScreen();

                } else {
                    gameNext();
                }

            } else {
                topValue += fp;
                item.style.paddingTop = topValue + 'px';
            }


        }, 10 - index);
    };


    var createItems = function () {
        //create image div and image html tag
        createImageItem(index);
        // speed rule
        var levelSpeed = sharkIndex * 2 ; //+ (index / 5) * 1;


        //var changeExtent =
        var imageItem = new TEDItem();
        imageItem.setItem("itemImg" + index);
        imageItem.setSpeed(levelSpeed);
        imageItem.setTiming(10);
        imageItem.setMaxSize(250);
        imageItem.setMinSize(50);
        imageItem.start();
        currentItem = imageItem;

    };
    init();


}