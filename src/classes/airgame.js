
import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

export default class Airgame {

    init(id) {

        this.size = 40;

        this.world = document.getElementById(id);

        this.engine = Engine.create();
        this.engine.world.gravity.x = 0;
        this.engine.world.gravity.y = 0;

        this.dimensions = this.world.getBoundingClientRect();

        this.initRenderer();
        this.initEvents();

        this.start();

    }

    initRenderer() {
        this.render = Render.create({
            element: this.world,
            engine: this.engine,
            options: {
                width: this.dimensions.width,
                height: this.dimensions.height,
                showVelocity: true,
                showAngleIndicator: true,
                wireframes: false
            }
        });
    }

    initEvents(){
        Events.on(this.engine, 'collisionStart', this.collision_detection.bind(this));
    }

    updatePlayer(player, pos, m){
        player.m = m; // could replace with magnitude?
        Matter.Body.setPosition(player, pos);
    }

    start(){

        this.puck = Bodies.circle(this.dimensions.width * 0.5, this.dimensions.height * 0.5, 40, { label: 'puck', friction: 0, frictionAir: 0.005, speed: 0, restitution: 0.95 });

        this.player1 = Bodies.circle(this.dimensions.width * 0.2, this.dimensions.height * 0.5, this.size, { label: 'player1', isStatic: true });
        this.player2 = Bodies.circle(this.dimensions.width * 0.8, this.dimensions.height * 0.5, this.size, { label: 'player2', isStatic: true });
        
        // remove the top and bottom and replace with world boundaries?
        this.arenat = Bodies.rectangle(this.dimensions.width * 0.5, 0 - 10, this.dimensions.width + 10, 60, { isStatic: true });
        this.arenab = Bodies.rectangle(this.dimensions.width * 0.5, this.dimensions.height+10, this.dimensions.width+10, 60, { isStatic: true });
        
        //add 'goals' aka sensors that increment scores and reset the puck
        
        // add all of the bodies to the world
        World.add(this.engine.world, [this.puck,this.player1,this.player2,this.arenat,this.arenab]);
        
        // run the engine
        Engine.run(this.engine);
        
        // run the renderer
        Render.run(this.render); 
    }

    collision_detection(event) {
        var i, pair,
            length = event.pairs.length;
        for (i = 0; i < length; i++) {
            pair = event.pairs[i];
            if (pair.bodyA.label === 'player1' || pair.bodyB.label === 'player1') {
    
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(player1.position, puck.position));
                Body.setVelocity(puck, { x: vecNorm.x * -(puck.speed + Math.log(player1.m / 2)), y: vecNorm.y * -(puck.speed + Math.log(player1.m / 2)) });
    
            } else if (pair.bodyA.label === 'player2' || pair.bodyB.label === 'player2') {
    
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(player2.position, puck.position));
                Body.setVelocity(puck, { x: vecNorm.x * -(puck.speed + Math.log(player2.m / 2)), y: vecNorm.y * -(puck.speed + Math.log(player2.m / 2)) });
    
            }
        }
    }
    
} 

// let size = 40;

// let Engine = Matter.Engine,
//     Render = Matter.Render,
//     World = Matter.World,
//     Bodies = Matter.Bodies,
//     Body = Matter.Body,
//     Events = Matter.Events;

// let engine = Engine.create();
//     engine.world.gravity.x = 0;
//     engine.world.gravity.y = 0;

// let world = document.getElementById('world');
// let dimensions = world.getBoundingClientRect();

// let render = Render.create({
//     element: world,
//     engine: engine,
//     options: {
//         width: dimensions.width,
//         height: dimensions.height,
//         showVelocity: true,
//         showAngleIndicator: true,
//         wireframes: false
//     }
// });

// Events.on(engine, 'collisionStart', collision_detection);

// let puck = Bodies.circle(dimensions.width * 0.5, dimensions.height * 0.5, 40, { label: 'puck', friction: 0, frictionAir: 0.005, speed: 0, restitution: 0.95 });

// let player1 = Bodies.circle(dimensions.width * 0.2, dimensions.height * 0.5, size, { label: 'player1', isStatic: true });
// let player2 = Bodies.circle(dimensions.width * 0.8, dimensions.height * 0.5, size, { label: 'player2', isStatic: true });

// // remove the top and bottom and replace with world boundaries?
// let arenat = Bodies.rectangle(dimensions.width * 0.5, 0 - 10, dimensions.width + 10, 60, { isStatic: true });
// let arenab = Bodies.rectangle(dimensions.width * 0.5, dimensions.height+10, dimensions.width+10, 60, { isStatic: true });

// //add 'goals' aka sensors that increment scores and reset the puck

// // add all of the bodies to the world
// World.add(engine.world, [puck,player1,player2,arenat,arenab]);

// // run the engine
// Engine.run(engine);

// // run the renderer
// Render.run(render);

// export {
//     Matter,
//     player1,
//     player2,
//     updatePlayer
// }

//collisions