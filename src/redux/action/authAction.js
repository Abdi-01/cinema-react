// import Axios from "axios"

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

// export const login = (username, password) => {//satu fungsi menjalankan dua reducer yang berbeda
//     // let { username, password } = data
//     return (dispatch) => {
//         Axios.get(` http://localhost:2000/users?username=${username}&password=${password}`)
//             .then((res) => {
//                 dispatch({
//                     type: 'LOGIN', //reducer 1
//                     payload: res.data[0]
//                 })
//                 dispatch({ //reducer 2
//                     type: 'CONTOH'
//                 })
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 dispatch({
//                     type: 'LOGOUT',
//                 })
//             }         
//             )
//     }
// }

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}