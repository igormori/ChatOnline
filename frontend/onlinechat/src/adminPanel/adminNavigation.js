import React from 'react';
import AdminPanel from './adminPanel'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import EventHistory from './eventHistory'
import ChatHistory from './chatHistory'
import Rooms from './rooms'
import EditRoom from './editRoom'
import CreateRoom from './createRoom'

class adminNavigation extends React.Component {
    state = {  }
    render() { 
        return ( <div>
                <BrowserRouter>
                    <AdminPanel/>
                        <Switch> 
                            <Route path="/admin/eventHystory" component={EventHistory}/>
                            <Route path="/admin/chatHistory" component={ChatHistory}/>
                            <Route path="/admin/rooms" component={Rooms}/>
                            <Route path="/admin/editRoom" component={EditRoom}/>
                            <Route path="/admin/createRoom" component={CreateRoom}/>
                        </Switch>
                </BrowserRouter>
            
        </div> );
    }
}
 
export default adminNavigation ;