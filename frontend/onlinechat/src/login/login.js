import React, { Component } from 'react';
import axios from "axios"



class Login extends Component {
  state = {
    email:"",
    password:""
  }
      // handles the inputs
          handleInputEmail = event => {
              this.setState({email:event.target.value})
          };
          handleInputPassword = event => {
            this.setState({password:event.target.value})
        };

      //handles the form request ss
      handleSubmit = event => {
            event.preventDefault();
            console.log(this.state.email)
          axios.post(`/api/login`,{email: this.state.email, password: this.state.password},{Headers: { 'content-type': 'application/json' }}).then(res =>{
            console.log(res.data)
            if(res.data.auth){
               localStorage.setItem('token', res.data.token);
               window.location.href = "/admin";
            }
      }).catch(() => console.log("user not founded"))
    };
          
  render() { 
    return <div>
<div className='container-fluid  p-5'>
   <div className="row">
      <div className="col s0 m3 l3">
      </div>
      <div className="col s0 m6 l6 bg-light p rounded">
      <form method="post" onSubmit={this.handleSubmit} >
         <div id="message" role="alert"></div>
         <h3> Login to access admin panel  </h3>
         <div className="form-group">
            <label for="exampleInputEmail1"><b>Email</b></label>
            <input type="email" name="email" onChange={this.handleInputEmail}/>
         </div>
         <div className="form-group">
            <label for="exampleInputPassword1"><b>Password</b></label>
            <input type="password" name="password" onChange={this.handleInputPassword}/>
         </div>
         <button className="btn" type="submit">Login</button>
         </form>
      </div>
      <div className="col s0 m3 l3">
      
      </div>
   </div>
</div>
    </div>;
  }
}

export default Login;
