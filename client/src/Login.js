import React from 'react'
import {withUser} from './Context/UserProvider'



const Login = (props) => {
    
        return(
            <div className = 'mainLogin'>
                <h1 className = 'mainH1'>write something</h1>
                <div className = 'login'>
                    {props.toggle ?
                            <div className = 'login2'>
                                <form  onSubmit = {props.handleLogin} className='loginForm'>
                                    <h4>Log in:</h4>
                                    <input
                                        className = "login1"
                                        type ='text'
                                        name ='username'
                                        placeholder  ='Username:'
                                        value = {props.username}
                                        onChange= {props.handleChange}
                                    />

                                    <input
                                        className = "login1"
                                        type ='text'
                                        name ='password'
                                        placeholder ='Password:'
                                        value = {props.password}
                                        onChange = {props.handleChange}
                                    />
                                    <button className = 'loginButton'>Log in</button>
                                </form>
                                <h4>Don't have an account?</h4>
                                <button className ='loginButton' onClick = {props.editToggler}>Sign up</button>
                            </div>
                            
                            
                    :
                    
                    <div className = 'logIn'>
                        <form onSubmit={props.handleSignup} className='signUp'>
                            <h4>Sign Up:</h4>
                            
                            <input
                                className = "login1"
                                type='text'
                                name='username'
                                placeholder ='enter a username:'
                                value ={props.username}
                                onChange ={props.handleChange}
                            />

                            <input
                                className = "login1"
                                type ='text'
                                name ='password'
                                placeholder ='enter password:'
                                value = {props.password}
                                onChange = {props.handleChange}
                            />

                            <input
                                className = "login1"
                                type ='text'
                                name ='password2'
                                placeholder ='repeat password:'
                                value = {props.password2}
                                onChange = {props.handleChange}
                            />
                            <button className = 'loginButton'>Sign up</button>
                        </form> 
                            <button className ='loginButton' onClick = {props.editToggler}>Return</button>
                    </div>            
                    }
                </div>
           
        </div> 
        )
    
}



export default withUser(Login)

