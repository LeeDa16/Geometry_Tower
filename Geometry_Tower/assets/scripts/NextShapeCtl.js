// 提示下一几何块的组件
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.sprite = this.node.getComponent(cc.Sprite);
    },

    //根据序号显示下一几何块的形状
    changeSpriteFrame(index) {
        if (this.sprite === undefined) 
            this.sprite = this.node.getComponent(cc.Sprite);
        let i = index + 1;
        cc.loader.loadRes('nextshapesheet', cc.SpriteAtlas, (err, atlas) => {
            this.sprite.spriteFrame = atlas.getSpriteFrame('nextshape_' + i);
        });
    },

    start () {

    },

    // update (dt) {},
});
