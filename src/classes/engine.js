/**
 * 
 * Airgame - game logic including physics
 * 
 */

import Matter from 'matter-js';

let Engine = Matter.Engine,
    Composite = Matter.Composite,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

// Matter.Resolver._restingThresh = 0.1;

export default class Airgame_Engine {

    constructor(renderer){

        this.render = this.render.bind(this);
        this.renderer = renderer;

        this.time = 0;

    }

    init(id) {

        this.state = {
            scores: [0,0]
        };

        this.size = 30;

        this.world = document.getElementById(id);
        this.dimensions = this.world.getBoundingClientRect();

        this.engine = Engine.create();
        this.engine.world.gravity.x = 0;
        this.engine.world.gravity.y = 0;

        this.initEvents();
        this.initWorld();

        requestAnimationFrame(this.render);

    }

    initEvents(){
        Events.on(this.engine, 'collisionStart', this.collision_start.bind(this));
        Events.on(this.engine, 'collisionEnd', this.collision_end.bind(this));
    }

    initWorld(){

        this.puck = Bodies.circle(this.dimensions.width * 0.5, this.dimensions.height * 0.5, this.size, { label: 'puck', friction: 0, frictionAir: 0.005, speed: 0, restitution: 0.95 });

        this.player1 = Bodies.circle(this.dimensions.width * 0.5, this.dimensions.height * 0.1, this.size, { label: 'player1', isStatic: true });
        this.player2 = Bodies.circle(this.dimensions.width * 0.5, this.dimensions.height * 0.9, this.size, { label: 'player2', isStatic: true });
        
        this.arenat = Bodies.rectangle(-10, this.dimensions.height * 0.5, 60, this.dimensions.height + 10, { isStatic: true });
        this.arenab = Bodies.rectangle(this.dimensions.width + 10, this.dimensions.height * 0.5, 60, this.dimensions.height + 10, { isStatic: true });
                                       
        this.goal1 = Bodies.rectangle(this.dimensions.width * 0.5, -30, this.dimensions.width+10, 30, {
            label: 'goal1', 
            isSensor: true,
            isStatic: true
        });

        this.goal2 = Bodies.rectangle(this.dimensions.width * 0.5, this.dimensions.height + 30, this.dimensions.width+10, 30, {
            label: 'goal2', 
            isSensor: true,
            isStatic: true
        });

        World.add(this.engine.world, [this.puck,this.player1,this.player2,this.arenat,this.arenab,this.goal1,this.goal2]);

    }

    render(){

        requestAnimationFrame(this.render);

        let now = new Date().getTime(),
            dt = now - (this.time || now);
            this.time = now;
        
        Engine.update(this.engine, dt);
        let bodies = Composite.allBodies(this.engine.world);

        let scores = this.state.scores;

        this.renderer.render({scores, bodies});
    }

    updatePlayer(player, pos, ppos){
        let m = Math.abs(Matter.Vector.cross({ x: pos.x, y: pos.y }, { x: ppos.x, y: ppos.y }));
        player.m = m; // could replace with magnitude?
        Matter.Body.setPosition(player, pos);
    }

    throwin(player){

        Matter.Body.setPosition(this.puck, { x: this.dimensions.width * (player===2?0.2:0.8), y: this.dimensions.height * 0.5 });
        Matter.Body.setAngularVelocity(this.puck, 0);

        const s = (6.0 + Math.random() * 6.0) * (player===2?1.0:-1.0);
        const t = (6.0 + Math.random() * 6.0) * (player===2?1.0:-1.0);

        Matter.Body.setVelocity(this.puck, {x:  s, y: t});

    }

    collision_start(event) {
        var i, pair,
            length = event.pairs.length;
        for (i = 0; i < length; i++) {
            pair = event.pairs[i];
            if (pair.bodyA.label === 'player1' || pair.bodyB.label === 'player1') {
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(this.player1.position, this.puck.position));
                let speed = -(this.puck.speed + Math.log(this.player1.m / 2));
                if (!speed) { speed = -this.puck.speed; }
                if (speed > 20) { speed = 20; }
                Body.setVelocity(this.puck, { x: vecNorm.x * speed, y: vecNorm.y * speed });
            } else if (pair.bodyA.label === 'player2' || pair.bodyB.label === 'player2') {
                var vecNorm = Matter.Vector.normalise(Matter.Vector.sub(this.player2.position, this.puck.position));
                let speed = -(this.puck.speed + Math.log(this.player2.m / 2));
                if (!speed) { speed = -this.puck.speed; }
                if (speed > 20) { speed = 20; }
                Body.setVelocity(this.puck, { x: vecNorm.x * speed, y: vecNorm.y * speed });
            } else if (pair.bodyA.label === 'goal1' || pair.bodyB.label === 'goal1') {
                this.state.scores[1]++;
                this.throwin(1);
            } else if (pair.bodyA.label === 'goal2' || pair.bodyB.label === 'goal2') {
                this.state.scores[0]++;
                this.throwin(2);
            }
        }
    }

    collision_end(event){

    }

}
