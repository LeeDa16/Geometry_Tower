let status = require('game_status');

cc.Class({
    extends: cc.Component,
    properties: {
        level: 0,
        itemButton: cc.Button,
        itemLabel: cc.Label,
    },

    // data: {level,iconSF}
    init: function (data) {
        this.level = data.level;
        this.itemLabel.string = data.level;

        //字体颜色：红：186,186,186；黄：0,153,204；蓝：0,255,234；淡蓝：0,51,102
        if (status.level_data[this.level] === -2) {
            //这是一个尚未开启的关卡，按钮为红色
            this.itemLabel.node.color = cc.color(186, 186, 186);
            this.itemButton.normalSprite = data.red_normal;
            this.itemButton.disabledSprite = data.red_normal;
            this.itemButton.pressedSprite = data.red_active;
            this.itemButton.hoverSprite = data.red_active;
        } else if (status.level_data[this.level] === -1) {
            //这是一个最新开启尚未通过的关卡，按钮为黄色
            this.itemLabel.node.color = cc.color(0, 153, 204);
            this.itemButton.normalSprite = data.yellow_normal;
            this.itemButton.disabledSprite = data.yellow_normal;
            this.itemButton.pressedSprite = data.yellow_active;
            this.itemButton.hoverSprite = data.yellow_active;
        } else if (status.level_data[this.level] === 3) {
            //这是一个已经3星通关的关卡，按钮为蓝色
            this.itemLabel.node.color = cc.color(0, 255, 234);
            this.itemButton.normalSprite = data.blue_normal;
            this.itemButton.disabledSprite = data.blue_normal;
            this.itemButton.pressedSprite = data.blue_active;
            this.itemButton.hoverSprite = data.blue_active;
        } else {
            //这是一个已经通关过，但尚未达到3星的关卡，按钮为淡蓝色
            this.itemLabel.node.color = cc.color(0, 51, 102);
            this.itemButton.normalSprite = data.nattier_normal;
            this.itemButton.disabledSprite = data.nattier_normal;
            this.itemButton.pressedSprite = data.nattier_active;
            this.itemButton.hoverSprite = data.nattier_active;
        }
        this.itemButton.node.on('click', this.callback, this);
    },

    callback: function (event) {
        if(status.level_data[this.level]!=-2)
        {
            status.game_status = 'level';
            status.current_level = this.level;
            cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
            cc.director.loadScene('game');
        }
    },
});