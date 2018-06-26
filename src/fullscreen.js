
import fscreen from 'fscreen';

export default class Fullscreen {

    constructor(fsEl){
        this.fsEl = document.getElementById(fsEl);
    }

    init(){
        
        const overlay = document.createElement('div');

        overlay.style['backgroundColor'] = 'rgba(0,0,0,0.5)';
        overlay.style['color'] = '#fff';

        overlay.style['position'] = 'absolute';
        overlay.style['zIndex'] = 9;

        overlay.style['display'] = 'grid';
        overlay.style['width'] = '100vw';
        overlay.style['height'] = '100vh';
        overlay.style['alignItems'] = 'center';
        overlay.style['justifyItems'] = 'center';

        overlay.textContent = "Press to go fullscreen";

        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e)=>{
            if (fscreen.fullscreenEnabled) {
                fscreen.addEventListener('fullscreenchange', this.toggleFullscreen.bind(this), false);
                fscreen.requestFullscreen(this.fsEl);
            }
            document.body.removeChild(overlay);
        });

    }

    toggleFullscreen() {
        if (fscreen.fullscreenElement !== null) {
          console.log('Entered fullscreen mode');
          // add an exit button at players corner
        } else {
          console.log('Exited fullscreen mode');
          // remove exit button at players corner
        }
    }

}
