
import Sticks from './sticks';
import { Matter, player1, player2 } from  './airgame';

const c = new Sticks('controller');

function update() {
    if (c.state.touches[0]) {
        Matter.Body.setPosition(player1, { x: c.state.touches[0].x, y: c.state.touches[0].y });
    }
    if (c.state.touches[1]) {
        Matter.Body.setPosition(player2, { x: c.state.touches[1].x, y: c.state.touches[1].y });
    }
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
