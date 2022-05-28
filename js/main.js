var mainApp = {};
var highScore = 10;

(function() {
    var firebase = app_firebase;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //Signed in
            const privateRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/private');
            const publicRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public');

            //Write to database
            firebase.database().ref('userDetails/' +
                firebase.auth().currentUser.uid + '/public' + '/highscore/').on('value', (snapshot) => {
                    //Writing data for user with existing account
                    if (snapshot.exists()) {
                        console.log("exists!");
                        highScore = snapshot.val();
                        privateRef.set({
                            name: firebase.auth().currentUser.displayName,
                            email: firebase.auth().currentUser.email,
                        });

                        publicRef.set({
                            uid: firebase.auth().currentUser.uid,
                            photoURL: firebase.auth().currentUser.photoURL,
                            score: 0,
                            highscore: snapshot.val(),
                        });
                    }
                    else {
                        //Writing data for user without an account
                        console.log("doesn't exist!");
                        highScore = snapshot.val();
                        privateRef.set({
                            name: firebase.auth().currentUser.displayName,
                            email: firebase.auth().currentUser.email,
                        });

                        publicRef.set({
                            uid: firebase.auth().currentUser.uid,
                            photoURL: firebase.auth().currentUser.photoURL,
                            score: 0,
                            highscore: 0,
                        });
                    }
                });
            
            //Sets Highscore and welcome message
            firebase.database().ref('userDetails/' +
                firebase.auth().currentUser.uid + '/public' + '/highscore').on('value', (snapshot) => {
                    document.getElementById("highScore").innerHTML = snapshot.val();
                });
            document.getElementById('userName').innerHTML = "Welcome " + user.displayName
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
            if (adminUID == userUID) {
                alert("You're Admin");
                console.log("admin: " + adminUID);
                console.log("user: " + userUID);
            }
            else {
                alert("Access denied");
                console.log("admin: " + adminUID);
                console.log("user: " + userUID);
            }
        });
    }
    mainApp.adminCheck = adminCheck;
})()

function scoreUpdate(_value) {
    //Updates active score in database and checks for highscore update
    firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid).child('public').update({ 'score': _value })
    firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public' + '/highscore/').on('value', (snapshot) =>
        {
        highScore = snapshot.val();
        console.log("highscore: " + highScore)
        if (_value > highScore) {
            firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid).child('public').update({ 'highscore': _value})
        }
    })
}

