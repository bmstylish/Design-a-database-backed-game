var mainApp = {};
var adminStatus;
const admin = "wF60J7nG9eN7v4FaTNGxAMM02l12";


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

    function adminCheck(){
        if(uid == admin){
            console.log("admin");
            alert("admin");
        }
        else{
            console.log("not admin");
            alert("not admin")
        }
    }

    mainApp.adminCheck = adminCheck;
    
})()