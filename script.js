//  Copyright (C) 2020 Vassilis Papavassilopoulos and James Ryrie


// Notification.requestPermission()
window.playsound = false;
console.log('Running');

z = 0


//this actually is fucking retarded james

function ColorChange(){
  if(z == 0){
    document.getElementById("title1").style.color = "turquoise";
    document.getElementById("master").style.color = "turquoise";
    z = z + 1
  }else if(z == 1){
    document.getElementById("title1").style.color = "silver";
    document.getElementById("master").style.color = "silver";
    z = z + 1
  }else if(z == 2){
    document.getElementById("title1").style.color = "lime";
    document.getElementById("master").style.color = "lime";
    z = z + 1
  }
  else if(z == 3){
    document.getElementById("title1").style.color = "blue";
    document.getElementById("master").style.color = "blue";
    z = z + 1
  }else if(z == 4){
    document.getElementById("title1").style.color = "white";
    document.getElementById("master").style.color = "white";
    z = 0
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
    console.log(room)



    var naughtyWordsList = ["fuck", "shit"]

    var lemessage = document.getElementById("message").value;
    if (lemessage == "") {
        return
    }
    if (lemessage.toLowerCase() in naughtyWordsList){
        lemessage = "[NAUGHTY WORD]"
    }
    clearTextBox();

    
    // if (document.getElementById("nameField") = ""){
    //     $(document).ready(function(){
    //     alert("Set a window.username first!")
    //     })
    // }
    
    // if (document.getElementById("textField") = "")
    // document.getElementById("myForm").reset();


    firebase.database().ref("Rooms/" +room +'/MessageIDs/').once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val()
            

            var localMessageID = childData + 1;
            
            console.log(localMessageID);
            
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
//messageids are all over the fucking place, we can fix this cumstain later

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
    //DO Notification
    firebase.database().ref('Rooms/' + room + '/MessageIDs/').once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot)
        {
            var childData = childSnapshot.val()
            var localMessageID = childData;
            window.localMessageID = localMessageID;
        });

        if(window.pastMessageID !== window.localMessageID){
            window.playsound = true;
            console.log('Past Message ID: '+window.pastMessageID + ', Current Message ID'+window.localMessageID)
            window.pastMessageID = window.localMessageID;
            console.log('Past Message ID: '+window.pastMessageID + ', Current Message ID'+window.localMessageID)
            

            firebase.database().ref("Rooms/" +room +'/Messages').once('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    var childData = childSnapshot.val();
                    window.notif = childData['Message']
                })
            })
            console.log(window.notif);
            // if(Notification.permission === 'granted'){
                
            //     const notification = new Notification('New Message Recieved')
            //     notification.onclick = (e) => {
            //         window.location.href = "jschat2.live";
            //     };
            // };
            

        }

    });
    if(window.playsound == true){
        var notifsound = document.getElementById('music');
        notifsound.play();
        playsound = false;
    }
    

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
    console.log(online);
    use1 = window.use
    use = use1.replace(online, " ");
    use2 = use.replace("undefined", " ");
    console.log(use2)

    firebase.database().ref("/Users/").set({
      User: use2
    });
        
});

// MORE TODO is to make the online + offline automated as is a bit annoying RN this can be done with COOKIES

//nah bro ez we did it 

//ez

//Progress: Made The Offline and Online is ready to be automated with only the person involved able to say "offline". Other people cannot. We need cookies. OR. We can have a log in system. I am going to do some work on this with u when u back

//even more TODO: delete all the current todos