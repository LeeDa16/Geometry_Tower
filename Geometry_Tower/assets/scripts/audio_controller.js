cc.Class({
    extends: cc.Component,

    properties: {
        background_audio: {
            url: cc.AudioClip,
            default: null
        },
        background_audio_id: null,

        click_audio: {
            url: cc.AudioClip,
            default: null
        },
        click_audio_id: null,

        star_touch_audio: {
            url: cc.AudioClip,
            default: null
        },
        star_touch_audio_id: null,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        cc._initDebugSetting(cc.DebugMode.INFO);
    },

    setdata: function (json) {
        this.data = json;
    },
    getdata: function () {
        return this.data;
    },

    //通过以下借口控制音频的播放
    play_background_audio: function (loop, volume) {
        if (loop === true && cc.audioEngine.getState(this.background_audio_id) !== 1) {
            if (this.background_audio_id === null) {
                this.background_audio_id = cc.audioEngine.play(this.background_audio, loop, volume);
                cc.log(this.background_audio_id);
            } else {
                cc.audioEngine.setLoop(this.background_audio_id, loop);
                cc.audioEngine.setVolume(this.background_audio_id, volume);
                cc.audioEngine.resume(this.background_audio_id);
            }
        } else if (loop === false) {
            cc.audioEngine.play(this.background_audio, loop, volume);
        }
    },

    pause_background_audio: function () {
        if (this.background_audio_id !== null) {
            cc.audioEngine.pause(this.background_audio_id);
        }
    },

    stop_background_audio: function () {
        if (this.background_audio_id !== null) {
            cc.audioEngine.stop(this.background_audio_id);
            this.background_audio_id = null;
        }
    },

    get_volume_background_audio: function () {
        if (this.background_audio_id !== null) {
            return cc.audioEngine.getVolume(this.background_audio_id);
        }
    },

    set_volume_background_audio: function (volume) {
        if (this.background_audio_id !== null) {
            cc.audioEngine.setVolume(this.background_audio_id, volume);
        }
    },

    play_click_audio: function (loop, volume) {
        if (loop === true && cc.audioEngine.getState(this.click_audio_id) !== 1) {
            if (this.click_audio_id === null) {
                this.click_audio_id = cc.audioEngine.play(this.click_audio, loop, volume);
                cc.log(this.click_audio_id);
            } else {
                cc.audioEngine.setLoop(this.click_audio_id, loop);
                cc.audioEngine.setVolume(this.click_audio_id, volume);
                cc.audioEngine.resume(this.click_audio_id);
            }
        } else if (loop === false) {
            cc.audioEngine.play(this.click_audio, loop, volume);
        }
    },

    pause_click_audio: function () {
        if (this.click_audio_id !== null) {
            cc.audioEngine.pause(this.click_audio_id);
        }
    },

    stop_click_audio: function () {
        if (this.click_audio_id !== null) {
            cc.audioEngine.stop(this.click_audio_id);
            this.click_audio_id = null;
        }
    },

    get_volume_click_audio: function () {
        if (this.click_audio_id !== null) {
            return cc.audioEngine.getVolume(this.click_audio_id);
        }
    },

    set_volume_click_audio: function (volume) {
        if (this.click_audio_id !== null) {
            cc.audioEngine.setVolume(this.click_audio_id, volume);
        }
    },

    play_star_touch_audio: function (loop, volume) {
        if (loop === true && cc.audioEngine.getState(this.star_touch_audio_id) !== 1) {
            if (this.star_touch_audio_id === null) {
                this.star_touch_audio_id = cc.audioEngine.play(this.star_touch_audio, loop, volume);
                cc.log(this.star_touch_audio_id);
            } else {
                cc.audioEngine.setLoop(this.star_touch_audio_id, loop);
                cc.audioEngine.setVolume(this.star_touch_audio_id, volume);
                cc.audioEngine.resume(this.star_touch_audio_id);
            }
        } else if (loop === false) {
            cc.audioEngine.play(this.star_touch_audio, loop, volume);
        }
    },

    pause_star_touch_audio: function () {
        if (this.star_touch_audio_id !== null) {
            cc.audioEngine.pause(this.star_touch_audio_id);
        }
    },

    stop_star_touch_audio: function () {
        if (this.star_touch_audio_id !== null) {
            cc.audioEngine.stop(this.star_touch_audio_id);
            this.star_touch_audio_id = null;
        }
    },

    get_volume_star_touch_audio: function () {
        if (this.star_touch_audio_id !== null) {
            return cc.audioEngine.getVolume(this.star_touch_audio_id);
        }
    },

    set_volume_star_touch_audio: function (volume) {
        if (this.star_touch_audio_id !== null) {
            cc.audioEngine.setVolume(this.star_touch_audio_id, volume);
        }
    },
});

