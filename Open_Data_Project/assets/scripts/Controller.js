
cc.Class({
    extends: cc.Component,

    properties: {
        rankingScrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        RankItemPrefab: cc.Prefab,
    },

    start () {

    	if (CC_WECHATGAME) {
    		window.wx.onMessage(data => {
    			if (data.message === 'getRank') {
    				this.getFriendData();
    			} else if (data.message === 'submitScore') {
    				this.submitScore(data.score); 
    			}
    		});
    	}
	},

	submitScore(score) {
		if (CC_WECHATGAME) {
			window.wx.getUserCloudStorage({
				keyList: ['TowerMaxHeight'],
				success: (getRes) => {
					console.log('getUserCloudStorage success', getRes);
					if (getRes.KVDataList.length != 0) {
						if (getRes.KVDataList[0].value - score > 0) {
							console.log('getRes.KVDataList[0].value > score');
							return;
						}
					}

					window.wx.setUserCloudStorage({
						KVDataList: [{key: 'TowerMaxHeight', value: '' + score}],
						success: (res) => {
							console.log('setUserCloudStorage success', res);
						},
						fail: (res) => {
							console.log('setUserCloudStorage failed', res);
						},
						complete: (res) => {
							console.log('setUserCloudStorage complete', res);
						}
					});
				},
			});
		}
	},

	getFriendData() {
		this.scrollViewContent.removeAllChildren();
		if (CC_WECHATGAME) {
			wx.getUserInfo({
				openIdList: ['TowerMaxHeight'],
				success: (userRes) => {
					console.log('getUserInfo success', userRes);
					let userData = userRes.data[0];

					wx.getFriendCloudStorage({
						keyList: ['TowerMaxHeight'],
						success: (res) => {
							console.log('getFriendCloudStorage success', res);
							let data = res.data;
							data.sort((a, b) => {
								if (a.KVDataList.length === 0 && b.KVDataList.length === 0) {
									return 0;
								}
								if (a.KVDataList === 0) {
									return 1;
								}
								if (b.KVDataList === 0) {
									return -1;
								}
								return  b.KVDataList[0].value - a.KVDataList[0].value;
							});
							
							for (let i = 0; i < data.length; ++i) {
								let playerInfo = data[i];
								let item = cc.instantiate(this.RankItemPrefab);
								item.getComponent('RankItem').init(i, playerInfo);
								this.scrollViewContent.addChild(item);
								/*
								if (data[i].avatarUrl == userData.avatarUrl) {
									let userItem = cc.instantiate(this.RankItemPrefab);
									userItem.getComponent('RankItem').init(i, playerInfo);
									userItem.t = -760;
									this.node.addChild(userItem, 1, 1000);
								}
								*/
							}
							
							if (data.length < 8) {
								let layout = this.scrollViewContent.getComponent(cc.Layout);
								layout.resizeMode = cc.Layout.ResizeMode.NONE;
							}
							
						},
						fail: (res) => {
							console.log('wx.getFriendCloudStorage fail', res);
						}
					});
				},
				fail: (res) => {
					console.log('wx.getUserInfo fail', res);
				}
			});
		}
	}
});
