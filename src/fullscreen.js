
export default class fullscreen {

    init(){
        
        const overlay = document.createElement('div');

        overlay.style['backgroundColor'] = 'rgba(0,0,0,0.5)';
        overlay.style['color'] = '#fff';

        overlay.style['position'] = 'absolute';

        overlay.style['display'] = 'grid';
        overlay.style['width'] = '100vw';
        overlay.style['height'] = '100vh';
        overlay.style['alignItems'] = 'center';
        overlay.style['justifyItems'] = 'center';

        overlay.textContent = "Press to go fullscreen";

        document.body.appendChild(overlay);

    }

}