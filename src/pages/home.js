import React, { Component } from 'react';
import ImgSlide from '../components/carousle'
import MoviesCard from '../components/moviescard'
import Axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
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
            <div style={{marginBottom:'5%'}}>
                <div style={{ height: 390 }}>
                    <ImgSlide></ImgSlide>
                </div>
                <div className="container-fluid">
                    <MoviesCard></MoviesCard>
                </div>
            </div>
        );
    }
}

export default Home;