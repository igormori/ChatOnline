import React from 'react';
import axios from "axios"


class EventHistory extends React.Component {
    state = { 
        eventsHistory:[]
     }

    componentWillMount(){
            axios.get(`http://localhost:5000/api/eventLog`).then(res =>{
                  console.log(res.data)
                  var eventsArray =[]
                  for(var i=0; i < res.data.length ; i++){
                      eventsArray.push(res.data[i])
                      
                  }
                  this.setState({eventsHistory:eventsArray})

            }).catch(() => console.log("ss"))
           
        };

    render() { 
        return <div className="m-2">
            <div className='container-fluid '>
                <div className='row'>
                    <div className='col-12 blue-grey lighten-5 rounded z-depth-1'>
                        <table>
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>User</th>
                                <th>eventID</th>
                                <th>PPID</th>
                            </tr>
                            </thead>

                            <tbody>
                           
                            {this.state.eventsHistory.map((value, index) => {
                                    return <tr>
                                    <td>{value.type}</td>
                                    <td>{value.date}</td>
                                    <td>{value.time}</td>
                                    <td>{value.user}</td>
                                    <td>{value.eventID}</td>
                                    <td>{value.PPID}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>;
    }
}
 
export default EventHistory;