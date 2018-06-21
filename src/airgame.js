
import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();
    engine.world.gravity.y = 0;

let render = Render.create({
    element: document.getElementById('world'),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true,
        showAngleIndicator: true
    }
});

let puck = Bodies.circle(400, 250, 80);

let player1 = Bodies.circle(100, 250, 30);
let player2 = Bodies.circle(700, 250, 30);

let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [puck,player1,player2,ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
