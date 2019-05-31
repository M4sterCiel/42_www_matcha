import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import App from './App'
import Login from './Login'
 
export default function MainRouter () {
    return (
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
            </div>
        </Router>
    )
}