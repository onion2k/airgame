
import fscreen from '../../../../Library/Caches/typescript/2.9/node_modules/@types/fscreen';

export default class Airgame_Fullscreen {

    constructor(startEl, fsEl){
        this.startEl = document.getElementById(startEl);
        this.fsEl = document.getElementById(fsEl);
    }

    init(cb){

        this.startEl.addEventListener('click', (e)=>{
            if (fscreen.fullscreenEnabled) {
                fscreen.addEventListener('fullscreenchange', this.toggleFullscreen.bind(this), false);
                fscreen.requestFullscreen(this.fsEl);
            }
        });

        this.cb = cb;

    }

    toggleFullscreen() {

        if (fscreen.fullscreenElement !== null) {
            setTimeout(this.cb, 100);
        } else {

        }
    }

}
