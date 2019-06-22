import React, { Component } from 'react'
import {withUser} from './UserProvider'
import Data from './Data'




class Home extends Component {
    render(props){
        return (
            <div className = "home">
               <button  className = 'logout' onClick = {this.props.logout}>Log out</button>
               <Data/>
            </div>
        )
    }
}

export default  withUser(Home)
