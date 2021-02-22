import React , {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './Note'
import Total from './Total'
//Main bulk of the app
const App = () => {
  const [searchTerm, setSearchTerm] = useState("") //for searching 
  //lets users add new notes
  const [notes, setNotes ] = useState([]) //blank state 
  //storing user submitted notes
  const [newNote, setNewNote] = useState('...please write your new Note')
  //keeps track which notes to display
  const [showAll, setShowAll] = useState(true)
  
  //function to star notes
const toggleImportanceOf = (id) => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(elm => elm.id === id)
  const alteredNote = {...note, important: !note.important} 
  
  axios.put(url, alteredNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
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
  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      id: notes.length + 1, 
      content: newNote, 
      date: new Date().toISOString(),
      important: Math.random() < 0.5, 
    }
    //adds the newNote to the notes states
    setNotes(notes.concat(newNoteObject))
    setNewNote('') //input field is now blank  

    //posts to the server
    axios.post('http://localhost:3001/notes', newNoteObject)
    .then(response => {
      console.log('response')
    }) 
  }
  //syncs the changes made to the input to the apps state
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  // if showAll is true, will show all notes
  //list of objects, either containing all notes or the important notes
  const notesToShow = showAll ? [...notes] : notes.filter(note => note.important === true)
  const filteredNotes = searchTerm.length > 0 ?  notesToShow.filter(elm => elm.content.toLowerCase().includes(searchTerm)) : [...notesToShow]
  
    return(
      <div>
        <h1> Notes</h1>
        <div>
          <label>Search Note </label> <input onChange={searchNote} /> 
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll? 'Starred' : 'All' }
          </button>
        </div>
        <ul>
          {filteredNotes.map((note, i) => {
            return (
              <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
            )
          })}
          </ul>
          <form onSubmit={addNote}>
            <input value={newNote}
            onChange={handleNoteChange} />
            <button type="submit">Save</button> 
          </form>
          <Total notes={notes} />
      </div>
    )
    }

    export default App
