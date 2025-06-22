// imports libraries(modules)
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
// imports components
import { getApps } from './utils/helper'


// creates and exports main App component
function App() {

  // gets the app based on the subdomain and sets it as CurrentApp
  const CurrentApp = getApps();

  return (
    <Router>
      <CurrentApp />
    </Router>
  )
}

export default App