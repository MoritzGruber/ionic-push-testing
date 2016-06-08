angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.push'])

.run(function($ionicPlatform) {
  
})
.controller('testCtrl', function ($ionicPlatform, $ionicPush, $scope) {
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
    console.log('user currently: '+JSON.stringify(user));
    if(!user.id){
      //user.id = Ionic.User.anonymousId();
      //user.save();
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
      //user.addPushToken(pushToken);
      //user.save(); // you NEED to call a save after you add the token
    }
    
    // IONIC USER PART
    push.register(callback);

    var fakeDetails = {
    'email':'asdfasdfasasdfafsfasfasdfasasfasf@gmail.com',
    'password':'123345'
    };

    $scope.customRegistration= function() {
        //this will work one time
            
        Ionic.Auth.signup(fakeDetails).then(function(newUser) {
            console.log('signup worked ok, here is the new user '+JSON.stringify(newUser));
            //what's the user ob like now?
            var callback = function(pushToken) {
            console.log('Registered token:', pushToken.token);
            //newUser.addPushToken(pushToken);
            //newUser.save(); // you NEED to call a save after you add the token
            }
            
            // IONIC USER PART
            push.register(callback);
            //are they logged on? the docs imply NO
            console.log('newly signed up user logged in?',user.isAuthenticated());  

        }, function(error) {
            console.log('signed failed with '+JSON.stringify(error));
        });
    };
  });
  });
  
