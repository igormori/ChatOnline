 
  $("#btn").click(function(){
    var email =$("#email").val()
    var password =$("#password1").val()
    var password2 =$("#password2").val()
    var userName =$("#userName").val()
   


    var passwordValidation =  function(password,password2,userName) {
      if(password != password2){
        $('#message').html("Error: Password does not match");
        $("#message").addClass('alert alert-danger');
        return false
      }else if(password.length < 7){
        
       $('#message').html("Error: Password must be at least 6 characters long");
       $("#message").addClass('alert alert-danger');
       return false
      }else if(password == userName) {
       $('#message').html("Error: Password must be different from Username!");
       $("#message").addClass('alert alert-danger');
       return false
     }  
     re = /^\w+$/;
     if(!re.test(password)) {
      $('#message').html("Error: Username must contain only letters, numbers and underscores!");
      $("#message").addClass('alert alert-danger');
       return false;
     }
     else{
        return true
     }
    
    }
    
    function validateEmail(email) {
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(re.test(email)){
       return true
     }
     else{
       $('#message').html("Error: Email format incorrect!");
       $("#message").addClass('alert alert-danger');
       return false
     }
   }
 
   if(passwordValidation(password,password2,userName) && validateEmail(email)){
     
    //input
    var data = {
      "user":userName,
      "email": email,
      "password":password

}	;

    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    
    })
    .then(data =>{
      console.log(data.ok)
      if(data.ok){
        window.location = "/"
      }else{
        $('#message').html("Error: username/email already exists. Please try again!");
        $("#message").addClass('alert alert-danger');
      }
    }).catch(error =>{
      console.log(erro)
    });

  }
  });



