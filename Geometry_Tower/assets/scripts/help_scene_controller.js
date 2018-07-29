let status=require('game_status');

cc.Class({
    extends: cc.Component,

    properties: {
        index: 1,
        contain_2: cc.SpriteFrame,
        contain_3: cc.SpriteFrame,
        contain_4: cc.SpriteFrame,
        contain: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);

        this.index=1;
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'help_scene_controller'; //这个是代码文件名
        clickEventHandler.handler = 'callback';
        let button = this.node.getChildByName('help_button').getComponent(cc.Button);;
        button.clickEvents.push(clickEventHandler);
    },

    callback: function (event, customEventData) {
        this.index++;
        cc.log(this.index);
        if(this.index===2)
        {
            cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
            this.contain.spriteFrame=this.contain_2;
        }
        else if(this.index===3)
        {
            cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
            this.contain.spriteFrame=this.contain_3;
        }
        else if(this.index===4)
        {
            cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
            this.contain.spriteFrame=this.contain_4;
        }
        else if(this.index===5)
        {
            cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
            cc.director.loadScene('main_menu');
        }
    },

    start() {

    },

    // update (dt) {},
});