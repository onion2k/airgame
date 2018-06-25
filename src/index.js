
import Fullscreen from './fullscreen';
import Sticks from './sticks';
import { Matter, player1, player2 } from './airgame';

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

const f = new Fullscreen();
      f.init();
