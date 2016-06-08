angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.push'])

.run(function($ionicPlatform) {
  
})
.controller('testCtrl', function (ionicPlatform, $cordovaPush) {
    $ionicPlatform.ready(function() {
    Ionic.io();
    var push = new Ionic.Push({
      "onNotification": function (notification) {
        alert('Receved a Notification!');
      },
      "pluginConfig": {
        "android":{
          "iconColor": "0000FF"
        }
      }
    });
    var user = Ionic.User.current();
    if(!user.id){
      user.id = Ionic.User.anonymousId();
      user.save();
    }
    var push = new Ionic.Push({
      "onNotification": function (notification) {
        alert('Receved a Notification!');
      },
      "pluginConfig": {
        "android":{
          "iconColor": "0000FF"
        }
      }
    });

    var user = Ionic.User.current();
    console.log("User:"+user);
    var callback = function(pushToken) {
      console.log('Registered token:', pushToken.token);
      user.addPushToken(pushToken);
      user.save(); // you NEED to call a save after you add the token
    }

    push.register(callback);
  });
  });
  
