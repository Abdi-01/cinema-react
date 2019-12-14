import React, { Component } from 'react'
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Toast, ToastHeader } from 'reactstrap'
// import { Link } from 'react-router-dom'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalPrice: 0,
            modal: false,
            selectedId: null
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        let userlogincart = localStorage.getItem('userlogin')
        Axios.get(`http://localhost:2000/userTransaction?username=${userlogincart}`)
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
        return this.state.data.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td id={val.id}><img src={val.moviesImage} alt='imagePoster' style={{ width: 200 }}></img></td>
                    <td id={val.id}>{val.moviesTitle}</td>
                    <td id={val.id}>Location</td>
                    <td id={val.id}>Time</td>
                    <td id={val.id}>Amount</td>
                    <td id={val.id}>{val.seat.map((val) =>
                        < Toast >
                            <ToastHeader icon="warning">
                                {(val[0] + 10).toString(36).toUpperCase() + val[1]}
                            </ToastHeader>
                        </Toast>
                    )}
                    </td>
                    <td id={val.id}>IDR. {val.price.toLocaleString()}</td>
                    <td id={val.id}><button className="btn btn-danger" onClick={() => this.deleteData(val.id)}>Delete</button></td>
                    {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                </tr >
            )
        })
    }

    totalCart = () => {
        var total = 0
        this.state.data.map((val) => {
            total += val.price
        })
        return total
    }

    checkout = () => {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Total Paid :</ModalHeader>
                <ModalBody >
                    <h2>IDR. {this.totalCart().toLocaleString()}</h2>
                </ModalBody>
                <ModalFooter >
                    {/* <Link to='/'> */}
                    <Button color="success" onClick={this.okCheckout}>Ok</Button>
                    {/* </Link> */}
                </ModalFooter>
            </Modal>
        )
    }
    okCheckout = () => {
        this.clearCart()
        this.toggle()
    }

    clearCart = () => {
        Axios.get(`http://localhost:2000/userTransaction`)
            .then((res) => {
                const dataSelect = res.data;
                this.setState({ dataSelect })
                console.log(dataSelect)
                dataSelect.forEach(val => {//fungsi untuk menghapus satu persatu
                    Axios.delete(`http://localhost:2000/userTransaction/${val.id}`)
                        .then((res) => {
                            console.log(res.data)
                            Axios.get('http://localhost:2000/userTransaction')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                                .then((res) => {
                                    this.setState({ data: res.data })//untuk mengubah isi state data
                                })
                        })
                })
                // Axios.get('http://localhost:2000/dbcart')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                //     .then((res) => {
                //         this.setState({ data: res.data })//untuk mengubah isi state data
                //     })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteData = (id) => {
        Axios.delete(`http://localhost:2000/userTransaction/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                // console.log(dataSelect)
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get('http://localhost:2000/userTransaction')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <p className="h2">User Cart Product</p>
                <table className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td style={{ width: 70 }}>Image</td>
                            <td style={{ width: 150 }}>Title</td>
                            <td style={{ width: 150 }}>Location</td>
                            <td style={{ width: 150 }}>Time</td>
                            <td style={{ width: 150 }}>Amount</td>
                            <td style={{ width: 150 }}>Seat</td>
                            <td style={{ width: 150 }}>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataUser()}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total Cart</td>
                            <td>IDR. {this.totalCart().toLocaleString()}</td>
                            <td>
                                <Button onClick={this.toggle}>Checkout</Button>
                                {this.checkout()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserPage