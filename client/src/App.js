import React, { Component } from 'react';   
import { Route} from 'react-router-dom';
import Header from './components/header';
import Filter from './components/filter';
import Post from './components/post';
import Login from './components/login';
import Register from './components/register';
import PostsContextProvider from './contexts/postsContext';
import UsersContextProvider from './contexts/usersContext';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <React.Fragment>
                <UsersContextProvider>
                <PostsContextProvider>
                <main>
                <Route exact path='/' render={props =>
                            <>
                                <Header/>
                                <Filter/>                   
                                <Post/>
                            </>
                            } />
                <Route exact path='/home' render={props =>
                            <>
                                <Header/>
                                <Filter/>                   
                                <Post/>
                            </>
                            } />
                <Route path="/login" render={props =>
                            <>
                                <Navbar/>                  
                                <Login/>
                            </>
                            } />
                <Route path="/register" render={props =>
                            <>
                                <Navbar/>                  
                                <Register/>
                            </>
                            } />
                </main>
                </PostsContextProvider>
                </UsersContextProvider>
            </React.Fragment>
    </div>
  );
}

export default App;
