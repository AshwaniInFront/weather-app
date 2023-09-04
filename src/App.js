import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import './App.css';
import AddToFavourites from './components/AddToFavourites/AddToFavourites';

function App() {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userName, setUserName] = useState('');


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setUserName(user.displayName)
      }
      else {
        setUserName('')
      }
    })
  })


  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home name={userName} />} />
          <Route path='/addtofavourites' element={<AddToFavourites/>} />
        </Routes>
      </Router>
    </div>
  )

}

export default App;
