
export default class Renderer {

    constructor(id){

        this.renderEl = document.getElementById(id);

        this.renderCtx = this.renderEl.getContext('2d');
        this.dimensions = this.renderEl.getBoundingClientRect();

        // console.log(this.dimensions);

        this.renderEl.width = this.dimensions.width;
        this.renderEl.height = this.dimensions.height;

        this.renderCtx.width = this.dimensions.width;
        this.renderCtx.height = this.dimensions.height;

        this.renderEl.style['pointer-events'] = "none";

    }

    render(bodies) {

        this.renderCtx.clearRect(0,0,this.dimensions.width,this.dimensions.height);
        this.renderCtx.strokeStyle = '#ddd';
        this.renderCtx.lineWidth = 1;
        
        this.renderCtx.beginPath();
        this.renderCtx.moveTo(this.dimensions.width * 0.5, 0);
        this.renderCtx.lineTo(this.dimensions.width * 0.5, this.dimensions.height);
        this.renderCtx.stroke();

        let t = bodies[0].position;

        this.renderCtx.fillStyle = 'rgba(0,0,0,0.5)';
        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.fillStyle = '#888';

        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.strokeStyle = '#444';
        this.renderCtx.lineWidth = 2;
        this.renderCtx.stroke();


        t = bodies[1].position;

        this.renderCtx.fillStyle = 'rgba(0,0,0,0.5)';
        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.fillStyle = '#8f8';

        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.strokeStyle = '#444';
        this.renderCtx.lineWidth = 2;
        this.renderCtx.stroke();



        t = bodies[2].position;

        this.renderCtx.fillStyle = 'rgba(0,0,0,0.5)';
        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.fillStyle = '#f88';

        this.renderCtx.beginPath();
        this.renderCtx.arc(t.x, t.y, 40, 0, 2*Math.PI);
        this.renderCtx.fill();

        this.renderCtx.strokeStyle = '#444';
        this.renderCtx.lineWidth = 2;
        this.renderCtx.stroke();

    }

}