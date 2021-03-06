import React, {Component} from 'react'
import axios from 'axios'



const Context = React.createContext()


class NotesProvider extends Component {
    constructor(){
        super()
        this.state = {
            notes:[],
            newNotes: '',
            edit:''
        }
    }

    
    saveNotes = (id) => {
        axios.post(`/notes`, {notes: this.state.newNotes,  userID: id, date: new Date()}).then(res => {
            this.getNotes(id)
        })
        this.setState({
            newNotes:'',
        })
    }

    getNotes = (id) => {
            axios.get(`/notes/${id}`).then(res => { // careful with the endpoint...
            this.setState(prevState => {
                return {
                    notes: res.data
                }
            })
        })
    }
    
    handleChange2 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleToggler = (id, notes) => {
        let arr = [...this.state.notes].map(item => item._id === id ? {...item , toggle:' on'} : {...item , toggle: 'off'})
        console.log(arr)
        this.setState({
            notes: arr,
            edit: notes  
        // I set edit to the item's notes so the input field displays the notes you want to edit!
        })
    }

    handleTogglerReset = () => {
        let arr = [...this.state.notes].map(item => {return {...item, toggle: 'off'}})
        this.setState({
            notes: arr
        })
    }
    
    handleEdit = (id, notes) => {
        if(notes === this.state.edit || !this.state.edit){ // it only edits if there is a change, you can't edit to an empty input
            this.handleTogglerReset() 
        }else{
            const updates = {
                notes: this.state.edit,
                editTime: new Date() 
            }
            this.handleEditSubmit(id, updates)
        }
    }
    
    handleEditSubmit = (id, updates) => {
        axios.put(`/notes/${id}`, updates).then(response => {
            const updatedNotes = response.data
            this.setState(prevState => {
                return {
                    notes: prevState.notes.map(item => item._id === id ? updatedNotes : item )
                }
            })
        })
    }
    
    handleDelete = (id) => {
        axios.delete(`/notes/${id}`).then(res => {
                this.setState(prevState=>({   //I use prevState so the requested note gets deleted without refreshing
                    notes: prevState.notes.filter(item => item._id !== id)
                                            // filters the bookings array in state, updates state with a new array with all the items in the array which does NOT have the item._id ....
            }))
        })
    }

    deleteAll = (id) => {
        if(this.state.notes.length === 0){
            alert("you don't have any saved notes")
        }else{
            var answer = window.confirm("Are you sure you want to delete all your saved notes?")
            if(answer){
                axios.delete(`notes/delete/${id}`).then(response => {
                alert(response.data)
                })
                this.setState({
                    notes: []
                })
            }    
        }
    }   
    
    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    saveNotes: this.saveNotes,
                    handleChange2: this.handleChange2,
                    getNotes: this.getNotes,
                    handleToggler: this.handleToggler,
                    handleEdit: this.handleEdit,
                    handleDelete: this.handleDelete,
                    handleTogglerReset: this.handleTogglerReset,
                    deleteAll: this.deleteAll
                }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default NotesProvider


export const withData= C => props => (
    <Context.Consumer>
        { value => <C {...props} {...value}/> }
    </Context.Consumer>
)
