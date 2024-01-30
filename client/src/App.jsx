import './App.css'
import SignUp from './SignUp'
import Header from './component/Header'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/singin" element = {<SignIn/>}/>
        <Route path="/signup" element = {<SignUp/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/profile" element = {<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
