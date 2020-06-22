import React, { Component, useContext } from "react";
import Joi from "joi-browser";
import Input from './input'
import { UsersContext } from '../contexts/usersContext';

class Register extends Component {

  static context = UsersContext;

  state = {
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    location:"",
    error: {}
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string().min(6).max(20)
    .required().label("Password"),
    confirmPassword: Joi.any().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: '!!Passwords do not match',
        }
      } 
    })
    .required().label("Confirm Password"),
    age: Joi.number()
      .required()
      .label("Age"),
    location: Joi.string()
      .required()
      .label("Location"),
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
      console.log(res.error)
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
      const newUser = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email :this.state.email,
        password : this.state.password,
        age : parseInt(this.state.age ),
        location: this.state.location
      };
      console.log(this.context)
        const {handleRegister} = this.context;
        handleRegister(newUser);
        this.props.history.replace('./login')
        this.setState({firstname:"",
        lastname:"",
        email: "",
        password: "",
        age: "",
        location:"", })
    }
    else return;
  }

  onChange = e => 
  {
    this.validateProperty({ [e.target.name]: e.target.value }, e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return ( 
      <div id='register'>
        <h2>Register</h2>
        <form className='registerForm' onSubmit = {this.submit}>
          <div className="row">
            <Input classname="col" type="text" name="firstname" onChange= {this.onChange} placeholder="First Name" error={this.state.error.firstname} />
            <Input classname="col" type="text" name="lastname" onChange= {this.onChange} placeholder="Last Name" error={this.state.error.lastname} />
          </div>
          <Input classname="form-group" type="text" name="email" onChange= {this.onChange} placeholder="Email Address" error={this.state.error.email} />
          <Input classname="form-group" type="password" name="password" onChange= {this.onChange} placeholder="Password" error={this.state.error.password} />
          <Input classname="form-group" type="password" name="confirmPassword" onChange= {this.onChange} placeholder="Confirm Password" error={this.state.error.confirmPassword} />
          <Input classname="form-group" type="number" name="age" onChange= {this.onChange} placeholder="Age" error={this.state.error.age} />
          <Input classname="form-group" type="text" name="location" onChange= {this.onChange} placeholder="Location" error={this.state.error.location} />
        <button type="submit" className="btn btn-lg" style={{backgroundColor: 'rgb(231, 210, 50)'}}>Submit</button>
      </form>
</div>
     );
    }
}
 
export default Register;