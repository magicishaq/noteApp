import React from 'react'
//list item for displaying the note
const Note = ({note, toggleImportance, deleteNote}) => {
    const label = note.important
        ? 'Unstar'
        : 'Star'
    const deleteLabel = 'Delete'
    return (
        <li>{note.content}
            <button onClick={toggleImportance}>
                {label}
            </button>
            <button onClick={deleteNote}>
                {deleteLabel}
            </button>
        </li>
    )
}

export default Note