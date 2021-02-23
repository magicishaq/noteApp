import React from 'react'
//list item for displaying the note
const Note = ({note, toggleImportance, deleteNote}) => {
    const label = note.important
        ? 'Unstar'
        : (<i className="fas fa-star"></i>)
    const deleteLabel = (<i className="fas fa-trash"></i>)
    const labelColor = note.important? 'starred' : '' 
    return (
        <div className={`noteapp-item innernote-container ${labelColor}`}>
          <div className="innernote-item content">
          {note.content}
          </div>
           <div className="innernote-item content-button">  
            <button onClick={toggleImportance}>
                {label}
            </button>
            <button onClick={deleteNote}>
                {deleteLabel}
            </button>
            </div>
        </div>
    )
}

export default Note