
import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

Matter.Resolver._restingThresh = 0.1;

export default class Airgame {

    init(id) {

        this.size = 40;

        this.world = document.getElementById(id);
        this.dimensions = this.world.getBoundingClientRect();

        console.log(this.dimensions)

        this.engine = Engine.create();
        this.engine.world.gravity.x = 0;
        this.engine.world.gravity.y = 0;

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

    updatePlayer(player, pos, ppos){
        let m = Math.abs(Matter.Vector.cross({ x: pos.x, y: pos.y }, { x: ppos.x, y: ppos.y }));

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
    
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(this.player1.position, this.puck.position));
                let speed = -(this.puck.speed + Math.log(this.player1.m / 2));
                if (!speed) { speed = -this.puck.speed; }
                Body.setVelocity(this.puck, { x: vecNorm.x * speed, y: vecNorm.y * speed });
    
            } else if (pair.bodyA.label === 'player2' || pair.bodyB.label === 'player2') {
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(this.player2.position, this.puck.position));
                let speed = -(this.puck.speed + Math.log(this.player2.m / 2));
                if (!speed) { speed = -this.puck.speed; }
                Body.setVelocity(this.puck, { x: vecNorm.x * speed, y: vecNorm.y * speed });
    
            }
        }
    }
    
} 
