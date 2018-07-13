
export default class Airgame_Sticks {

    constructor(id){

        this.state = {
            touches: [],
        };

        this.controllerEl = document.getElementById(id);
        this.dimensions = this.controllerEl.getBoundingClientRect();
        this.attach();

    }

    attach(){

        this.controllerEl.addEventListener('mousedown', (e) => {
            e.preventDefault();

            let player = 1;

            if (e.pageY > this.dimensions.height * 0.5) {
                player = 2;
            }

            this.state.touches.push({
                player: player,
                ix: e.pageX,
                iy: e.pageY,
                px: e.pageX,
                py: e.pagey,
                x: e.pageX,
                y: e.pageY
            });
        });

        this.controllerEl.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (this.state.touches.length > 0) {
                this.state.touches[0].px = this.state.touches[0].x;
                this.state.touches[0].py = this.state.touches[0].y;
                this.state.touches[0].x = e.pageX;
                this.state.touches[0].y = e.pageY;
            }
        });

        this.controllerEl.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.state.touches = [];
        });

        this.controllerEl.addEventListener('touchstart', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let player = 1;
                if (e.changedTouches[i].pageY > this.dimensions.height * 0.5) {
                    player = 2;
                }
                this.state.touches.push({
                    identifier: e.changedTouches[i].identifier,
                    ix: e.changedTouches[i].pageX,
                    iy: e.changedTouches[i].pageY,
                    px: e.changedTouches[i].pageX,
                    py: e.changedTouches[i].pagey,
                    x: e.changedTouches[i].pageX,
                    y: e.changedTouches[i].pageY,
                    player: player
                });
            }
        });
        this.controllerEl.addEventListener('touchmove', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let index;
                for (var j = 0; j < this.state.touches.length; j++) {
                    if (this.state.touches[j].identifier == e.changedTouches[i].identifier) {
                        index = j;
                    }
                }

                if ((this.state.touches[index].player===1 && e.changedTouches[i].pageY > this.dimensions.height * 0.45) || (this.state.touches[index].player===2 && e.changedTouches[i].pageY < this.dimensions.height * 0.55)) {
                    return;
                }
                this.state.touches[index].px = this.state.touches[index].x;
                this.state.touches[index].py = this.state.touches[index].y;
                this.state.touches[index].x = e.changedTouches[i].pageX;
                this.state.touches[index].y = e.changedTouches[i].pageY;
            }
        });
        this.controllerEl.addEventListener('touchend', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let index;
                for (var j = 0; j < this.state.touches.length; j++) {
                    if (this.state.touches[j].identifier == e.changedTouches[i].identifier) {
                        index = j;
                    }
                }
                this.state.touches.splice(index, 1);
            }
        });
    }

}
