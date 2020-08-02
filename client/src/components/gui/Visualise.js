import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import $ from "jquery";

import { setNameToVisualise } from '../../actions/visualise'
import { createTheAnimationPath } from '../../utility/trie'
import { setAlert, flushAllAlerts } from '../../actions/alert'

import { NO_LETTER, WORD_EXISTS } from '../../actions/types'

import '../../css/Visualise.css'

gsap.registerPlugin(DrawSVGPlugin, SplitText);

const Visualise = ({ nameToVisualise, setNameToVisualise, setAlert, flushAllAlerts, trie }) => {
  const [copyOfTheNameToVisualise, setCopyOfTheNameToVisualise] = useState('')
  const [animationPath, setAnimationPath] = useState([])
  const [timeline, setTimeline] = useState(undefined)
  const alphabet = ['-', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  
  const changeExplanationText = useCallback(
    text => {
      flushAllAlerts()
      setAlert(text)
    },
    [flushAllAlerts, setAlert],
  )

  useEffect(() => {
    if (nameToVisualise !== '') {
      $('#root').removeClass('padding-on')
      setTimeline(gsap.timeline())
      setCopyOfTheNameToVisualise((' ' + nameToVisualise).slice(1))
      setNameToVisualise('')
    }

    if (copyOfTheNameToVisualise !== '' && animationPath.length === 0) {
      console.log(`first: ${animationPath}`)
      setAnimationPath(createTheAnimationPath(trie, copyOfTheNameToVisualise))
      console.log(`second: ${animationPath}`)
    }
    
    console.log(`out: ${animationPath}`)
    if (animationPath.length !== 0) {
      console.log(`animation: ${animationPath}`)
      console.log(timeline)
      const width = $('.letter-wrapper').width()
      const unit = width / alphabet.length;
      
      changeExplanationText('Root Node')

      $(`.svg-line-bridge`).attr('width', width)
      $(`.letter-keys-frame`).attr('width', width)

      const translateYTo = -($(window).height() - $('.navbar').height()) / 2
      const translateYFrom = $('.visualise').height() + translateYTo
      
      // timeline.to('.visualise', {opacity: 1, duration: 0})
      console.log(`${translateYFrom} - ${translateYTo}`)
      timeline.fromTo(`.visualise`, {
        y: translateYFrom
      }, {
        y: translateYTo,
        ease: "none",
        duration: 4 * animationPath.length 
      }, "+=1")

      // timeline.from('.main-letter', {opacity: 0, duration: 0.8}, `-=${4 * animationPath.length}`)

      // for (let i = 0; i < animationPath.length; i += 1) {
      //   if (animationPath[i] === NO_LETTER) break

      //   const index1 = i === 0 ? 
      //     animationPath[i][2][1] === '_' ? 
      //       alphabet.indexOf(' ') 
      //       : 
      //       alphabet.indexOf(animationPath[i][2][1])
      //     :
      //     animationPath[i][2][0] === '_' ? 
      //       alphabet.indexOf(' ') 
      //       : 
      //       alphabet.indexOf(animationPath[i][2][0])
      //   const index2 = animationPath[i][2][1] === '_' ? 
      //     alphabet.indexOf(' ') 
      //     : 
      //     alphabet.indexOf(animationPath[i][2][1])
      //   const middlePoint = i === 0 ? 
      //     index1 * unit + unit / 2 
      //     : 
      //     index2 * unit + unit / 2
      //   const letterHalfWidth = $(`.letter-keys-${animationPath[i][2]} .letter-key-${animationPath[i][2][1]}`).width() / 2
      //   const offsetLeft = (width - $(`.letter-keys.letter-keys-${animationPath[i][2]}`).width()) / 2 + $(`.letter-keys-${animationPath[i][2]} .letter-key-${animationPath[i][2][1]}`)[0].offsetLeft
      //   const translateX = middlePoint - letterHalfWidth - offsetLeft

      //   if (i === 0) {
      //     $(`.vertical-line-1-${animationPath[i][2]}`).attr('d', `M ${width / 2} 5 L ${width / 2} 30`)
      //     $(`.diagonal-line-${animationPath[i][2]}`).attr('d', `M ${width / 2} 30 L ${index1 * unit + unit / 2} 82`)
      //     $(`.vertical-line-2-${animationPath[i][2]}`).attr('d', `M ${index1 * unit + unit / 2} 82 L ${index1 * unit + unit / 2} 112`)
      //   } else {
      //     $(`.vertical-line-1-${animationPath[i][2]}`).attr('d', `M ${index1 * unit + unit / 2} 5 L ${index1 * unit + unit / 2} 30`)
      //     $(`.diagonal-line-${animationPath[i][2]}`).attr('d', `M ${index1 * unit + unit / 2} 30 L ${index2 * unit + unit / 2} 82`)
      //     $(`.vertical-line-2-${animationPath[i][2]}`).attr('d', `M ${index2 * unit + unit / 2} 82 L ${index2 * unit + unit / 2} 112`)
      //   }
        
      //   timeline.from(`.vertical-line-1-${animationPath[i][2]}`, { 
      //     duration: 0.5, 
      //     drawSVG: "0% 0%", 
      //     onStart: () => changeExplanationText('Moving onto the new child note.') 
      //     }, 
      //   `-=${4 * (animationPath.length - i)}`)
      //   timeline.from(`.diagonal-line-${animationPath[i][2]}`, { duration: 1, drawSVG: "0% 0%", ease: 'none' }, `-=${4 * (animationPath.length - i) - 0.5}`)
      //   timeline.from(`.vertical-line-2-${animationPath[i][2]}`, { duration: 0.5, drawSVG: "0% 0%", ease: 'none' }, `-=${4 * (animationPath.length - i) - 1.5}`)
        
      //   const removeAwayFromTheScreenLength = Math.max($(window).width(), $(`.letter-keys-${animationPath[i][2]}`).width())

      //   timeline.fromTo(`.letter-keys-${animationPath[i][2]}`, {
      //     x: translateX < 0 ? -removeAwayFromTheScreenLength : removeAwayFromTheScreenLength,
      //     onStart: () => changeExplanationText('Searching the next character from the child notes.')
      //   }, {
      //     x: translateX,
      //     ease: "power2",
      //     duration: 0.8 
      //   }, `-=${4 * (animationPath.length - i) - 2}`)

      //   timeline.from(`.main-letter-frame-${animationPath[i][2]}`, {
      //     duration: 1,
      //     drawSVG: "50% 50%"            
      //   }, `-=${4 * (animationPath.length - i) - 2.8}`);

      //   timeline.to(`.letter-keys-${animationPath[i][2]} .letter-key-${animationPath[i][0] === ' ' ? '_' : animationPath[i][0]}`, { duration: 0.5, color:"#ff0004"}, `-=${4 * (animationPath.length - i)}`)
      // }

      const mySplitText = new SplitText(".result", {type: "words, chars"})
      
      timeline.from(mySplitText.chars, {
        duration: 1, 
        scale: 4, 
        autoAlpha: 0, 
        rotationX: -180, 
        transformOrigin:"100% 50%", 
        ease:"back", 
        stagger: 0.02,
        onStart: () => flushAllAlerts()
      }, "-=0.5")
    }
    return () => {
      if (timeline) timeline.kill()
      flushAllAlerts()
    }
  }, [nameToVisualise, setNameToVisualise, copyOfTheNameToVisualise, animationPath, trie, alphabet, changeExplanationText, flushAllAlerts, timeline])

  return (
    <div className="visualise">
      {animationPath.map((letter, index1) => {
        if (letter === NO_LETTER) {
          return (
            <div className="result"  key={`lw-${index1}`}>No more letters for that word!</div>
          )
        } else {
          return (
            <div className="letter-wrapper" key={`lw-${index1}`}>
              { index1 === 0  && <div className={`main-letter main-letter-${letter[2]}`} >Root Node</div>}
              <div className="svg-path">
                <svg className={`svg-line-bridge`} width="1008" height="112">
                  <path className={`vertical-line-1-${letter[2]}`} d="M 2 2 L 2 32" fill="none" stroke="#000000" />
                  <path className={`diagonal-line-${letter[2]}`} d="M 12 12 L 2 32" fill="none" stroke="#000000" />
                  <path className={`vertical-line-2-${letter[2]}`} d="M 22 22 L 2 32" fill="none" stroke="#000000" />
                </svg>
              </div>
              <div className={`letter-keys letter-keys-${letter[2]}`}>
                {letter[1].map((letterKey, index2) => {
                  return (<div className={`letter-key letter-key-${
                    letterKey === ' ' ? '_' : letterKey
                  }`} key={`lk-${index2}`}>
                    {(letterKey === letter[2][1] || letterKey === ' ') && 
                      <svg className={`main-letter-frame`} width="44" height="44">
                        <path className={`main-letter-frame-${letter[2]}`} d="M 22 42 L 7 42 L 2 37 L 2 7 L 7 2 L 37 2 L 42 7 L 42 37 L 37 42 L 22 42" fill="none" stroke="#000000" />
                      </svg>
                    }
                    {`"${letterKey}"`}
                  </div>)
                })}
              </div>
              { letter[3] === undefined ? '' : letter[3] === WORD_EXISTS ? 
                  <div className="result">Word exists in the trie structure</div>
                  :
                  <div className="result">All the letters exist in the trie structure but the word itself doesn't!</div>
              }
            </div>
          )
        }
      })}
    </div>
  )
}

Visualise.propTypes = {
  setNameToVisualise: PropTypes.func.isRequired,
  nameToVisualise: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
  flushAllAlerts: PropTypes.func.isRequired,
  trie: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  nameToVisualise: state.visualise.nameToVisualise,
  trie: state.user.trie
})

export default connect(mapStateToProps, { setNameToVisualise, setAlert, flushAllAlerts })(Visualise)
