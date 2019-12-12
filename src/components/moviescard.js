import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class MoviesCard extends Component {
    //untuk menampung data global yang digunakan pada lokal project
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    //
    componentDidMount() {
        Axios.get('http://localhost:2000/movies')
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

    render() {
        return (
            <div className="row" >
                {this.state.data.map((val, index) =>
                    <div className="col-3" style={{ borderRadius: 40 }} key={val.id}>                
                        <Link to={`/MoviesDetail?id=${val.id}`}>
                            <div className="card" style={{ width: '500px', cursor: 'pointer', borderRadius: 40 }}>
                                <img src={val.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{val.name}</h5>
                                    <p className="card-text">Director :{val.director}</p>
                                    <p className="card-text">Casts :<br></br>{val.casts.toString()}</p>
                                    <p className="card-text">Duration :{val.duration} minute</p>
                                </div>
                                <div className="card-footer">
                                    {val.genre.map((gen, index) =>
                                        // <div key={val.id}>
                                        <Button key={index}>{gen}</Button>
                                        // </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

        )//return
    }//render
}//project

export default MoviesCard;
