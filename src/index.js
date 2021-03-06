/**
*
* Airgame -  multitouch Air Hockey
*
*/

import Airgame_Engine from './classes/engine.js';
import Airgame_Renderer from './classes/renderer.js';
import Airgame_Sticks from './classes/sticks.js';
import Airgame_Fullscreen from './classes/fullscreen.js';

function start() {

    document.body.removeChild(document.getElementById('introscreen'));

    const renderer = new Airgame_Renderer();
        renderer.init('renderer2D', 'renderer3D');

    const game = new Airgame_Engine(renderer);
          game.init('world');
    
    const sticks = new Airgame_Sticks('renderer2D');
    
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

// const f = new Airgame_Fullscreen('fullscreen','world');
//       f.init(start);

// document.getElementById('start').addEventListener('click', (e)=>{
//     start();
// });

start();
