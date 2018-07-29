cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Sprite,
    },
    
    onload(){
        this.tex = new cc.Texture2D();
    },

    _updaetSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    update() {
        this._updaetSubDomainCanvas();
    }

});