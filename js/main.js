var mainApp = {};
var userDetails = {
    uid: '',
    email: '',
    name: '',
    photoURL: '',
    score: ''
};


(function() {
    var firebase = app_firebase;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //Signed in
            const privateRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/private');
            const publicRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public');
            
            privateRef.set({
                name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
            });

            publicRef.set({
                uid: firebase.auth().currentUser.uid,
                photoURL: firebase.auth().currentUser.photoURL,
                score: 0,
            })

            userDetails.uid = user.uid;
            userDetails.email = user.email;
            userDetails.name = user.displayName;
            userDetails.photoURL = user.photoURL;

            document.getElementById('userName').innerHTML = "Welcome " + user.displayName;
        }
        else {
            //Not signed in
            window.location.replace("login.html")
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;

    
    function adminCheck() {
        var adminUID;
        var userUID = firebase.auth().currentUser.uid;       
        const adminRef = firebase.database().ref('admin/' + 'uid/')

        adminRef.on('value', (snapshot) => {
          adminUID = snapshot.val();
              if (adminUID == userUID){
            alert("You're Admin");
            console.log("admin: " + adminUID);
            console.log("user: " + userUID);
        }
        else{
            alert("Access denied");
            console.log("admin: " + adminUID);
            console.log("user: " + userUID);
        }
        });
    }
    mainApp.adminCheck = adminCheck;
})()

function scoreUpdate(_value){
    firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid).child('public').update({'score':_value })
}

