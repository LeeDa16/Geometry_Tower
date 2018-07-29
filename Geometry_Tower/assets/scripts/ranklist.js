cc.Class({
    extends: cc.Component,

    properties: {
        subTitle:cc.Label,
        rankingScrollView:cc.Sprite,
    },

    onLoad () {
    },

    onReturnBtnClicked() {
        if (CC_WECHATGAME)
            window.wx.postMessage({message:'rankMain'});
        //TODO: 返回开始菜单
    },

    start () {
        if (CC_WECHATGAME) {
            this.subDomainTexture = new cc.Texture2D();
            window.sharedCanvas.width = 1080;
            window.sharedCanvas.height = 1920;
            window.wx.postMessage({message:'getRank'});
        }
    },

    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.subDomainTexture.initWithElement(window.sharedCanvas);
            this.subDomainTexture.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.subDomainTexture);
        }
    },

    update (dt) {
        this._updateSubDomainCanvas();
    },
});
