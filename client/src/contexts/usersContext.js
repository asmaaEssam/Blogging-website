import React, {createContext, Component} from 'react';
import axios from 'axios'


export const UsersContext = createContext();


class UsersContextProvider extends Component {
    state = { 
        users : []
     }
     async componentDidMount (){

        const {data : users} = await axios.get('http://localhost:9000/users');
        this.setState ({
            users
        })
    }
    handleRegister = newUser => {
        axios.post('http://localhost:9000/users/register', newUser)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
     }
    render() { 
        return ( 
            <UsersContext.Provider value={{...this.state, handleRegister: this.handleRegister}} >
                {this.props.children}
            </UsersContext.Provider>
         );
    }
}

export default UsersContextProvider;