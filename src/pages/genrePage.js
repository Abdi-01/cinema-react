import React, { Component } from 'react';
import Axios from 'axios'

class GenrePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterData: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        var genre = this.props.location.search.split('=')[1];
        Axios.get(`http://localhost:2000/movies`)
            .then((res) => {
                //apa yang dilakukan pada data yang benar
                this.setState({ data: res.data })
                console.log(this.state.data)
                var movies = this.state.data;
                var filtered = movies.filter(function (x) {
                    return x.genre.indexOf(genre) > -1;
                });
                console.log(filtered)
                this.setState({ filterData: filtered })
            })
            .catch((err) => {
                //apa yang dilakukan pada data yang salah
                console.log(err)
            })
    }

    // filterGenre = () => {
    //     var genre = this.props.location.search.split('=')[1];
    //     // return this.state.data.filter((gen)=>{
    //     //     return console.log(gen.genre.indexOf(genre))
    //     // })
    //     // var genre = req.query.genre;
    //     var movies = this.state.data;
    //     var filtered = movies.filter(function (x) {
    //         return x.genre.indexOf(genre) > -1;
    //     });
    //     console.log(filtered)
    //     this.setState({ filterData: filtered })
    // }

    renderData = () => {
        return this.state.filterData.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}><img src={val.image} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img></td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.name}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}> {val.genre.map((gen, index) =>
                        // <div >
                        <h6 key={index}>{gen}</h6>
                        // </div>
                    )}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.duration} Minute</td>
                    <td id={val.id} style={{ verticalAlign: 'middle', maxWidth: '1px' }}>{val.director}</td>
                    <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.casts.join(', ')}</td>
                    <td id={val.id} style={{ overflow: 'hidden', maxWidth: '3px', verticalAlign: 'middle', wordWrap: 'break-word' }}>{val.synopsis}
                    </td>
                    {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ marginBottom: '5%' }}>
                {/* <p className="h2">Market Cube Product</p> */}
                <table className="table">
                    <thead>
                        <tr>
                            <td style={{ width: 70 }}>#</td>
                            <td style={{ width: 70 }}>Image</td>
                            <td style={{ width: 150 }}>Title</td>
                            <td style={{ width: 150 }}>Genre</td>
                            <td style={{ width: 150 }}>Duration</td>
                            <td style={{ width: 150 }}>Director</td>
                            <td style={{ width: 150 }}>Casts</td>
                            <td>Synopsis</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GenrePage;