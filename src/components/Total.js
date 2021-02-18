import React from 'react' 
//displays the total

const Total = ({notes}) => {
    return (
        <pre>
            Total number of Notes: 
            <strong>
                {notes.length}
            </strong> 
        </pre>
    )
}

export default Total