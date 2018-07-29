//用于显示当前高度的分数线组件
cc.Class({
    extends: cc.Component,

    properties: {
        fps:60,
        speedY: 0,
        deltaY: 0,
        deltaOpacity: 0,
    },

    onLoad () {
        this.fps = 60;
    },

    moveUp(deltaY) {
        if (deltaY > 0) {
            this.deltaY = deltaY;
            this.speedY = 120;
            this.deltaOpacity = 255;
        }
    },

    stopMoving() {
        this.deltaY = 0;
        this.speedY = 0;
        this.deltaOpacity = -255;
    },

    update (dt) {
        if (this.deltaY < 0) {
            this.node.y += this.deltaY;
            this.stopMoving();
        }
        this.node.y += this.speedY / this.fps;
        this.deltaY -= this.speedY / this.fps;

        if (this.node.opacity + this.deltaOpacity / this.fps > 255) {
            this.node.opacity = 255;
            this.deltaOpacity = 0;
        } else if (this.node.opacity + this.deltaOpacity / this.fps < 0) {
            this.node.opacity = 0;
            this.deltaOpacity = 0;
        } else {
            this.node.opacity += this.deltaOpacity / this.fps;
        }
    },
});
