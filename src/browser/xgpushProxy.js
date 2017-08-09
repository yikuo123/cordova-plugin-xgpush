var proxy = require("cordova/exec/proxy");

function notSupported(success, error, args) {
    success('browser is not supported');
}

module.exports.addListener = notSupported;
module.exports.registerPush = notSupported;
module.exports.unRegisterPush = notSupported;
module.exports.setTag = notSupported;
module.exports.deleteTag = notSupported;
module.exports.addLocalNotification = notSupported;
module.exports.enableDebug = notSupported;
module.exports.getLaunchInfo = notSupported;
module.exports.getToken = notSupported;
module.exports.setAccessInfo = notSupported;

proxy.add("XGPush", module.exports);