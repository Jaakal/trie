import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from "jquery";
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

import { setTrie } from '../../actions/user'
import { setNameToVisualise } from '../../actions/visualise'
import { createTrie, getFirstFiveWords } from '../../utility/trie'

import '../../css/SearchWord.css'

 // Register plugins for GSAP
 gsap.registerPlugin(DrawSVGPlugin, SplitText);

const SearchWord = ({ setTrie, setNameToVisualise, users: { users, trie, loading }, nameToVisualise }) => {
  const [loaded, setLoaded] = useState(false)
  const [splitText, setSplitText] = useState(undefined)
  const [instructionLine1, setInstructionLine1] = useState(undefined)
  const [instructionLine2, setInstructionLine2] = useState(undefined)
  const [instructionLine3, setInstructionLine3] = useState(undefined)
  const [formData, setFormData] = useState({
    name: '',
    suggestions: [],
    focusIndex: undefined,
    submit: false
  })

  const onChange = event => {
    const focusIndex = undefined
    let suggestions = []
    
    if (event.target.value.length > 0) {
      $('.search-input-label').addClass('fade-out')
    } else {
      $('.search-input-label').removeClass('fade-out')
    }
    
    if (!loading && trie.wordCount === users.length && event.target.value.length > 0) {
      suggestions = getFirstFiveWords(trie, event.target.value)
    }
    
    setFormData({
      ...formData, 
      name: event.target.value,
      suggestions,
      focusIndex
    }) 
  }

  const onValidName = useCallback(
    nameToVisualise => {
      const timeline = gsap.timeline()
    
      timeline.to(".draw-me-2", { duration: 0.5, drawSVG: "0% 0%" }, "-=0")
      timeline.to(".draw-me-1", { duration: 0.5, drawSVG: "0% 0%" }, "-=0.25")

      timeline.to(instructionLine1.chars, {
          duration: 0.8, 
          opacity: 0, 
          scale: 0, 
          z: 200, 
          stagger: 0.01, 
        }, "-=0.25")

      timeline.to(instructionLine2.chars, {
          duration: 0.8, 
          opacity: 0, 
          scale: 0, 
          z: 200, 
          stagger: 0.01, 
        }, "-=0.6")

      timeline.to(instructionLine3.chars, {
          duration: 0.8, 
          opacity: 0, 
          scale: 0, 
          z: 200, 
          stagger: 0.01, 
        }, "-=0.6")

      timeline.to(splitText.chars, {
          duration: 0.8, 
          opacity: 0, 
          scale: 0, 
          z: 200, 
          stagger: 0.01, 
        }, "-=0.6")

      timeline.to(".line-1", { duration: 0.6, scaleX: 0, transformOrigin: "50% 50%" }, "-=0.7")
      timeline.to(".line-2", { duration: 0.6, scaleX: 0, transformOrigin: "50% 50%" }, "-=0.5")
      timeline.to(".line-3", { duration: 0.6, scaleX: 0, transformOrigin: "50% 50%" }, "-=0.5")
      
      if (!$('.auto-complete').hasClass('fade-out')) {
        const mySplitText = new SplitText(".word", {type: "words, chars"})
        
        gsap.set(".word", {perspective: 400})

        timeline.to(mySplitText.chars, {
          duration: 0.8, 
          opacity: 0, 
          scale: 0, 
          z: 200, 
          stagger: 0.01, 
        }, "-=0.8")

        timeline.to(".draw-me-3", { 
          duration: 0.5, 
          drawSVG: "0% 0%"
        }, "-=1.55")
      }

      timeline.to(".search-form", { 
        duration: 0.4, 
        opacity: 0,
        onComplete: () => setNameToVisualise(nameToVisualise.toLowerCase())
        }, "-=0.5")
    },
    [setNameToVisualise, splitText, instructionLine1, instructionLine2, instructionLine3],
  )

  const onClick = event => {
    setFormData({
      ...formData,
      name: event.target.innerHTML,
      focusIndex: undefined,
      submit: true
    })
  }
  
  const onSubmit = event => {
    event.preventDefault()
    onValidName($("input[type='text']")[0].defaultValue)
  }

  const componentAppearAnimation = () => {
    const timeline = gsap.timeline()
    const mySplitText = new SplitText(".form-text", {type: "words, chars"})
    const myInstructionLine1 = new SplitText(".line-1-text", {type: "words, chars"})
    const myInstructionLine2 = new SplitText(".line-2-text", {type: "words, chars"})
    const myInstructionLine3 = new SplitText(".line-3-text", {type: "words, chars"})
    
    $('.search-form').removeClass('fade-out')

    gsap.set(".form-text", {perspective: 400})
    gsap.set(".instruction", {perspective: 400})
    
    timeline.from(".draw-me-1", { duration: 2, drawSVG: "23% 23%" }, "+=0.5")
    timeline.from(".draw-me-2", { duration: 2, drawSVG: "0% 0%" }, "-=2")
    timeline.from(mySplitText.chars, {
        duration: 0.8, 
        opacity: 0, 
        scale: 0, 
        y: 80, 
        rotationX: 180, 
        transformOrigin: "0% 50% -50%", 
        ease: "back", 
        stagger: 0.01,
      }, "-=0.5")

    timeline.from(".line-1", { duration: 2, scaleX: 0, transformOrigin: "0% 50%" }, "+=0.5")
    timeline.from(myInstructionLine1.chars, {
      duration: 0.8, 
      opacity: 0, 
      scale: 0, 
      x: 180, 
      z: -280,
      ease: "power4", 
      stagger: 0.03,
    }, "-=0.5")

    timeline.from(".line-2", { duration: 2, scaleX: 0, transformOrigin: "50% 50%" }, "-=2.0")
    timeline.from(myInstructionLine2.chars, {
      duration: 0.8, 
      opacity: 0, 
      scale: 0, 
      x: 180, 
      z: -280,
      ease: "power4", 
      stagger: 0.03,
    }, "-=0.5")

    timeline.from(".line-3", { duration: 2, scaleX: 0, transformOrigin: "100% 50%" }, "-=2")
    timeline.from(myInstructionLine3.chars, {
      duration: 0.8, 
      opacity: 0, 
      scale: 0, 
      x: 180, 
      z: -280,
      ease: "power4", 
      stagger: 0.03,
    }, "-=0.5")

    setSplitText(mySplitText)
    setInstructionLine1(myInstructionLine1)
    setInstructionLine2(myInstructionLine2)
    setInstructionLine3(myInstructionLine3)
  }

  const bindInputKeyboardHandler = useCallback(
    () => {
      $("input[type='text']").on('keydown', event => {
        switch (event.key) {
          case 'ArrowDown':
            switch (formData.focusIndex) {
              case formData.suggestions.length - 1:
                setFormData({...formData, focusIndex: undefined})
                break
              case undefined:
                if (formData.suggestions.length !== 0) {
                  setFormData({...formData, focusIndex: 0})
                }
                break
              default:
                setFormData({...formData, focusIndex: formData.focusIndex + 1})
                break
            }
            break
          case 'ArrowUp':
            event.preventDefault()
            
            switch (formData.focusIndex) {
              case 0:
                setFormData({...formData, focusIndex: undefined})
                break;
              case undefined:
                if (formData.suggestions.length !== 0) {
                  setFormData({...formData, focusIndex: formData.suggestions.length - 1})
                }
                break;
              default:
                setFormData({...formData, focusIndex: formData.focusIndex - 1})
            }
            break
          default:
            break
        }
      })
    },
    [formData],
  )
  
  useEffect(() => {
    // When suggestion in the popup is clicked or enter pressed
    if (formData.submit && $("input[type='text']")[0] && $("input[type='text']")[0].defaultValue === formData.name) {
      onValidName(formData.name)
    }

    // Display the suggestions popup
    if (formData.suggestions.length !== 0 && $('.auto-complete').hasClass('fade-out')) {
      $('.auto-complete').removeClass('fade-out')

      if (formData.name.length === 1) {
        const timeline = gsap.timeline()
        timeline.from(".draw-me-3", { duration: 0.2, drawSVG: "50% 50%" }, "+=0")
      }
    } else if (formData.suggestions.length === 0) {
      $('.auto-complete').addClass('fade-out')
    }

    // Set the suggestion popup frame size
    $('.suggestion-popup-frame-path').attr('d', `M 7 2 L 155 2 L 160 7 L 160 ${7 + formData.suggestions.length * 26 - 10 - (formData.suggestions.length - 3)} L 155 ${12 + formData.suggestions.length * 26 - 10 - (formData.suggestions.length - 3)} L 7 ${12 + formData.suggestions.length * 26 - 10 - (formData.suggestions.length - 3)} L 2 ${7 + formData.suggestions.length * 26 - 10 - (formData.suggestions.length - 3)} L 2 7 L 7 2`)

    // Create the trie structure, when users database has been loaded
    if (!loading && trie.wordCount !== users.length) {
      setTrie(createTrie(users))
    }
    
    // When component has been mounted
    if (!loaded) {
      $('#root').addClass('padding-on')
      setLoaded(true)
      componentAppearAnimation()
    }

    bindInputKeyboardHandler()
    return () => $("input[type='text']").off()
  }, [bindInputKeyboardHandler, onValidName, loading, loaded, users, nameToVisualise, trie, setTrie, formData, formData.suggestions, formData.name.length, formData.focusIndex])

  if (nameToVisualise.length > 0) {
    return <Redirect to='/visualise' />
  } else {
    return (
      <Fragment>
        <div className="space-creator-1"></div>
        <div className="search-form fade-out">
          <div className="instruction line-1"><span className="line-1-text">Enter a word to see</span></div>
          <div className="instruction line-2"><span className="line-2-text">how it is kept in the</span></div>
          <div className="instruction line-3"><span className="line-3-text">Trie data structure</span></div>
          <svg className="search-form-frame" width="285" height="88">
            <path className="draw-me-1" d="M 40 20 L 20 20 L 5 35 L 5 55 L 33 83 L 283 83" fill="none" stroke="#727779" />
            <path className="draw-me-2" d="M 19 69 L 29 59 L 40 59" fill="none" stroke="#727779" />
          </svg>
          <h1 className="form-text">Search For Name</h1>
          <form onSubmit={event => onSubmit(event)}>
            <div className="form-group">
              <label className="search-input-label form-text" htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.focusIndex === undefined ? formData.name : formData.suggestions[formData.focusIndex]}
                onChange={event => onChange(event)} 
                autoComplete="off" 
                required 
              />
            </div>
            <button type="submit"><div className="search-button-label form-text">search</div></button>
          </form>
          <div className="auto-complete">
            <svg className="suggestion-popup-frame" width="162" height="136">
              <path className="draw-me-3 suggestion-popup-frame-path" d="M 7 2 L 155 2 L 160 7 L 160 129 L 155 134 L 7 134 L 2 129 L 2 7 L 7 2" fill="none" stroke="#727779" />
            </svg>
            {formData && formData.suggestions.map((suggestion, index) => {
              const className = index === formData.focusIndex ? 'word focus' : 'word'
              
              return (
                <div className={className} onClick={event => onClick(event)} key={suggestion}>{suggestion}</div>
              )
            })}
          </div>
        </div>
        <div className="space-creator-2"></div>
      </Fragment>
    )
  }
}

SearchWord.propTypes = {
  setTrie: PropTypes.func.isRequired,
  setNameToVisualise: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  nameToVisualise: PropTypes.string
}

const mapStateToProps = state => ({
  users: state.user,
  nameToVisualise: state.visualise.nameToVisualise
})

export default connect(mapStateToProps, { setTrie, setNameToVisualise })(SearchWord)
