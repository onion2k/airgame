
import * as twgl from 'twgl.js';
import fs from './fs.glsl';
import vs from './vs.glsl';

export default class Airgame_Renderer {

    init(id2D,id3D){

        this.id2D = id2D;
        this.id3D = id3D;

        this.render2DEl = document.getElementById(this.id2D);

        this.render2Dctx = this.render2DEl.getContext('2d');
        this.dimensions = this.render2DEl.getBoundingClientRect();

        this.render2DEl.width = this.dimensions.width;
        this.render2DEl.height = this.dimensions.height;

        this.render2Dctx.width = this.dimensions.width;
        this.render2Dctx.height = this.dimensions.height;

        this.time = 0;

        this.background();

    }


    background(){

        this.render3DEl = document.getElementById(this.id3D);

        this.render3DEl.width = this.dimensions.width;
        this.render3DEl.height = this.dimensions.height;

        this.render3DEl.style['pointer-events'] = "none";

        this.render3DCtx = twgl.getWebGLContext(this.render3DEl);
        this.programInfo = twgl.createProgramInfo(this.render3DCtx, [vs, fs]);
        
        this.arrays = {
          position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
        };
        
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.render3DCtx, this.arrays);

        this.render3D(1);

    }

    render3D(time) {
      
        twgl.resizeCanvasToDisplaySize(this.render3DCtx.canvas);
      
        this.render3DCtx.viewport(0, 0, this.render3DCtx.canvas.width, this.render3DCtx.canvas.height);
      
        let uniforms = {
          u_time: time * 0.001,
          u_resolution: [this.render3DCtx.canvas.width, this.render3DCtx.canvas.height],
        };
      
        this.render3DCtx.useProgram(this.programInfo.program);
      
        twgl.setBuffersAndAttributes(this.render3DCtx, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, uniforms);
        twgl.drawBufferInfo(this.render3DCtx, this.bufferInfo);
                  
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

        this.render3D(data.time);

    }

}