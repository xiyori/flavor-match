'use client';

import RoomCreator from './room_creator';
import { BrowserRouter as Router, Routes, Route, NavLink }
    from 'react-router-dom';
import DeckManager from './deck_manager';

export default function App() {
  return (
    <Router className='app'>
      <div className='topMenu'>
        <NavLink to="/init" className='logo'>
          <img src="/logo.svg"/>
          <div>FlavorMatch</div>
        </NavLink>
        <div className='info'>
          <a href="https://flavormatch.tilda.ws" className="navLink">
            About us
          </a>
          <a href="https://flavormatch.tilda.ws/#rec645531585" className="navLink">
            Contacts
          </a>
        </div>
        <NavLink className='signIn' to="/sign-in">
          Sign in/up
        </NavLink>
      </div>
      <Routes>
          <Route exact path='/init' element={
            <RoomCreator />
          } />
          <Route path='/' element={
            <DeckManager nUsers={3} />
          } />
          <Route path='/sign-in' element={
            <div style={{fontSize: "40px", textAlign: "center", marginTop: "100px"}}>Nothing here yet :(</div>
          } />
      </Routes>
    </Router>
  )
}
