import React from 'react';
import axios from "axios"


class Rooms extends React.Component {
    state = { 
        rooms:[]
     }

    componentWillMount(){
            axios.get(`http://localhost:5000/api/rooms`).then(res =>{
                  console.log(res.data)
                  var roomsArray =[]
                  for(var i=0; i < res.data.length ; i++){
                    roomsArray.push(res.data[i])
                      
                  }
                  this.setState({rooms:roomsArray})

            }).catch(() => console.log("ss"))
           
        };

    
    render() { 
        return <div className="m-2">
            <div className='container-fluid'>
                <div className='row'>                 
                    <div className='col-12 blue-grey lighten-5 rounded z-depth-1'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Room</th>
                                    <th>Creation date</th>
                                    <th>Edit date</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.rooms.map((value, index) => {
                                    return <tr>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.createdDate}</td>
                                    <td>{value.editDate}</td>
                                    <td>{value.status}</td>
                                    <td></td>
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
 
export default Rooms;