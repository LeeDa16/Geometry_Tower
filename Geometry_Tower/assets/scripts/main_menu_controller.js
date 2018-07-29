let status=require('game_status');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);

        let clickEventHandler1 = new cc.Component.EventHandler();
        clickEventHandler1.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler1.component = 'main_menu_controller'; //这个是代码文件名
        clickEventHandler1.handler = 'callback_1';
        let button1 = this.node.getChildByName('level_choose_button').getComponent(cc.Button);
        button1.clickEvents.push(clickEventHandler1);

        let clickEventHandler2 = new cc.Component.EventHandler();
        clickEventHandler2.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler2.component = 'main_menu_controller'; //这个是代码文件名
        clickEventHandler2.handler = 'callback_2';
        let button2 = this.node.getChildByName('endless_button').getComponent(cc.Button);
        button2.clickEvents.push(clickEventHandler2);

        let clickEventHandler3 = new cc.Component.EventHandler();
        clickEventHandler3.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler3.component = 'main_menu_controller'; //这个是代码文件名
        clickEventHandler3.handler = 'callback_3';
        let button3 = this.node.getChildByName('help_button').getComponent(cc.Button);
        button3.clickEvents.push(clickEventHandler3);
    },

    callback_1: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false,1);
        cc.director.loadScene('level_choose_scene');
    },

    callback_2: function (event, customEventData) {
        status.game_status='endless';
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false,1);
        cc.director.loadScene('game');
    },

    callback_3: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false,1);
        cc.director.loadScene('help_scene');
    },

    start() {

    },

    // update (dt) {},
});