'use client';

import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import ExpandableDescription from './expandable_description';

// import dynamic from "next/dynamic"
// const TinderCard = dynamic(() => import('react-tinder-card'), {
//   ssr: false
// });

const db = [
  {
    name: 'Breaded Pan-Fried Salmon',
    url: ['/img/salmon.jpg'],
    description: "These breaded pan-fried salmon fillets are best served with steamed rice and spring mix salad, or broccoli florets and mashed potatoes, or on a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel venenatis mi. Aenean tempor, tortor et dapibus lacinia, turpis nisi eleifend sapien, non maximus eros eros id ligula. Duis sodales mattis nisl eu posuere. Sed consectetur eros et diam mattis, ac interdum dui pharetra. Aliquam erat volutpat. Morbi in bibendum sapien. Nulla vel elit gravida, pulvinar erat a, efficitur metus. Nunc sed risus metus. Mauris ac posuere urna. Etiam laoreet lectus vitae bibendum ultricies. Ut gravida non massa nec consectetur. Quisque luctus, arcu eu congue rutrum, velit nulla euismod orci, ut hendrerit leo tortor id elit. Aenean sit amet nulla non nisl condimentum ornare. Etiam laoreet dui non nibh posuere porttitor. Quisque sit amet sapien pellentesque, laoreet sapien sit amet, ultricies nunc."
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
      {db.length > 0 &&
      <div className='cardContainer'>
        {db.map((item, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={item.name}
            onSwipe={(dir) => swiped(dir, item.name, index)}
            onCardLeftScreen={() => outOfFrame(item.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + item.url[0] + ')' }}
              className='card'
            >
              <div className='cardGradient'>
                {item.url.length > 1 && <div className='grid'>{
                  Array.from(Array(item.url.length).keys()).map((i) =>
                    <div key={i} className={'stripe' + (i == 0 ? ' active' : '')}/>
                  )
                }</div>}
                <ExpandableDescription name={item.name} description={item.description} />
              </div>
            </div>
          </TinderCard>
        ))}
      </div>}
      <div className='buttons flexContainer'>
        <button
          className='big'
          style={{ backgroundColor: !canSwipe && 'var(--button-disabled-color)' }}
          onClick={() => swipe('left')}
        >
          <img src="/close.svg" style={{
            margin: "8px",
            marginTop: "12px",
            width: "calc(100% - 16px)"
          }} />
        </button>
        <button
          className='small'
          style={{ backgroundColor: !canGoBack && 'var(--button-disabled-color)' }}
          onClick={() => goBack()}>
          <img src="/undo.svg" style={{
            margin: "10px",
            width: "calc(100% - 20px)"
          }} />
        </button>
        <button
          className='big'
          style={{ backgroundColor: !canSwipe && 'var(--button-disabled-color)' }}
          onClick={() => swipe('right')}
        >
          <img src="/heart.svg" style={{
            margin: "6px",
            marginTop: "12px",
            width: "calc(100% - 12px)"
          }}/>
        </button>
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