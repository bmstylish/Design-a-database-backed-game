var mainApp = {};


(function(){
    var firebase = app_firebase;
    var uid = null;
    
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            //Signed in
            uid = user.uid;
            document.getElementById('userName').innerHTML = "Welcome " + user.displayName;
        }
        else{
            //Not signed in
            uid = null;
            window.location.replace("login.html")
        }
    });
    
    function logOut(){
        firebase.auth().signOut();
    }

    mainApp.logOut = logOut;

    
    
})()