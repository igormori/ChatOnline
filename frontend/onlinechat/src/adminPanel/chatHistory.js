import React from 'react';
import axios from "axios"


class ChatHistory extends React.Component {
    state = { 
        chatsHistory:[]
     }

    componentWillMount(){
            axios.get(`http://localhost:5000/api/history`).then(res =>{
                  console.log(res.data)
                  var chatsArray =[]
                  for(var i=0; i < res.data.length ; i++){
                    chatsArray.push(res.data[i])
                      
                  }
                  this.setState({chatsHistory:chatsArray})

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
                                <th>Date</th>
                                <th>Time</th>
                                <th>Sender</th>
                                <th>Reciever</th>
                                <th>Message</th>
                                <th>Room</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.chatsHistory.map((value, index) => {
                                    return <tr>
                                    <td>{value.id}</td>
                                    <td>{value.date}</td>
                                    <td>{value.time}</td>
                                    <td>{value.sender}</td>
                                    <td>{value.reciever}</td>
                                    <td>{value.message}</td>
                                    <td>{value.room}</td>
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
 
export default ChatHistory;