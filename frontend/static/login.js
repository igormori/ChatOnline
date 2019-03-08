
$("#btn").click(function(){
  var request =async function (){
    const myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('x-access-token', localStorage.getItem("token"));
  await fetch('http://localhost:5000/api/me', {
    method: 'GET',
    headers: myHeaders
  }).then(res => res.json())//response type
  .then(data =>{
    if(data.auth !=false){
      localStorage.setItem("validation",true)
      localStorage.setItem("user",data.email)
      localStorage.setItem("room",data.room)
      localStorage.setItem("userName",data.user)
      window.location="/chat"
    }else{
      window.location ='/'
    }
  });
  }
//input
var email =$("#email").val()
var password =$("#password").val()
  

    var data = {
        "email": email,
        "password":password
}	;
    
     fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data) 

}).then(res => res.json())//response type
.then(data =>{
    if(data.auth){
      localStorage.setItem("token",data.token)
      request()
    }else{
      $('#message').html("Error: Wrong email/password. Please try again!");
      $("#message").addClass('alert alert-danger');
    }
    
}); 

});


