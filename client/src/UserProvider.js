import React, {Component} from 'react'
import axios from 'axios'



const Context = React.createContext()


class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            password2: '',
            toggle: true,
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
        }
    }

    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle,  //toggle from login to signin
                username: '',
                password: '',
                password2: ''
            }
        })
    }

    
    signup = userInfo => {
        this.state.password === this.state.password2 ?
            axios.post('/user/signup', userInfo).then(res => {
                const { token, user } = res.data
                localStorage.setItem("user", JSON.stringify(user))     //stores the token and the user  in local storage in case of page refresh...
                localStorage.setItem("token", token)
                this.setState({user: user, token })
            })
            .catch(err => alert(err.response.data.errMsg))
        :
            alert("passwords doesn't match")
    }

    
    login = userInfo => {
        axios.post('/user/login', userInfo).then(res => {
            const { token, user } = res.data // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user: user, token})
        })
        .catch(err => alert(err.response.data.errMsg))
    }
   
   
    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        this.login(newUser) // calling the login function
        this.setState({
            username: '',
            password: '',
            password2: ''
        })
    }

   
    handleSignup = (e) => {
        e.preventDefault()
            const newUser = {
                username: this.state.username,
                password: this.state.password
            }
            this.signup(newUser)
            this.setState({
                username: '',
                password: '',
                password2: ''
            })
    }

    
    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    
    handleDelete2 = (id) => {
        axios.delete(`/user/${id}`).then(res => {
            alert(res.data)
        })
    }
    
    
    logout = () => {
        var answer = window.confirm("Are you sure you want to log out?")
            if(answer){
                this.setState({
                    user:'',   // we logout by removing the token from state and local storage
                    token: '',
                    toggle: true
                })
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }

    logout2 = () => {
        this.setState({
            user:'',   // logout function for delete account
            token: '',
            toggle: true
        })
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }


    
    deleteAll = (id) => {
        axios.delete(`notes/delete/${id}`).then(response => {
            alert(response.data)
        })
    }


    handleErase = (id) => {
        var answer = window.confirm("This will permanently delete you account, are you sure you want to proceed?")
            if(answer){
                this.handleDelete2(id)
                this.logout2()
                this.deleteAll(id)
            }
    }

    
    render() {
        return (
            <Context.Provider
                value={{
                   ...this.state,
                   editToggler : this.editToggler,
                   signup : this.signup,
                   login : this.login,
                   handleLogin: this.handleLogin,
                   handleSignup: this.handleSignup,
                   handleChange:this.handleChange,
                   handleDelete2: this.handleDelete2,
                   logout: this.logout,
                   handleErase: this.handleErase,
                }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default UserProvider


export const withUser= C => props => (
    <Context.Consumer>
        {value => <C {...props} {...value}/> }
    </Context.Consumer>
)
