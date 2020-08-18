//  Copyright (C) 2020 Vassilis Papavassilopoulos and James Ryrie





window.colorList = ["turqoise", "silver", "lime", "blue", "white"]
window.colorCycleNo = 0




function cycleColors(){
    document.getElementById("title1").style.color = window.colorList[window.colorCycleNo];
    document.getElementById("master").style.color = window.colorList[window.colorCycleNo];
    window.colorCycleNo += 1;
    if (window.colorCycleNo == 5){
        window.colorCycleNo == 0;
    }
}


function makeRoom(){
  var room = document.getElementById("room").value;
  firebase.database().ref("Rooms/" + room + "/MessageIDs/").set({
      Msgno: 1
  });
  firebase.database().ref("Rooms/" + room + "/Messages/" ).set({
      Messageno: 1
  });
  deleteButton()
  // Requiring fs module in which 
  // writeFile function is defined. 
}

function writeMessage(localMessageID)
{   
    var room = document.getElementById("room").value;
    var lemessage = document.getElementById("message").value;
    var naughtyWordsList = ["fuck", "shit"]

    for (i = 0; i < naughtyWordsList.length; i++) {
        if (lemessage.toLowerCase().search(naughtyWordsList[i]) > -1){
            clearTextBox();
            console.log("NAUGHTY WORD")
            lemessage = ""
            

        }
    }

    
    if (lemessage == "") {
        return
    }
    
    clearTextBox();


    firebase.database().ref("Rooms/" +room +'/MessageIDs/').once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val()
            

            var localMessageID = childData + 1;
            
            
            
            firebase.database().ref("Rooms/" +room + "/MessageIDs/").set({
                Msgno: localMessageID
            })
            
            firebase.database().ref("Rooms/" +room + "/Messages/" + localMessageID).set({
                Username: window.window.username,
                Message: lemessage,
                Messageno: localMessageID
                
                
            });
            

            
            
        })  
    })



    
}


function deleteButton(){
    var room = document.getElementById("room").value;
    
    
    firebase.database().ref("Rooms/" + room +"/Messages").remove()
    firebase.database().ref("Rooms/" + room +"/MessageIDs/").set({
        Msgno: 1
    })
    window.pastMessageID = '0'
        

}

window.pastMessageID = '0'
function getData(){
    var room = document.getElementById("room").value;

    var output ="";
        firebase.database().ref('Rooms/' + room + '/MessageIDs/').once('value', function(snapshot)
        {
            snapshot.forEach(function(childSnapshot){
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val()
                var localMessageID = childData;


                firebase.database().ref("Rooms/" +room +'/Messages').once('value', function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();


                      

                        
                        
                        

                        // output.concat("(" + childData["Username"] + "): " + childData['Message']);
                        output += "<br> (" + childData["Username"] + "): " + childData['Message'];
                        window.test = childData['Message'];

                })
                document.getElementById("data").innerHTML = output;
                usersOnlineRef()


            })
    
        });
        
    })
    
    firebase.database().ref('Rooms/' + room + '/MessageIDs/').once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot)
        {
            var childData = childSnapshot.val()
            var localMessageID = childData;
            window.localMessageID = localMessageID;
        });

        if(window.pastMessageID !== window.localMessageID){
            (document.getElementById("music")).play();
            window.pastMessageID = window.localMessageID;

            firebase.database().ref("Rooms/" +room +'/Messages').once('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    var childData = childSnapshot.val();
                    window.notif = childData['Message']
                })
            })
                 
        }

    });

}



//why the fuck - ok
function usersOfflineSetMASTER(){
  offline = '';
  firebase.database().ref("/Users/").set({
    User: offline
    });

}
    

function usersOnlineRef(){
  firebase.database().ref('/Users/').once('value', function(snapshot){ 
    snapshot.forEach(function(childSnapshot){
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        use = childData;
        document.getElementById("people" ).innerHTML = use;
    });


  });
}
function clearTextBox(){
    document.getElementById('message').value = ''
}

window.addEventListener('beforeunload', function (e) {
    // user signed out
    document.getElementById("master").style.display = "none"
    document.getElementById("login").style.display = "block"
    
    //makes user appear offline
    firebase.database().ref('/Users/').once('value', function(snapshot){ 
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
          window.use = childData
        });
    });
    online = window.username + '<br>';
    
    use1 = window.use
    use = use1.replace(online, " ");
    use2 = use.replace("undefined", " ");
    

    firebase.database().ref("/Users/").set({
      User: use2
    });
        
});




//even more TODO: delete all the current todos