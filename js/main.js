var mainApp = {};
var highScore = 10;

(function() {
    var firebase = app_firebase;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //Signed in
            const privateRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/private');
            const publicRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public');
            const registerRef = firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/registerData');

            //Write userData to database
            firebase.database().ref('userDetails/' +
                firebase.auth().currentUser.uid + '/public' + '/highscore/').on('value', (snapshot) => {
                    //Writing data for user with existing account
                    if (snapshot.exists()) {
                        console.log("Highscore exists!");
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
                        console.log("Highscore doesn't exist!");
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

            //User Registering Data
            firebase.database().ref('userDetails/' +
                firebase.auth().currentUser.uid + '/registerData').on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        console.log("register data exist");
                        document.getElementById('welMsg').innerHTML = "Welcome " + snapshot.child("displayName").val();
                    }
                    else {
                        console.log("register data doesn't exist");
                        document.getElementById('register').style.display = "block";
                        firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public' + '/photoURL').on('value', (snapshot) => {
                            console.log(snapshot.val())
                            document.getElementById("avatar").src = snapshot.val();
                        });
                    }
                })

            //Sets Highscore and welcome message
            firebase.database().ref('userDetails/' +
                firebase.auth().currentUser.uid + '/public' + '/highscore').on('value', (snapshot) => {
                    document.getElementById("highScore").innerHTML = snapshot.val();
                });
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

    var once = false;
    function adminCheck() {
        console.log("running");
        var adminUID;
        var userUID = firebase.auth().currentUser.uid;
        const adminRef = firebase.database().ref('userRoles/' + 'admin/' + 'uid/');

        adminRef.on('value', (snapshot) => {
            adminUID = snapshot.val();
            if (adminUID == userUID) {
                alert("You're Admin");
                console.log("admin: " + adminUID);
                console.log("user: " + userUID);
                document.getElementById('adminTable').style.display = 'block';
                if (once == false) {
                    selectAllData();
                    once = true;
                }
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


    firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid + '/public' + '/highscore/').on('value', (snapshot) => {
        highScore = snapshot.val();
        console.log("highscore: " + highScore)
        if (_value > highScore) {
            firebase.database().ref('userDetails/' + firebase.auth().currentUser.uid).child('public').update({ 'highscore': _value })
        }
    })
}

