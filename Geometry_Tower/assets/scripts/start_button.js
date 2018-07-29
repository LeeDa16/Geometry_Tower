let status=require('game_status');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'start_button'; //这个是代码文件名
        clickEventHandler.handler = 'callback';
        let button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    callback: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_background_audio(true, 1);
        cc.director.loadScene('main_menu');
    },

    start() {

    },

    // update (dt) {},
});