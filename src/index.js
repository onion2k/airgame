import Matter from 'matter-js';

// import Fullscreen from './fullscreen';

import Airgame from './classes/airgame.js';
import Sticks from './classes/sticks.js';

const game = new Airgame;
      game.init('world');

const sticks = new Sticks;
      sticks.init('controller');

function update() {
    sticks.state.touches.forEach((t,i)=>{
        if (t.player === 1) {
            // Just call the update player API
            let m = Math.abs(Matter.Vector.cross({ x: t.px, y: t.py }, { x: t.x, y: t.y }));
            game.updatePlayer(game.player1, { x: t.x, y: t.y }, m);
        } else {
            let m = Math.abs(Matter.Vector.cross({ x: t.px, y: t.py }, { x: t.x, y: t.y }));
            game.updatePlayer(game.player2, { x: t.x, y: t.y }, m);
        }
    });
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

// const f = new Fullscreen('world');
//       f.init();
