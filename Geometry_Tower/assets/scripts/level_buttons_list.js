let Item = cc.Class({
    properties: {
        level: 0,
    },
});

cc.Class({
    extends: cc.Component,
    properties: {
        blue_normal: cc.SpriteFrame,
        blue_active: cc.SpriteFrame,
        nattier_normal: cc.SpriteFrame,
        nattier_active: cc.SpriteFrame,
        yellow_normal: cc.SpriteFrame,
        yellow_active: cc.SpriteFrame,
        red_normal: cc.SpriteFrame,
        red_active: cc.SpriteFrame,
        items: {
            default: [],
            type: Item
        },
        itemPrefab: cc.Prefab
    },

    onLoad () {
        for (let i = 0; i < this.items.length; ++i) {
            let item = cc.instantiate(this.itemPrefab);
            let data = this.items[i];
            this.node.addChild(item);
            item.getComponent('level_button_template').init({
                level: data.level,
                blue_normal: this.blue_normal,
                blue_active: this.blue_active,
                nattier_normal: this.nattier_normal,
                nattier_active: this.nattier_active,
                yellow_normal: this.yellow_normal,
                yellow_active: this.yellow_active,
                red_normal: this.red_normal,
                red_active: this.red_active,
            });
        }
    }
});