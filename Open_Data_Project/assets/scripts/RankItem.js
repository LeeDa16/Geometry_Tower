cc.Class({
    extends: cc.Component,

    properties: {
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label,
    },

    start () {

    },

    init(rank, data) {
        let avatarUrl = data.avatarUrl;
        let nick = data.nickname;
        let score = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        this.rankLabel.string = (rank + 1).toString();
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.topScoreLabel.string = score.toString();
    },

    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        console.log(e);
                        this.avatarImgSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                console.log(e);
                this.avatarImgSprite.node.active  = false;
            }
        } else {
            cc.loader.load({url: avatarUrl, type: 'jpg'}, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
    // update (dt) {},
});
