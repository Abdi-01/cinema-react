import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

// import LoginPopUp from '../components/loginPopUp'
import Axios from 'axios'

class MoviesDetail extends Component {
    state = {
        data: [
            {

            }
        ]
    }
    componentDidMount() {
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
                return <Button color="warning" key={index} style={{ margin: 3 }}>{val}</Button>
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
            <div className="container-fluid" >
                <div className="jumbotron center" style={{ width: '75%', marginTop: '5%' }}>
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
                        {this.props.username ?
                            <Button className="float-right" size="lg" onClick={this.buyTicket} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Buy Ticket</Button>
                            :
                            <Button className="float-right" size="lg" onClick={this.getTicket} style={{ background: "#0d47a1", borderBottomLeftRadius: 15, borderTopRightRadius: 15, marginBottom: 0 }}>Get Your Ticket</Button>
                        }
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
