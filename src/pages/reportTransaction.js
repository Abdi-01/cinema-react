import React, { Component } from 'react';
import {Toast,ToastHeader} from 'reactstrap'
import Axios from 'axios'

class UserTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
         }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/userHistory`)
            .then((res) => {
                //apa yang dilakukan pada data yang benar
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    renderDataUser = () => {
        let a = new Date()
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
        return this.state.data.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{`${days[a.getDay()]}, ${a.getDate()}/${a.getMonth()}/${a.getFullYear()}  ${a.getHours()}:${a.getMinutes()}`}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}><img src={val.moviesImage} alt='imagePoster' style={{ width: 200 }}></img></td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.moviesTitle}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.length}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.seat.map((val, ind) =>
                        < Toast key={ind}>
                            <ToastHeader icon="warning">
                                {(val[0] + 10).toString(36).toUpperCase() + (val[1] + 1)}
                            </ToastHeader>
                        </Toast>
                    )}
                    </td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>IDR. {val.price.toLocaleString()}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.status}</td>
                    {/* <td id={val.id} style={{ verticalAlign: 'middle' }}><button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.id)}>Delete</button></td> */}
                    {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                </tr >
            )
        })
    }

    render() { 
        return ( 
            <div style={{ marginBottom: '5%' }}>
                <p className="h2">Report User Transaction</p>
                 <table className="table">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <td tyle={{ width: 20 }}>#</td>
                                    <td >Booked Time</td>
                                    <td style={{ width: 70 }}>Image</td>
                                    <td >Title</td>
                                    <td >Amount</td>
                                    <td >Seat</td>
                                    <td >Price</td>
                                    <td >Status</td>
                                    {/* <td>Action</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDataUser()}
                            </tbody>
                        </table>
            </div>
         );
    }
}
 
export default UserTransaction;