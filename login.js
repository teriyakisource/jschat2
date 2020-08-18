document.getElementById("music").style.display = "none"
    var myVar;
    getData()
    //Refresh is here. It is currently set to 1000ms or 1s YAY
    myVar = setInterval(getData, 100);
    var online = '';
    usersOnlineRef()


    document.getElementById("master").style.display = "none"
    document.getElementById("login").style.display = "block"

    
    function login(){
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message)
      }); 
    }
    function signOut(){
      firebase.auth().signOut().then(function() {
      console.log('Signed out Successfull')
      }).catch(function(error) {
      console.log('Signed out Failed')
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message)
      }); 
    }

    function signUp(){
      email = document.getElementById("email").value;
      window.screenName = charAt("@")
      var password = document.getElementById("password").value;
      if(email.includes('@latymer-upper.org') ){
        firebase.database.ref("People/ ")
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message)
        });

      }else{
        alert('Not a school email')
      }
      
      
    }
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
        var username = user.email;
        window.username = username;
        document.getElementById("master").style.display = "block"
        document.getElementById("login").style.display = "none"


        //Sets Online Auto
        firebase.database().ref('/Users/').once('value', function(snapshot){ 
            snapshot.forEach(function(childSnapshot){
              var childData = childSnapshot.val();
              window.use = childData
            });
            
            
            //dumb as fuck
        if(username == 'james.ryrie1@gmail.com'){
          document.getElementById('specialCommands').style.display = "block"
        }else if(username == 'teriyakivass@gmail.com'){
          document.getElementById('specialCommands').style.display = "block"
        }else{
          document.getElementById('specialCommands').style.display = "none"
        }
        


        });
        online = window.username + '<br>' ;
        b = window.use + online;
        console.log("le epic" + b.replace("undefined", " "));
        c = b.replace("undefined", " ");
        firebase.database().ref("/Users/").set({
          User: c
        });

        
        } else {
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
        
        }
     
    });