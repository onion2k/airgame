
export default class Renderer {

    init(id2D,id3D){


        this.renderEl = document.getElementById(id2D);

        this.render2Dctx = this.renderEl.getContext('2d');
        this.dimensions = this.renderEl.getBoundingClientRect();

        this.renderEl.width = this.dimensions.width;
        this.renderEl.height = this.dimensions.height;

        this.render2Dctx.width = this.dimensions.width;
        this.render2Dctx.height = this.dimensions.height;

        this.renderEl.style['pointer-events'] = "none";




        this.renderEl = document.getElementById(id3D);

        this.render3DCtx = this.renderEl.getContext('webgl');
        this.dimensions = this.renderEl.getBoundingClientRect();

        this.renderEl.width = this.dimensions.width;
        this.renderEl.height = this.dimensions.height;

        this.render3DCtx.width = this.dimensions.width;
        this.render3DCtx.height = this.dimensions.height;

        this.renderEl.style['pointer-events'] = "none";

    }

    render(data) {

        let size = 30;

        this.render2Dctx.clearRect(0,0,this.dimensions.width,this.dimensions.height);
        this.render2Dctx.strokeStyle = '#ddd';
        this.render2Dctx.lineWidth = 1;

        this.render2Dctx.beginPath();
        this.render2Dctx.moveTo(0, this.dimensions.height * 0.5);
        this.render2Dctx.lineTo(this.dimensions.width, this.dimensions.height * 0.5);
        this.render2Dctx.stroke();

        this.render2Dctx.fillStyle = 'rgba(0,0,0,1)';
        this.render2Dctx.font = '18px sans-serif';
        this.render2Dctx.fillText(data.scores[0], 50, 50);
        this.render2Dctx.fillText(data.scores[1], this.dimensions.width - 50, this.dimensions.height - 50);

        let t = data.bodies[0].position;

        this.render2Dctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.fillStyle = '#888';

        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.strokeStyle = '#444';
        this.render2Dctx.lineWidth = 2;
        this.render2Dctx.stroke();


        t = data.bodies[1].position;

        this.render2Dctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.fillStyle = '#8f8';

        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.strokeStyle = '#444';
        this.render2Dctx.lineWidth = 2;
        this.render2Dctx.stroke();



        t = data.bodies[2].position;

        this.render2Dctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.fillStyle = '#f88';

        this.render2Dctx.beginPath();
        this.render2Dctx.arc(t.x, t.y, size, 0, 2*Math.PI);
        this.render2Dctx.fill();

        this.render2Dctx.strokeStyle = '#444';
        this.render2Dctx.lineWidth = 2;
        this.render2Dctx.stroke();

    }

}