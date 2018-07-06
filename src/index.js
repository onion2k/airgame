/**
*
* Airgame -  multitouch Air Hockey
*
*/

import Fullscreen from './classes/fullscreen.js';

import Airgame from './classes/airgame.js';
import Renderer from './classes/renderer.js';
import Sticks from './classes/sticks.js';

function start() {

    document.body.removeChild(document.getElementById('introscreen'));

    const renderer = new Renderer;
        renderer.init('renderer2D', 'renderer3D');

    const game = new Airgame(renderer);
          game.init('world');
    
    const sticks = new Sticks;
          sticks.init('controller');
    
    function update() {
        sticks.state.touches.forEach((t,i)=>{
            if (t.player === 1) {
                game.updatePlayer(game.player1, { x: t.x, y: t.y }, { x: t.px, y: t.py });
            } else {
                game.updatePlayer(game.player2, { x: t.x, y: t.y }, { x: t.px, y: t.py });
            }
        });
        requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);

}

const f = new Fullscreen('fullscreen','world');
      f.init(start);

document.getElementById('start').addEventListener('click', (e)=>{
    start();
});

