import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { seatChosen } from '../redux/action'
import Axios from 'axios';
// import Axios from 'axios';

class SeatReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataCheck: [],
            booked: [[0, 0], [0, 1]],
            chosen: [],
            price: 0,
            count: 0,
            TooltipOpen: false
        }
        this.toggleTips = this.toggleTips.bind(this);
    }
    toggleTips() {
        this.setState({
            TooltipOpen: !this.state.TooltipOpen
        });
    }
    componentDidMount() {
        let id = this.props.filmId
        console.log(id)
        Axios.get(`http://localhost:2000/movies/${id}`)
            .then((res) => {
                this.setState({ booked: res.data.booked })
                this.setState({ data: res.data })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    btSelectSeat = (arr) => {
        let { chosen, price, count } = this.state
        chosen.push(arr)
        this.setState({
            chosen,
            price: price + 5000,
            count: count + 1
        })
    }
    btCancelSeat = (arr) => {
        let { chosen, price, count } = this.state
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            chosen: output,
            price: price - 5000,
            count: count - 1
        })
    }

    renderSeat = () => {
        let seats = 100 //jumlah total kursi
        let { chosen, booked } = this.state;
        console.log(booked)
        let arr = []
        for (let i = 0; i < seats / 20; i++) {
            arr.push([])
            for (let j = 0; j < seats / (seats / 20); j++) {
                arr[i].push(1)//membuat arr didalam array
            }
        }

        for (let k = 0; k < booked.length; k++) {
            arr[booked[k][0]][booked[k][1]] = 2
        }
        for (let l = 0; l < chosen.length; l++) {
            arr[chosen[l][0]][chosen[l][1]] = 3
        }

        return arr.map((val, index) => {
            return (
                <div className='d-flex justify-content-center ' key={index}>
                    {(index + 10).toString(36).toUpperCase()}
                    {
                        val.map((valA, _i) => {
                            if (valA === 2) {
                                return (
                                    <div key={_i} data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                        <EventSeatIcon
                                            key={val.id}
                                            color={"secondary"}
                                            disabled
                                            fontSize={"default"}
                                            style={{ cursor: 'pointer' }}
                                        >
                                        </EventSeatIcon>
                                    </div>
                                )
                            }
                            if (valA === 3) {
                                return (
                                    <div key={_i}>
                                        <EventSeatIcon
                                            key={val.id}
                                            color={"primary"}
                                            onClick={() => this.btCancelSeat([index, _i])}
                                            fontSize={"default"}
                                            id={index + _i}
                                        // onFocus={() => this.seatOrdinat(index, _i)}
                                        // style={{ cursor: 'pointer' }} id={"Tooltip-" + index + _i}
                                        >
                                        </EventSeatIcon>
                                    </div>
                                )
                            }

                            return (
                                <div key={_i}>
                                    <EventSeatIcon
                                        key={val.id}
                                        onClick={() => this.btSelectSeat([index, _i])}
                                        fontSize={"default"}
                                        style={{ cursor: 'pointer' }}
                                        id={"Tooltip-" + index + _i}
                                    >
                                    </EventSeatIcon>
                                    <UncontrolledTooltip placement="top" target={"Tooltip-" + index + _i}>
                                        {(index + 10).toString(36).toUpperCase() + (_i + 1).toString()}
                                    </UncontrolledTooltip>
                                </div>
                            )

                        })
                    }
                </div>
            )
        })
    }

    // dateBook=()=>{
    //     var a = new
    // }

    addToCart = () => {
        let { data } = this.state;
        let a = new Date()
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
        // this.props.seatChosen(chosen)
        Axios.get(`http://localhost:2000/userTransaction?username=${localStorage.getItem('userlogin')}&moviesTitle=${data.name}`)
            .then((res) => {
                console.log(this.state.chosen.map((val)=>{
                    console.log(val)
                }))
                // this.setState({dataCheck:res.data})
                if (res.data.length > 0 && res.data[0].moviesTitle===data.name) {
                    Axios.patch(`http://localhost:2000/userTransaction/${res.data[0].id}`, {
                        ticket_amount: (parseInt(res.data[0].ticket_amount) + parseInt(this.state.count)),
                        price: (res.data[0].price + this.state.price),
                        seat: res.data[0].seat.concat(this.state.chosen)
                        // seat: this.state.chosen.concat((val) =>{
                        //     return res.data[0].seat.concat(val)
                        // })
                    })
                        .then((res) => {
                            console.log(res.data)
                        })
                }
                else{
                    Axios.post(`http://localhost:2000/userTransaction`, {
                        username: this.props.username,
                        time: `${days[a.getDay()]}, ${a.getDate()}/${a.getMonth()}/${a.getFullYear()}  ${a.getHours()}:${a.getMinutes()}`,
                        moviesImage: this.state.data.image,
                        moviesTitle: this.state.data.name,
                        ticket_amount: this.state.count,
                        price: this.state.price,
                        seat: this.state.chosen,
                        IDfilm: this.props.filmId,
                        status: 'Unpaid'
                    })
                    this.setState({
                        chosen: [],
                        price: 0,
                        count: 0
                    })
                }
            })

        alert('Booking Succesfull!')
        this.setState({ redirect: true })
    }

    render() {
        let { data } = this.state;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={`/`} />;
        }
        return (
            <div className="container-fluid">
                <ModalBody >
                    <div className="row">
                        <div className="col-2">
                            <img src={data.image} className="card-img" alt="..." />
                        </div>
                        <div className="col" >
                            {this.renderSeat()}
                            <div className="d-flex justify-content-center row" >
                                <h4>
                                    {this.state.count} Seats
                                </h4>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter >
                    <h4>
                        IDR. {this.state.price.toLocaleString()}
                    </h4>
                    <Button color="primary" onClick={this.addToCart}>Buy</Button>
                </ModalFooter>
            </div>
        );
    }
}
const mapStatetoProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role,
        // seat:state.seat.chosen
    }
}

export default connect(mapStatetoProps)(SeatReservation)



// addToCart = () => {
//     let { chosen } = this.state;
//     var book = this.state.data.booked;
//     for (var i = 0; i < chosen.length; i++) {
//         book.push(chosen[i])
//     }
//     console.log(book)
//     Axios.patch(`http://localhost:2000/movies/${this.state.data.id}`, {
//         booked: book
//     })
//         .then((res) => {
//             Axios.post(`http://localhost:2000/userTransaction`, {
//                 username: this.props.username,
//                 moviesImage: this.state.data.image,
//                 moviesTitle: this.state.data.name,
//                 ticket_amount: this.state.count,
//                 price: this.state.price,
//                 seat: this.state.chosen,
//                 status: 'Unpaid'
//             })
//             this.setState({
//                 chosen: [],
//                 price: 0,
//                 count: 0
//             })
//             alert('Booking Succesfull!')
//             this.setState({ redirect: true })
//         })
// }