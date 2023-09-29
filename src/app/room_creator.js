'use client';

import React, { useState } from 'react';
import { NavLink }
    from 'react-router-dom';

function RoomCreator () {
  const [mode, setMode] = useState("init")
  const [roomNumber, setRoomNumber] = useState("")
  const [username, setUsername] = useState("")

  const createRoom = () => {
    // do something
  }

  const joinRoom = () => {
    // use 'roomNumber' and 'username' to call backend
  }

  const onCreateRoomClicked = () => {
    if (mode === "init") {
      setMode("create")
      createRoom()
    }
  }

  const onJoinRoomClicked = () => {
    if (mode === "init") {
      setMode("join")
    }
  }

  const goBack = () => {
    setMode("init")
  }

  return (
    <div className={"roomUtils" + (mode !== "init" ? " active" : "")}>
      <div className="roomButtons">
        <p>Save time, swipe!</p>
        <button onClick={onCreateRoomClicked}>Create Room</button>
        <button onClick={onJoinRoomClicked}>Join Room</button>
      </div>
      <div className='curtain' onClick={goBack}/>
      {mode === "join" ? (
        <span className="popup">
          <img src="/logo_white.svg"/>
          <div className='title'>
            Find your room
          </div>
          <div className='field'>
            <p>Room id</p>
            <input value={roomNumber} onInput={e => setRoomNumber(e.target.value.replace(/\D/g, ""))}/>
          </div>
          <div className='field'>
          <p>Your name</p>
            <input value={username} onInput={e => setUsername(e.target.value)}/>
          </div>
          <NavLink to='/' className='joinButton' onClick={joinRoom}>
            Join
          </NavLink>
        </span>
      ) : (mode === "create") && (
        <span className="popup">
          <img src="/logo_white.svg"/>
          <div className='title'>
            Room created!
          </div>
          Share QR or invite link with your friends
          <img src="/qr.jpg" className='qr'/>
          <div className='inviteLink'>
            <input value="https://flavormatch.tilda.ws/swipe/69420"/>
            <button
              onClick={() => {navigator.clipboard.writeText("https://flavormatch.tilda.ws/swipe/69420")}}
            >
              <img src="/copy.png" style={{
                margin: "5px 0 0 -2px",
                width: "calc(100% - 12px)"
              }} />
            </button>
          </div>
          <NavLink to='/' className='joinButton' onClick={joinRoom}>
            Join
          </NavLink>
        </span>
      )}
    </div>
  )
}

export default RoomCreator