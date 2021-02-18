import React , {useState} from 'react'
import Note from './Note'
import Total from './Total' 
//Main bulk of the app
const App = (props) => {
  //lets users add new notes
  const [notes, setNotes ] = useState(props.notes) 
  //storing user submitted notes
  const [newNote, setNewNote] = useState('...please write your new Note')

  //adding a new note
  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      id: notes.length + 1, 
      content: newNote, 
      date: new Date().toISOString(),
      important: Math.random() < 0.5, 
    }
    //adds the newNote to the notes states
    console.log(notes.concat(newNoteObject))
    setNotes(notes.concat(newNoteObject))
    setNewNote('') //input field is now blank  
  }
  //syncs the changes made to the input to the apps state
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
    return(
      <div>
        <h1> Notes</h1>
        <ul>
          {notes.map((note, i) => {
            return (
              <Note key={i} note={note} />
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
