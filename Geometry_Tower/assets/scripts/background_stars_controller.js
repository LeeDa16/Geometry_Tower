cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let anim1=this.node.getChildByName('star1').getComponent(cc.Animation);
        anim1.play('background_star_1',1);
        let anim2=this.node.getChildByName('star2').getComponent(cc.Animation);
        anim2.play('background_star_2',3);
        let anim3=this.node.getChildByName('star3').getComponent(cc.Animation);
        anim3.play('background_star_3',0);
        let anim4=this.node.getChildByName('star4').getComponent(cc.Animation);
        anim4.play('background_star_4',1);
        let anim5=this.node.getChildByName('star5').getComponent(cc.Animation);
        anim5.play('background_star_5',2);
        let anim6=this.node.getChildByName('star6').getComponent(cc.Animation);
        anim6.play('background_star_6',1);
        let anim7=this.node.getChildByName('star7').getComponent(cc.Animation);
        anim7.play('background_star_7',0.5);
    },

    start () {

    },

    // update (dt) {},
});
