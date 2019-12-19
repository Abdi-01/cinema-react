import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, Alert } from 'reactstrap';
// import LoginPopUp from '../components/loginPopUp'
import Axios from 'axios'
import SeatReservation from '../components/seatReservation'

class MoviesDetail extends Component {
    state = {
        data: [
            {

            }
        ],
        modal: false,
        alert: false
    }
    toggle = this.toggle.bind(this);
    toggleAlert = this.toggleAlert.bind(this);
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleAlert() {
        this.setState({
            alert: !this.state.alert
        });
    }
    componentDidMount() {
        console.log(this.props)
        var id = this.props.location.search.split('=')[1];
        Axios.get(`http://localhost:2000/movies?id=${id}`)
            .then((res) => {
                this.setState({ data: res.data })
                console.log(this.state.data)
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    renderGenre = () => {
        let { genre } = this.state.data[0]
        console.log(genre)
        if (genre) {
            return genre.map((val, index) => {
                return <Button outline color="warning" key={index} style={{ margin: 3 }}>{val}</Button>
            })
        }
    }
    renderCasts = () => {
        let { casts } = this.state.data[0]
        console.log(casts)
        if (casts) {
            return <p className="h4">Casts : {casts.join(', ')}</p>
        }
    }

    // buyTicket = () => {
    //     localStorage.setItem('modalBuy', true)
    // }
    // getTicket = () => {
    //     localStorage.setItem('modalBuy', false)
    // }

    render() {
        let { data } = this.state;
        return (
            <div className="container-fluid" style={{ margin: '0 auto' }} >
                <Alert color="warning" isOpen={this.state.alert} toggle={this.toggleAlert}>
                    Please login first!
                    </Alert>
                <div className="jumbotron center" style={{ width: '75%' }}>
                    <div className="row">
                        <div className="col-3" style={{ textAlign: 'center' }}>
                            {console.log(data[0].name)}
                            <img src={data[0].image} className="card-img" alt="..." />
                            {this.renderGenre()}
                        </div>
                        <div className="col">
                            <h1>{data[0].name}</h1>
                            <div>
                                <p className="h4">Director : {data[0].director}</p>
                                {this.renderCasts()}
                                <p className="h4">Duration : {data[0].duration} minute</p>
                                <p className="h5" style={{ textAlign: 'justify' }}>Synopsis : {data[0].synopsis}</p>
                                {console.log(data[0].casts)}
                            </div>
                        </div>
                        {this.props.username && this.props.role === 'user'
                            ?
                            <Button className="float-right" size="lg" onClick={this.toggle} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Buy Ticket</Button>
                            :
                            <div>
                                {this.props.role === 'admin'
                                    ?
                                    <Button className="float-right" size="lg" style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Get Your Ticket</Button>
                                    :
                                    <Button className="float-right" size="lg" onClick={this.toggleAlert} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Get Your Ticket</Button>
                                }
                            </div>
                        }
                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Choose Your Seat</ModalHeader>
                            <SeatReservation filmId={this.props.location.search.split('=')[1]}></SeatReservation>
                        </Modal>
                    </div>
                </div>
            </div>
        );
        // }
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(MoviesDetail)
