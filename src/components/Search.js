import axios from 'axios'
import React, {useState, useEffect} from 'react'


const Search = () => {
const [results, setResults] = useState([])
const [searched, setSearched] = useState([])
const hook = () => {
    const serverUrl = 'http://localhost:3001/notes'
    const promise = axios.get(serverUrl)
    promise.then(response => setResults(response.data))
}
const filterBar = (event) => {
 const searchResults = results.filter(elm => elm.content.toLowerCase().includes(event.target.value.toLowerCase()) && event.target.value !== "")
 setSearched(searchResults)
}
useEffect(hook, [])
return (
<div>
    <form>
    <input onChange={filterBar} placeholder="search for note" />
    </form>
    <ul>
    
    {searched.map((elm, i) => {
        return (
            <li key={i}> {elm.content}</li>
        ) 
    })}
    </ul>
</div>
)
}

export default Search