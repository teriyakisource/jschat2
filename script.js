$(document).ready(function(){
    
})



function writeMessage(localMessageID)
{   
    
    
    var lemessage = document.getElementById("message").value;
    
    clearTextBox();

    
    // if (document.getElementById("nameField") = ""){
    //     $(document).ready(function(){
    //     alert("Set a username first!")
    //     })
    // }
    
    // if (document.getElementById("textField") = "")
    // document.getElementById("myForm").reset();
    firebase.database().ref('/MessageIDs/').once('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val()
            
            
            var localMessageID = childData + 1;
            
            firebase.database().ref("MessageIDs/").set({
                Msgno: localMessageID
            })
            
            firebase.database().ref("Messages/" + localMessageID).set({
                Username: document.getElementById("nameField").value,
                Message: lemessage,
                Messageno: localMessageID
                
                
            });
            

            
            
        })  
    })
    
    
}


function deleteButton(){
    
    firebase.database().ref("Messages").remove()

    firebase.database().ref("MessageIDs/").set({
        Msgno: 1
    })
    
        

}


function getData(){

    var output ="";
        firebase.database().ref('/MessageIDs/').once('value', function(snapshot)
        {
            snapshot.forEach(function(childSnapshot){
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val()
                var localMessageID = childData;


                firebase.database().ref('/Messages').once('value', function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();

                      

                        
                        
                        

                        // output.concat("(" + childData["Username"] + "): " + childData['Message']);
                        output += "<br> (" + childData["Username"] + "): " + childData['Message'];
                        
                       

                })
                document.getElementById("data").innerHTML = output;
                usersOnlineRef()


            })
    
        });
        
    })
}
function usersOnlineSet(){
  firebase.database().ref('/Users/').once('value', function(snapshot){ 
    snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        use = childData
    });


  });
    online = document.getElementById("nameField").value;
    firebase.database().ref("/Users/").set({
        User: use + online
    
    });
}

function usersOfflineSet(){
  firebase.database().ref('/Users/').once('value', function(snapshot){ 
    snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        use = childData;
        console.log(use)
    });


  });
    offline = '';
    if (use ==  document.getElementById("nameField").value){
      firebase.database().ref("/Users/").set({
        User: offline
    
      });

    }
    
}
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

// MORE TODO is to make the online + offline automated as is a bit annoying RN this can be done with COOKIES
//Progress: Made The Offline and Online is ready to be automated with only the person involved able to say "offline". Other people cannot. We need cookies. OR. We can have a log in system. I am going to do some work on this with u when u back
