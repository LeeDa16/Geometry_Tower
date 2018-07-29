let status = require('game_status');

cc.Class({
    extends: cc.Component,

    properties: {
        level_label: cc.Label,
        star_label: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);

        let clickEventHandler1 = new cc.Component.EventHandler();
        clickEventHandler1.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler1.component = 'level_completed_controller'; //这个是代码文件名
        clickEventHandler1.handler = 'callback_1';
        let button1 = this.node.getChildByName('next_level').getComponent(cc.Button);
        button1.clickEvents.push(clickEventHandler1);

        let clickEventHandler2 = new cc.Component.EventHandler();
        clickEventHandler2.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler2.component = 'level_completed_controller'; //这个是代码文件名
        clickEventHandler2.handler = 'callback_2';
        let button2 = this.node.getChildByName('try_again').getComponent(cc.Button);
        button2.clickEvents.push(clickEventHandler2);

        let clickEventHandler3 = new cc.Component.EventHandler();
        clickEventHandler3.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler3.component = 'level_completed_controller'; //这个是代码文件名
        clickEventHandler3.handler = 'callback_3';
        let button3 = this.node.getChildByName('back_to_main_menu').getComponent(cc.Button);
        button3.clickEvents.push(clickEventHandler3);

        this.level_label.string = '第' + status.current_level + '关';
        this.star_label.string = '最高星星收集:' + status.level_data[status.current_level];
        cc.log('第' + status.current_level + '关完成，' + status.level_data[status.current_level] + '星');
        //cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_start_select_background_audio(true,0.7);
    },

    callback_1: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
        status.game_status = 'level';
        status.current_level = status.current_level + 1;
        cc.director.loadScene('game');
    },

    callback_2: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
        status.game_status = 'level';
        cc.director.loadScene('game');
    },

    callback_3: function (event, customEventData) {
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
        cc.director.loadScene('main_menu');
    },

    start() {

    },

    // update (dt) {},
});