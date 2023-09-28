'use client';

import Deck from './deck'
import RoomCreator from './room_creator';
import { BrowserRouter as Router, Routes, Route, NavLink }
    from 'react-router-dom';

export default function App() {
  return (
    <Router className='app'>
      <div className='topMenu'>
        <NavLink to="/" className='logo'>
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
          <Route exact path='/' element={
            <RoomCreator />
          } />
          <Route path='/swipe' element={
            <div>
              <div className='roomSwitch'>
                <button className='left active'>
                  <img src="/person.svg" style={{
                    marginTop: "4px",
                    height: "calc(100% - 8px)"
                  }}/>
                </button>
                <button className='right'>
                  <img src="/groups.svg" style={{
                    marginTop: "3px",
                    height: "calc(100% - 10px)"
                  }}/>
                </button>
              </div>
              <Deck />
            </div>
          } />
          <Route path='/sign-in' element={
            <div style={{fontSize: "40px", textAlign: "center", marginTop: "100px"}}>Nothing here yet :(</div>
          } />
      </Routes>
    </Router>
  )
}
