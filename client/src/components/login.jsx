import React, { Component } from "react";
import Joi from "joi-browser";
import {Link} from "react-router-dom"

class Login extends Component {
  state = {
      email: "",
      password: "",
      error: {}
    };

    schema = {
      email: Joi.string()
        .required()
        .label("Email"),
      password: Joi.string()
        .required()
        .label("Password"),
    };

    validate = () => 
    {
      const error = {};
      const data = { ...this.state };
      delete data.error;
      const res = Joi.validate(data, this.schema, { abortEarly: false });
  
      if (res.error) {
        for (const detail of res.error.details) {
          error[detail.path[0]] = detail.message;
        }
        this.setState({ error });
        return false;
    }
      this.setState({ error });
      return true;
  }

    validateProperty = (property, propertyName) => {

      const data = property;
      const schema = { [propertyName]: this.schema[propertyName] };
      const res = Joi.validate(data, schema);
      if (res.error === null) {
        delete this.state.error[propertyName];
      } else {
        //Clone
        const newError = { ...this.state.error };
        //Edit
        newError[propertyName] = res.error.details[0].message;
        //Set State
        this.setState({ error: newError });
      }
    };
  
    submit = e =>
    {
      e.preventDefault();
      if (this.validate())
      {
          this.props.history.replace('./home')
      }
      else return;
    }

    onChange = e => 
    {
      this.validateProperty({ [e.target.name]: e.target.value }, e.target.name);
      this.setState({ [e.target.name]: e.target.value });
    }
    render(){
    return ( 
      <div id='login'>
        <h2>Login</h2>
         <form className='loginForm' onSubmit = {this.submit}>
        <div className="form-group">
          <input type="email" className="form-control" name="email" onChange = {this.onChange} value = {this.state.email} placeholder="Enter Email Address"/>
          {this.state.error.email && <span className="alert-danger">{this.state.error.email}</span>}
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="password" onChange = {this.onChange} value = {this.state.password} placeholder="Password"/>
          {this.state.error.password && <span className="alert-danger">{this.state.error.password}</span>}
        </div>
        <button type="submit" className="btn" style={{backgroundColor: 'rgb(231, 210, 50)'}}>Submit</button>
      </form>
         <div>
          <Link to="/Register" style={{color: 'grey'}}>Or Create New Account</Link>
      </div>
      </div>
     );
    }
}
export default Login;