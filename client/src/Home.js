import React, { Component } from 'react'
import {withUser} from './Context/UserProvider'
import Data from './Data'




class Home extends Component {
  
    render(props){
        
        return (
            <div className = "home">
                <h1>write something</h1>
                <Data/>
                <p className = 'deleteAcount' onClick = {() => this.props.handleErase(this.props.user._id)}>delete account</p>
            </div>
        )
    }
}

export default  withUser(Home)
