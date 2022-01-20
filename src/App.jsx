import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Routes } from 'react-router';

import Users from './components/content/Users';
import MyProfile from './components/content/MyProfile';
import UserProfile from 'components/content/UserProfile';
import UsersFrame from 'components/content/UsersFrame';

import PostsFrame from 'components/content/PostsFrame';
import Posts from './components/content/Posts';
import Post from './components/content/Post';


import Header from './components/header/Header';

import Content from './components/content/Content';


class App extends Component{

    render(){
      

        return(
            <>      
               <CssBaseline/>
               <Header/>
                <Routes>
                    
                    <Route path="/" element={ <Content /> }>         
                      
                        <Route path='user' element={ <UsersFrame/> }>
                            
                            <Route index element={ <Users/> } />

                            <Route path=':id' element={ <UserProfile />} />

                        </Route>
                        
                        <Route path='profile' element={ <MyProfile/> } />    
                                                 
                        <Route path='post' element={ <PostsFrame/> } >  
                           
                            <Route index element={<Posts/>} /> 

                            <Route path=':id' element={ <Post/>} />
                        
                        </Route>

                    </Route>

                    <Route path='*' element={ <Content/> }></Route>
               
                </Routes>
            </>  
        );        
    }
};

export default App;