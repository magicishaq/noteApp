import React , {useState} from 'react'
import Note from './Note'
import Total from './Total' 
//Main bulk of the app
const App = ({notes}) => {
  //lets users add new notes
  const [note, setNotes ] = useState(notes) 

  //adding a new note
  const addNote = (event) => {
    event.preventDefault()
    alert('button has been clicked' + event.target)
  }
    return(
      <div>
        <h1> Notes</h1>
        <ul>
          {notes.map(note => {
            return (
              <Note  note={note} />
            )
          })}
          </ul>
          <form onSubmit={addNote}>
            <input />
            <button type ="submit">Save</button> 
          </form>
          <Total notes={notes} />
      </div>
    )
    }

    export default App
