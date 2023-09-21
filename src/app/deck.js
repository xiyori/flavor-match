'use client';

import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

// import dynamic from "next/dynamic"
// const TinderCard = dynamic(() => import('react-tinder-card'), {
//   ssr: false
// });

const db = [
  {
    name: 'Breaded Pan-Fried Salmon',
    url: ['/img/salmon.jpg'],
    description: "These breaded pan-fried salmon fillets are best served with steamed rice and spring mix salad, or broccoli florets and mashed potatoes, or on a"
  },
  {
    name: 'Fried Chicken Rice',
    url: ['/img/chicken.jpg'],
    description: "Chicken Fried Rice that's made with brown rice and lean chicken breast instead of white rice and ham. Hearty and so satisfying."
  },
  {
    name: 'Grilled Steak',
    url: ['/img/steak.jpg'],
    description: "Perfect Grilled Steak with Herb Butter features a homemade steak seasoning and buttery herb finish. This easy sizzling grilled steak recipe is "
  },
  {
    name: 'Baked Dorado with Vegetables',
    url: ['/img/dorado.jpg'],
    description: "If you're looking for a side dish for this baked fish dish, a boiled potato salad would be lovely. You can dress your potato salad with extra virgin olive "
  },
  {
    name: 'Pizza Margherita',
    url: ['/img/margherita.avif'],
    description: "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil."
  }
]

function Deck () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url[0] + ')' }}
              className='card'
            >
              <div className='cardGradient'>
                {character.url.length > 1 && <div className='grid'>{
                  Array.from(Array(character.url.length).keys()).map((i) => 
                    <div key={i} className={'stripe' + (i == 0 ? ' active' : '')}/>
                  )
                }</div>}
                <div className='bottomContent'>
                  <div className='flexContainer'>
                    <h3>{character.name}</h3>
                    <div 
                      style={{ backgroundImage: 'url("/info.svg")' }}
                      className='infoSymbol'
                    />
                  </div>
                  <p>{character.description}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Deck