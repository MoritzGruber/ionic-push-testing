angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.push'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      },
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
         },
         "android": {
           "iconColor": "#343434"
         }
      }
    });
    push.register(function(token) {
      console.log(token);
      console.log("My Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });
    var authProvider = 'basic';
    var authSettings = { 'remember': true };

    var loginDetails = {
      'email': 'user2@example.com',
      'password': 'secret'
    };
    setTimeout(function () {
        Ionic.Auth.signup(loginDetails).then(signupSuccess, signupFailure);

    },3000);
    var authSuccess = function(user) {
      // user was authenticated, you can get the authenticated user
      // with Ionic.User.current();
      console.log("authSuccess");
    };
    var signupSuccess = function(user) {
      // user was authenticated, you can get the authenticated user
      // with Ionic.User.current();
      console.log("signupSuccess");
    };
    var signupFailure = function(errors) {
      for (var err in errors) {
        // check the error and provide an appropriate message
        // for your application
        console.log("signupFailure");
        console.log(err);
        console.log(errors);

      }
    };
    var authFailure = function(errors) {
      for (var err in errors) {
        // check the error and provide an appropriate message
        // for your application
        console.log("authFailure");
        console.log(err);
        console.log(errors);

      }
    };
    setTimeout(function () {
        var login = function() {
          Ionic.Auth.login(authProvider, authSettings, loginDetails)
            .then(authSuccess, authFailure);
            console.log("poceeed login");
            Ionic.io();
            
            var push = new Ionic.Push();
            push.addTokenToUser(user);

            var user = Ionic.User.current();

            if (!user.id) {
                user.id = Ionic.User.anonymousId();

                // save our newly created user
                user.save();
            }

            var push = new Ionic.Push({});

            push.register(function (token) {
                console.log("Got Token:", token.token);

                // now we have token, so add it to user
                push.addTokenToUser(user);

                // don't forget to save user to Ionic Platform with our new token
                user.save();
            });
        };
        login();
    }, 10000)


    console.log("run through");
  });
})
