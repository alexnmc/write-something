import React ,{Component} from 'react'
import {withUser} from './Context/UserProvider'
import {withData} from './Context/DataProvider'
import moment from 'moment'



class Data extends Component{
    
   
   componentDidMount(){
      this.props.getNotes(this.props.user._id)
    }

   
   handleSubmit = (e) => {
    e.preventDefault()
    this.props.saveNotes(this.props.user._id)
   }

   
   render(props){ 
    
     let notes = this.props.notes.map(item =>{
         return(
            <div className = 'alltext'>
            { item.toggle?
                <div key = {item._id} className = 'showNotes'>
                    <div className = 'space'>
                        <h3>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</h3> 
                        <p className = 'youwrote'>you wrote:</p>         
                        <h2 className = 'h2'>{item.notes}</h2> 
                    </div> 
                    <div className = 'buttonWrap'>
                        <button className = 'deleteButton' type="button" onClick = {() => this.props.handleDelete(item._id)}>Delete</button>  
                        <button className = 'deleteButton' type="button" onClick= {() => this.props.handleToggler(item._id, item.notes)}>Edit</button>
                    </div>
                </div>
                :
                <div className = 'showNotes'>
                    <textarea
                    className = "edit"
                    type='text'
                    name='edit'
                    value={this.props.edit}
                    onChange={this.props.handleChange2}
                    >
                    </textarea>
                    <div className = 'buttonWrap'>
                        <button className = "editButton" type="button" onClick = {() => this.props.handleEdit(item._id)}>Save</button>
                        <button className = "editButton" type="button" onClick = {this.props.handleTogglerReset}>Exit</button>
                    </div>
                </div>
            }
            </div>
         )
     })
    
    
    return(
        <div className = 'data'>
            <h2 className = 'hello'>{`Hello ${this.props.user.username}`}<br></br>{`you have ${this.props.notes.length} ${this.props.notes.length === 1 ? 'note' : 'notes'}`}</h2>
            <button className = 'deleteAll' onClick = {() => this.props.deleteAll(this.props.user._id)}>Delete all</button>
            <form onSubmit = {this.handleSubmit}>
                <textarea rows = '20'
                className = "notes"
                type ='text'
                name ='newNotes'
                placeholder ='write something'
                value = {this.props.newNotes}
                onChange= {this.props.handleChange2}>
                </textarea>
                <button className = 'saveButton'>Save</button>
            </form>
            <h1>write something</h1>
            <button  className = 'logout' onClick = {this.props.logout}>Log out</button>
            <div className = 'alltext2'>
                {this.props.notes.length > 0?
                  notes
                  :
                  <p className = 'noNotes'>no entries</p>
                }
            </div>
        </div>
    )
}
}


export default  withUser(withData(Data))