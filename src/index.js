import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'


const notes = [{
  id: 1, 
  content: 'Hello world', 
  important: true
},
{
  id: 2, 
  content: 'Cheesy chips', 
  important: true
}, 
{
  id: 3, 
  content: 'Minecraft is great', 
  important: true
}
]


ReactDOM.render(<App notes={notes} />, document.getElementById('root'))