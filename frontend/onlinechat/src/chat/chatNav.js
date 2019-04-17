import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class  extends Component {
    state = {  }
    render() { 
        return ( <div>
                <BrowserRouter>
                    <AdminPanel/>
                        
                </BrowserRouter>
            
        </div> );
    }
}
 
export default ;