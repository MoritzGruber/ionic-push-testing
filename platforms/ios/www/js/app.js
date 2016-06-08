angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.push'])

.run(function($ionicPlatform) {
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
      //user.id = Ionic.User.anonymousId();
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
    push.register(function (token) {
            console.log("Got Token:", token.token);

            // now we have token, so add it to user
            //push.addTokenToUser(user);
            console.log(push);
            // don't forget to save user to Ionic Platform with our new token
            //user.save();
    });
    // set this user as current, so we can acess him later
        //Ionic.User.current(user);
  });
})
