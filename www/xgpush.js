var exec = require('cordova/exec'),
  cordova = require('cordova'),
  channel = require('cordova/channel'),
  utils = require('cordova/utils');

channel.createSticky('onCordovaXGPushReady');
channel.waitForInitialization('onCordovaXGPushReady');

function XGPush() {

    var me = this;

    this.channels = {
        'click': channel.create('click'),
        'message': channel.create('message'),
        'register': channel.create('register'),
        'unRegister': channel.create('unRegister'),
        'show': channel.create('show'),
        'deleteTag': channel.create('deleteTag'),
        'setTag': channel.create('setTag'),
    };

    this.on = function (type, func) {
        if (type in me.channels) {
            me.channels[type].subscribe(func);
        }
    };

    this.un = function (type, func) {
        if (type in this.channels) {
            me.channels[type].unsubscribe(func);
        }
    };

    this.registerPush = function (account, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "registerPush", [account]);
    };

    this.unRegisterPush = function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "unRegisterPush", []);
    };

    this.setTag = function (tagName, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "setTag", [tagName]);
    };

    this.deleteTag = function (tagName, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "deleteTag", [tagName]);
    };

    this.addLocalNotification = function (type, title, content, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "addLocalNotification", [type, title, content]);
    };

    this.enableDebug = function (debugMode, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "enableDebug", [debugMode]);
    };

    this.getLaunchInfo = function (successCallback) {
        exec(successCallback, null, "XGPush", "getLaunchInfo", []);
    };

    this.getToken = function (successCallback) {
        exec(successCallback, null, "XGPush", "getToken", []);
    };

    this.setAccessInfo = function (accessId, accessKey, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "XGPush", "setAccessInfo", [accessId, accessKey]);
    };

    channel.onCordovaReady.subscribe(function () {
        exec(
            function (event) {
                console.log("[XGPush] Event = " + event.type + ": ", event);
                if (event && (event.type in me.channels)) {
                    me.channels[event.type].fire(event);
                }
            },
            function (e) {
                console.log("[ERROR] addListener: ", e);
                //utils.alert("[ERROR] RegisterPush: ", JSON.stringify(e));
            }, "XGPush", "addListener", []
            );

        me.registerPush(null, function (info) {
            console.log("[XGPush] RegisterPush: ", info);
            channel.onCordovaXGPushReady.fire();
        }, function (e) {
            console.log("[ERROR] RegisterPush: ", e);
            //utils.alert("[ERROR] RegisterPush: ", JSON.stringify(e));
        });
    });
}

module.exports = new XGPush();
