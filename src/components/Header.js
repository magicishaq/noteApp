import React from 'react'
//Heading of the app

const Header = ({title}) => {
    return (
        <div className="note-item">
        <h1>
                {title}
        </h1>
        </div> 
    )
} 

export default Header