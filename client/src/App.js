import React, { Component } from 'react'
import Login from './Login'
import {withUser} from './UserProvider'
import Home from './Home'



class App extends Component {
    render(props){
        return (
            <div className = "appjs">
            {this.props.token ?
                <Home/>
                :
                <Login/>
            }
            </div>
        )
    }
}

export default  withUser(App)
