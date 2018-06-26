
import Fullscreen from './fullscreen';
// Should really export a game class with public API
import { Matter, player1, player2, updatePlayer } from './airgame';
import Sticks from './sticks';

const sticks = new Sticks();
      sticks.init('controller');

function update() {
    sticks.state.touches.forEach((t,i)=>{
        if (t.player === 1) {
            // Just call the update player API
            let m = Math.abs(Matter.Vector.cross({ x: t.px, y: t.py }, { x: t.x, y: t.y }));
            updatePlayer(player1, { x: t.x, y: t.y }, m);
        } else {
            let m = Math.abs(Matter.Vector.cross({ x: t.px, y: t.py }, { x: t.x, y: t.y }));
            updatePlayer(player2, { x: t.x, y: t.y }, m);
        }
    });
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

// const f = new Fullscreen('world');
//       f.init();
