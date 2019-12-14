import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Axios from 'axios'
// import { Link } from 'react-router-dom'

class AdminPage extends Component {
    state = {
        data: [],
        modal: false,
        selectedId: null
    }
    toggle = this.toggle.bind(this);
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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

    editData = (id) => {
        console.log(id)
        this.setState({ selectedId: id })
        console.log(this.state.selectedId)
    }

    renderData = () => {
        return this.state.data.map((val, index) => {
            if (this.state.selectedId === val.id) {//ketika isi dari seleectedId = val.id
                return (
                    <tr key={val.id}>
                        <td >{index + 1}</td>
                        <td ><input type="text" className="form-control" placeholder="Input Image" ref='imageEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Name" ref='nameEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Genre" ref='genreEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Duration" ref='durationEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Director" ref='directorEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Casts" ref='castsEdit' /></td>
                        <td ><input type="text" className="form-control" placeholder="Input Synopsis" ref='synopsisEdit' /></td>
                        {/* <td ><input type="number" className="form-control" id="harga" placeholder="Input Price" ref='hargaEdit' /></td> */}
                        <td ><Button size="sm" onClick={() => this.yesEdit(val.id)}>Yes</Button>
                            &nbsp;
                        <Button size="sm" onClick={this.noEdit}>No</Button></td>
                    </tr>
                )
            }
            else {
                return (
                    <tr key={val.id}>
                        <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}><img src={val.image} alt='imagePoster' style={{ width: 100, verticalAlign: 'middle' }}></img></td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.name}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}> {val.genre.map((gen, index) =>
                            // <div key={val.id}>
                            <Button size="sm" outline color="secondary" key={index}>{gen}</Button>
                            // </div>
                        )}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.duration} Minute</td>
                        <td id={val.id} style={{ verticalAlign: 'middle', maxWidth: '1px' }}>{val.director}</td>
                        <td id={val.id} style={{ verticalAlign: 'middle' }}>{val.casts.join(', ')}</td>
                        <td id={val.id} style={{ whiteSpace: 'nowrap', textOverflow: 'elipsis', overflow: 'hidden', maxWidth: '3px', verticalAlign: 'middle' }}>{val.synopsis}
                        </td>

                        <td id={val.id} style={{ verticalAlign: 'middle' }}><button className="btn btn-success btn-sm" onClick={() => this.editData(val.id)}>Edit</button>
                            &nbsp;
                        <button className="btn btn-danger btn-sm" onClick={() => this.deleteData(val.id)}>Delete</button></td>
                        {/* Jika memanggil function dengan parameter butuh callback '()=>' */}
                    </tr>
                )
            }
        })
    }

    yesEdit = (id) => {
        var nameEdit = this.refs.nameEdit.value
        var genreEdit = this.refs.genreEdit.value
        var durationEdit = this.refs.durationEdit.value
        var directorEdit = this.refs.directorEdit.value
        var castsEdit = this.refs.castsEdit.value
        var imageEdit = this.refs.imageEdit.value
        var synopsisEdit = this.refs.synopsisEdit.value
        if (nameEdit === '' || genreEdit === '' || durationEdit === '' || directorEdit === '' || castsEdit === '' || imageEdit === '' || synopsisEdit === '') {
            alert('Complete Your Changes')
        }
        else {
            Axios.put(`http://localhost:2000/movies/${id}`, {
                name: nameEdit,
                genre: genreEdit,
                director: directorEdit,
                duration: durationEdit,
                synopsis: synopsisEdit,
                casts: castsEdit,
                image: imageEdit
            })
                .then((res) => {
                    console.log(res.data)
                    Axios.get(`http://localhost:2000/movies`)//update data
                        .then((res) => {
                            this.setState({ data: res.data, selectedId: null })
                            // this.setState({ selectedId: null })
                        })
                })
        }
    }
    noEdit = () => {
        this.setState({ selectedId: null })
        Axios.get('http://localhost:2000/movies')//update data
    }
    submitData = () => {
        var nameNew = this.refs.nameFilm.value
        var genreNew = this.refs.genreFilm.value
        var durationNew = this.refs.durationFilm.value
        var directorNew = this.refs.directorFilm.value
        var castsNew = this.refs.castsFilm.value
        var imageNew = this.refs.imageFilm.value
        var synopsisNew = this.refs.synopsisFilm.value
        Axios.post('http://localhost:2000/movies', {
            name: nameNew,
            genre: genreNew.split(','),
            director: directorNew,
            duration: durationNew,
            synopsis: synopsisNew,
            casts: castsNew.split(','),
            image: imageNew
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/movies')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
                    .then((res) => {
                        this.setState({ data: res.data })//untuk mengubah isi state data
                        // this.refs.namaproduk.value = ''
                        // this.refs.gambarproduk.value = ''
                        // this.refs.hargaproduk.value = ''
                    })
                // this.componentDidMount()//update pages dengan panggil fungsi get cara 2
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteData = (id) => {
        Axios.delete(`http://localhost:2000/movies/${id}`)
            .then((res) => {
                const dataSelect = res.data;
                // console.log(dataSelect)
                this.setState({ dataSelect });
                console.log(dataSelect)
                Axios.get('http://localhost:2000/movies')//update pages dengan menambah fungsi dan mengkosongkan value pada variable penampung nilai
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
            <div style={{ marginBottom: '5%' }}>
                {/* <p className="h2">Market Cube Product</p> */}
                <table className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td style={{width:70}}>Image</td>
                            <td style={{width:150}}>Title</td>
                            <td style={{width:150}}>Genre</td>
                            <td style={{width:150}}>Duration</td>
                            <td style={{width:150}}>Director</td>
                            <td style={{width:150}}>Casts</td>
                            <td>Synopsis</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                        <tr>
                            <td>#</td>
                            <td ><input type="text" className="form-control" placeholder="Input Image" ref='imageFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Name" ref='nameFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Genre" ref='genreFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Duration" ref='durationFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Director" ref='directorFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Casts" ref='castsFilm' /></td>
                            <td ><input type="text" className="form-control" placeholder="Input Synopsis" ref='synopsisFilm' /></td>
                            <td><button type="submit" className="btn btn-primary sizeBt" onClick={this.submitData}>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminPage