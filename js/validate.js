function userSubmit() {
    console.log("submit");
    var age = validate("age", "i_age", "ageErr");
    var displayName = validate("displayName", "i_displayName", "displayNameErr");

    console.log(age);
    if (age != null && displayName != null) {
        console.log("pass");

        firebase.database().ref('userDetails/' +
            firebase.auth().currentUser.uid + '/registerData').set({
            displayName: displayName,
            age: age,
            });
        document.getElementById('welMsg').innerHTML = "Welcome " + displayName;
        document.getElementById('register').style.display = "none";
    }
}

function validate(_iType, _iValue, _pValueErr) {
    let displayName = /^[0-9a-zA-z.]{5,16}$/;
    let age = /^100|[1-9]?\d$/;

    //Selecting type to validate
    if (_iType == "displayName") {
        var iValue = document.getElementById(_iValue).value;
        console.log("DisplayName:" + iValue);
        if (displayName.test(iValue) == true) {
            //Return validation pass value
            document.getElementById(_pValueErr).innerHTML = null;
            return iValue;
        }
        else {
            //Return validation fail value
            document.getElementById(_pValueErr).innerHTML = "Please enter a valid username using letters, numbers and . (5-16 characters)";
            return;
        }
    }

    //Selecting type to validate
    if (_iType == "age") {
        var iValue = document.getElementById(_iValue).value;
        console.log("Age:" + iValue);
        if (age.test(iValue) == true && iValue < 100) {
            //Return validation pass value
            document.getElementById(_pValueErr).innerHTML = null;
            return iValue;
        }
        else {
            //Return validation fail value
            document.getElementById(_pValueErr).innerHTML = "Please enter an age between 1-100";
            return;
        }
    }
}