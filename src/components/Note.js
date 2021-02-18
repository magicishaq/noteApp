import React from 'react' 
//list item for displaying the note
const Note = ({note}) => {
    return (
      <li key={note.id} >{note.content} </li> 
    )
    }

    export default Note