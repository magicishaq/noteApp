import React from 'react' 
//list item for displaying the note
const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'Unstar' : 'Star'
    return (
      <li>{note.content} 
      <button onClick={toggleImportance}> {label} </button>
      </li> 
    )
    }

    export default Note