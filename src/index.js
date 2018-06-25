
import Fullscreen from './fullscreen';
import { Matter, player1, player2 } from './airgame';
import Sticks from './sticks';

const sticks = new Sticks();
      sticks.init('controller');

function update() {
    sticks.state.touches.forEach((t,i)=>{
        if (t.player === 1) {
            Matter.Body.setPosition(player1, { x: t.x, y: t.y });
        } else {
            Matter.Body.setPosition(player2, { x: t.x, y: t.y });
        }
    });
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

const f = new Fullscreen('world');
      f.init();
