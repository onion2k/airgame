
import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();
    engine.world.gravity.y = 0;

let world = document.getElementById('world');
let dimensions = world.getBoundingClientRect();

let render = Render.create({
    element: world,
    engine: engine,
    options: {
        width: dimensions.width,
        height: dimensions.height,
        showVelocity: true,
        showAngleIndicator: true
    }
});

let puck = Bodies.circle(dimensions.width * 0.5, dimensions.height * 0.5, 40, { friction: 0, frictionAir: 0 });

let player1 = Bodies.circle(dimensions.width * 0.2, dimensions.height * 0.5, 25);
let player2 = Bodies.circle(dimensions.width * 0.8, dimensions.height * 0.5, 25);

let arenat = Bodies.rectangle(dimensions.width * 0.5, 0-10, dimensions.width+10, 60, { isStatic: true });
let arenab = Bodies.rectangle(dimensions.width * 0.5, dimensions.height+10, dimensions.width+10, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [puck,player1,player2,arenat,arenab]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

export {
    Matter,
    player1,
    player2
}