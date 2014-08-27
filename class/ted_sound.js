/**
 * Created by caiyilei on 14-8-15.
 */
function ted_sound(soundId){

    var item;

    var init = function(){
       item = document.getElementById(soundId);
    }


    this.setMusicPath = function (path){
        item.src  = path;

    }

    this.setIsLoop = function(bool){
        if(bool){
            item.loop ='loop';
        }else{
            item.loop = 'false';
        }
    }

    this.play = function () {
        item.play();
    }


    this.stop = function(){
        item.pause();
    }

    init();
}