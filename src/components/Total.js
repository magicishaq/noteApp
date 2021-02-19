import React from 'react' 
//displays the total

const Total = ({notes}) => {
    return (
        <pre>
            Total number of Notes: 
            <strong>
                {notes.length}
            </strong> 
           <p> </p>  
            Number of important : <strong>{notes.filter(elm => elm.important === true).length} </strong>
        </pre>
    )
}

export default Total