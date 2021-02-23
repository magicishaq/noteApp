import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './Note'
import Total from './Total'
import Header from './Header'
import '../index.css'
import '@fortawesome/fontawesome-free'
//Main bulk of the app
const App = () => {
    const [searchTerm,
        setSearchTerm] = useState("") //for searching
    //lets users add new notes
    const [notes,
        setNotes] = useState([]) //blank state
    //storing user submitted notes
    const [newNote,
        setNewNote] = useState('...please write your new Note')
    //keeps track which notes to display
    const [showAll,
        setShowAll] = useState(true)

    //function to star notes
    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(elm => elm.id === id)
        const alteredNote = {
            ...note,
            important: !note.important
        }
        axios
            .put(url, alteredNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id
                    ? note
                    : response.data))
            })
            .catch(error => {
                console.log('didnt change the importance')
                console.log(error)
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const newNoteObject = {
            content: newNote,
            date: new Date().toISOString()
            //important: Math.random() < 0.5
        }

        //posts to the server
        axios
            .post('http://localhost:3001/notes', newNoteObject)
            .then(response => {
                hook()//refreshs the page
            })
            .catch(error => console.log('error'))
    }

    const deleteNote = (id) => {
      console.log(id)
        const url = `http://localhost:3001/notes/${id}`
        const notesWithoutDel = notes.filter(elm => elm.id !== id)
        const confirmMessage = window.confirm(`Delete: " ${notes.find(elm => elm.id === id).content}"`)
        if (confirmMessage) {
            axios
                .delete(url)
                .then(response => {
                    setNotes(notesWithoutDel)
                })
                .catch(error => {
                    console.log('did not delete')
                })
        } else {
            return
        }
    }
    //when reloading the state
    const hook = () => {
        const serverUrl = 'http://localhost:3001/notes'
        console.log('effect')
        const promise = axios.get(serverUrl)
        promise.then(response => setNotes(response.data))
    }
    //load data from the server
    useEffect(hook, [])
    const searchNote = (event) => {
        setSearchTerm(event.target.value.toLowerCase())
    }

    //syncs the changes made to the input to the apps state
    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }
    // if showAll is true, will show all notes list of objects, either containing
    // all notes or the important notes
    const notesToShow = showAll
        ? [...notes]
        : notes.filter(note => note.important === true)
    const filteredNotes = searchTerm.length > 0
        ? notesToShow.filter(elm => elm.content.toLowerCase().includes(searchTerm))
        : [...notesToShow]

    return (
        <div className="note-container">
            <Header title={'Notes'}/> 
            <div className="note-item">
                <input id="searchbar" onChange={searchNote}/>
                <label htmlFor="searchbar"><i className="fas fa-search search-label"></i>
                </label>
            </div>
            <div className="noteapp-container">
                {filteredNotes.map((note, i) => {
                    return (<Note
                        key={i}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                        deleteNote={() => deleteNote(note.id)}/>)
                })}
            </div>
            <form className="note-item" onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit"><i className="fas fa-save"></i></button>
            </form>
            <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll
                        ? 'Starred'
                        : 'All'}
                </button>
            <Total notes={notes}/>
        </div>
    )
}

export default App
