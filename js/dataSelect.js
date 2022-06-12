function selectAllData() {    
    firebase.database().ref('userDetails').on('value',
        function(AllRecords) {
            AllRecords.forEach(
                function(currentRecord) {
                    var name = currentRecord.val().name;
                    var displayName = currentRecord.val().displayName;
                    var email = currentRecord.val().email;
                    var age = currentRecord.val().age;
                    var uid = currentRecord.val().uid;
                    var highScore = currentRecord.val().highScore;
                    addItemsToTable(name, displayName, email, age, uid, highScore);
                }
            );
        });
}

function addItemsToTable(name, displayName, email, age, uid, highScore){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    td1.innerHTML = name;
    td2.innerHTML = displayName;
    td3.innerHTML = email;
    td4.innerHTML = age;
    td5.innerHTML = uid;
    td6.innerHTML = highScore;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    tbody.appendChild(trow);
}