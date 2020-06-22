import React from 'react';

const Input = (props) => {
    return ( 
        <div className={props.classname}>
            <input type={props.type} className="form-control" name={props.name} onChange = {props.onChange} value = {props.value} placeholder={props.placeholder} />
            {props.error && <span className="alert-danger">{props.error}</span>}
          </div>
     );
}
 
export default Input;