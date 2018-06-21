
import Sticks from './sticks';
import { Matter, player1, player2 } from  './airgame';

const c = new Sticks('controller');

function update() {
    if (c.state.touches.length > 0) {
        Matter.Body.setPosition(player1, { x: c.state.touches[0].x, y: c.state.touches[0].y });
    }
    requestAnimationFrame(update);
}

requestAnimationFrame(update);


// let force = 10;
// let deltaVector = Matter.Vector.sub(mouse.position, myBody.position);
// let normalizedDelta = Matter.Vector.normalise(vector);
// let forceVector = Matter.Vector.mult(deltaVector, 10);
// Body.applyForce(myBody, myBody.position, forceVector);
