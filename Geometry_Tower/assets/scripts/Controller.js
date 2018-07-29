let CameraCtl = require('CameraCtl');
let ShapeCtl = require('ShapeCtl').ShapeCtl;
let NextShapeCtl = require('NextShapeCtl');
let ScoreLineCtl = require('ScoreLineCtl');
let ScoreCtl = require('ScoreCtl');
let BonusLineCtl = require('BonusLineCtl');

let status = require('game_status');

cc.Class({
    extends: cc.Component,

    properties: {
        bottom: 0,
        targetHeight: 1500,
        bonusLine: {
            default: [],
            type: Array,
        },
        score: 0,
        maxHeight: 0,
        visibleHeight: 0,
        focusHeight: 300,
        starScore: 0,
        starPrefab: {
            default: null,
            type: cc.Prefab,
        },
        starNum: 3,
        targetLine: {
            default: null,
            type: cc.Prefab,
        }
    },


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.screenSize = cc.view.getVisibleSize();

        //初始化status资源
        status.star_index = 1;
        status.line_index = 1;

        //加载摄影机
        this.camera = this.node.getChildByName('Camera');
        this.cameraCtl = this.camera.addComponent(CameraCtl);
        this.cameraCtl.gameCtl = this;

        this.base = this.camera.getChildByName('Base');

        //加载第一个几何块
        this.shapeNode = new cc.Node('Shape');
        this.node.addChild(this.shapeNode);

        this.shapeCtl = this.shapeNode.addComponent(ShapeCtl);
        this.shapeCtl.setShape(this.getNextShape());
        this.shapeCtl.gameCtl = this;

        //加载下一几何块提示
        this.nextShapeIndex = this.getNextShape();
        this.nextShape = this.node.getChildByName('NextShape');
        this.nextShapeCtl = this.nextShape.getComponent(NextShapeCtl);
        this.nextShapeCtl.changeSpriteFrame(this.nextShapeIndex);

        if (status.game_status === 'level') {
            //加载三条bonus线
            this.bonusLine.push(status.bonus_line[status.current_level][1]);
            this.bonusLine.push(status.bonus_line[status.current_level][2]);
            this.bonusLine.push(status.bonus_line[status.current_level][3]);
            //画出三条bonus线
            for (let i = 0; i < this.bonusLine.length; ++i) {
                let bLine = new cc.Node('bonusline_' + i);
                this.camera.addChild(bLine);
                let bLineCtl = bLine.addComponent(BonusLineCtl);
                let beginPoint = this.camera.convertToNodeSpaceAR(cc.p(0, this.bonusLine[i] + this.base.y));
                let endPoint = this.camera.convertToNodeSpaceAR(cc.p(this.screenSize.width, this.bonusLine[i] + this.base.y));
                bLineCtl.drawDashLine(beginPoint, endPoint);
            }
            this.currentBonus = 0;

            //加载结束线
            this.targetHeight = status.target_height[status.current_level];
            this.completeLine = cc.instantiate(this.targetLine);
            this.completeLine.setAnchorPoint(0.5, 0);
            this.camera.addChild(this.completeLine);
            this.completeLine.setPosition(cc.p(0, this.targetHeight + this.base.y));
        }
        //加载当前分数线
        this.scoreLine = this.camera.getChildByName('ScoreLine');
        this.scoreLineCtl = this.scoreLine.getComponent(ScoreLineCtl);
        this.scoreLine.opacity = 0;
        //加载当前的分数
        this.scoreText = this.camera.getChildByName('Score');
        this.scoreCtl = this.scoreText.getComponent(ScoreCtl);
        this.scoreCtl.gameCtl = this;

        if (status.game_status === 'level') {
            //加载星星
            for (let i = 0; i < this.starNum; ++i) {
                let star = cc.instantiate(this.starPrefab);
                this.camera.addChild(star);
                star.setPosition(this.getStarPosition());
                star.getComponent('StarCtl').gameCtl = this;
            }

            for (let i = 0; i < this.starNum; ++i) {
                let star = cc.instantiate(this.starPrefab);
                star.name = 'StarScore_' + i;
                this.node.addChild(star);
                star.getComponent(cc.RigidBody).enabledContactListener = false;
                let firstX = -star.width / 2 * (this.starNum - 1);
                let thisX = firstX + i * star.width;
                star.setPosition(cc.p(thisX, 320));
                star.opacity = 100;
            }
        }
        //当前可见的高度
        this.visibleHeight = this.base.height;
        this.i = 6;
    },

    //开始下一回合，在几何块停止运动后被调用
    nextTurn() {
        //播放音效
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_click_audio(false, 1);
        
        //将当前几何块从父节点中取出，加入到摄影机的子节点中，使其能随摄影机移动
        let position = this.node.convertToWorldSpaceAR(this.shapeNode.getPosition());
        this.shapeNode.removeFromParent();
        this.camera.addChild(this.shapeNode);
        this.shapeNode.setPosition(this.camera.convertToNodeSpaceAR(position));

        //计算刚落下的几何块的高度是否大于当前的最大高度
        let newHeight = this.shapeCtl.getHeight() - this.base.y;
        if (newHeight < this.maxHeight) {
            let index = 0;
            this.createNewShape(this.nextShapeIndex);
            this.nextShapeIndex = this.getNextShape();
            this.nextShapeCtl.changeSpriteFrame(this.nextShapeIndex);
            return;
        }
        this.maxHeight = newHeight;


        if (status.game_status === 'level') {
            //判断是否达到了bonus线
            if (this.currentBonus < this.bonusLine.length && this.maxHeight > this.bonusLine[this.currentBonus]) {
                this.camera.getChildByName('bonusline_' + this.currentBonus).destroy();
                this.currentBonus++;
                this.createBonusShape();
            }

            if (this.maxHeight > this.targetHeight) {
                this.pass();
                cc.director.loadScene('level_completed');
            }
        }

        //判断当前的可见高度是否超过了焦点高度，若是则调整摄影机焦点高度
        this.visibleHeight = this.shapeCtl.getHeight();
        if (this.visibleHeight > this.focusHeight) {
            this.cameraCtl.moveFocus(this.visibleHeight);
            this.visibleHeight = this.focusHeight;
        }

        //更新分数
        this.scoreLineCtl.moveUp(this.maxHeight - this.score);
        this.scoreCtl.moveUp(this.maxHeight - this.score);
        this.score = this.maxHeight;

        //创建下一几何块
        this.createNewShape(this.nextShapeIndex);
        this.nextShapeIndex = this.getNextShape();
        this.nextShapeCtl.changeSpriteFrame(this.nextShapeIndex);
    },

    //获取下一几何块的序号
    getNextShape() {
        if (status.game_status === 'level') {
            return status.blocks[status.current_level][this.randomInt(1, status.blocks_length[status.current_level])];
        } else if (status.game_status === 'endless') {
            return status.blocks[18][this.randomInt(1, status.blocks_length[18])];
        }
    },

    //根据序号创建下一几何块
    createNewShape(index) {
        this.shapeNode = new cc.Node('Shape');
        this.node.addChild(this.shapeNode);
        this.shapeCtl = this.shapeNode.addComponent(ShapeCtl);
        this.shapeCtl.setShape(index);
        this.shapeCtl.gameCtl = this;
    },

    //创建bonus块
    createBonusShape() {
        let bonusShape = new cc.Node();
        this.camera.addChild(bonusShape);

        let sprite = bonusShape.addComponent(cc.Sprite);
        cc.loader.loadRes('shapesheet', cc.SpriteAtlas, (err, atlas) => {
            sprite.spriteFrame = atlas.getSpriteFrame('shape_' + 19);
            sprite.node.y += sprite.spriteFrame._originalSize.height / 2;
        });

        let body = bonusShape.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        let collider = bonusShape.addComponent(cc.PhysicsPolygonCollider);
        let points = require('ShapeCtl').points;
        collider.points = points[18].map((elem) => (cc.p(elem[0], elem[1])));
        collider.apply();

        let y = this.shapeCtl.getHeight();
        let rect = this.shapeNode.getBoundingBox();
        let x = rect.x + 0.5 * rect.width;
        bonusShape.setPosition(cc.p(x, y));
    },

    //游戏停止，几何块调出底线时被调用
    gameStop() {
        status.endless_max_height = parseInt(this.score / 10);
        if (status.endless_max_height >= status.endless_history_max_height) {
            status.endless_history_max_height = status.endless_max_height;
        }
        this.shapeNode.destroy();
        this.scoreText.destroy();
        this.nextShape.destroy();
        this.cameraCtl.moveUp();
        if (status.game_status === 'level') {
            this.completeLine.destroy();
            while (this.currentBonus !== this.bonusLine.length) {
                this.camera.getChildByName('bonusline_' + this.currentBonus).destroy();
                this.currentBonus++;
            }

            for (let i = 0; i < this.starNum; ++i) {
                this.node.getChildByName('StarScore_' + i).destroy();
            }
        }
    },

    //增加星星得分
    addStarScore() {
        if (this.starScore < this.starNum) {
            this.node.getChildByName('StarScore_' + this.starScore).opacity = 255;
            this.starScore++;
        }
        cc.director.getScene().getChildByName('audio_controller').getComponent('audio_controller').play_star_touch_audio(false, 1);
        console.log('add star score');
    },

    //获取星星的位置，用于星星的生成
    getStarPosition() {
        let xx = status.star_position[status.current_level][status.star_index]['x'];
        let yy = status.star_position[status.current_level][status.star_index]['y'];
        status.star_index++;
        return cc.p(xx, yy);
    },

    //关卡通过，当几何塔高度达到预定高度时被调用
    pass() {
        if (status.game_status === 'level') {
            //刷新本关星数
            if (status.level_data[status.current_level] < this.starScore) {
                status.level_data[status.current_level] = this.starScore;
            }
            //开启下一关
            if (status.current_level !== 18 && status.level_data[status.current_level + 1] === -2) {
                status.level_data[status.current_level + 1] = -1;
            }
        }
    },

    start() {

    },

    update(dt) {},

    randomInt(lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }
});