import Deck from './deck'

export default function Home() {
  return (
    <div className='app'>
      <div className='topMenu'>
        <div className='logo'>
          <img src="/logo.svg"/>
          <div>FlavorMatch</div>
        </div>
        <div className='info'>
          <a href="/">About us</a>
          <a href="/">Contacts</a>
        </div>
        <button className='signIn'>
          Sign in
        </button>
      </div>
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
  )
}
