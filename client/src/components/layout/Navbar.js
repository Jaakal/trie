import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import $ from "jquery";
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

import { getUsers } from '../../actions/user'

import '../../css/Navbar.css'

gsap.registerPlugin(DrawSVGPlugin, SplitText);

const Navbar = ({ getUsers }) => {
  const logo = useRef()

  const updateViewport = () => {
    const navbarWidth = $('.navbar').width()
    
    $(".navbar-frame").attr("width", $('.navbar').width());
    
    $('#navbar-top-border').attr('d', `M 18 5 L ${navbarWidth - 34} 5`)
    $('#navbar-border-top-right-corner').attr('d', `M ${navbarWidth - 34} 5 C ${navbarWidth - 26} 5 ${navbarWidth - 26} 5 ${navbarWidth - 22} 17`)
    $('#navbar-right-border').attr('d', `M ${navbarWidth - 22} 17 L ${navbarWidth - 10} 49`)
    $('#navbar-border-bottom-right-corner').attr('d', `M ${navbarWidth - 10} 49 C ${navbarWidth - 6} 61 ${navbarWidth - 6} 61 ${navbarWidth - 18} 61`)
    $('#navbar-bottom-border').attr('d', `M ${navbarWidth - 18} 61 L 34 61`)
    
    $('#gradient-1').attr('x2', `${navbarWidth - 34}`)
    $('#gradient-2').attr('x1', `${navbarWidth - 18}`)
  }

  useEffect(() => {
    getUsers()
    updateViewport()

    const timeline = gsap.timeline()
    const logoTextSplit = new SplitText(".logo-link", {type: "words, chars"})
    const searchWordTextSplit = new SplitText(".search-word-link", {type: "words, chars"})

    const allDone = () => {
      logoTextSplit.revert()
      searchWordTextSplit.revert()
    }

    gsap.set(".nav-link", { perspective: 400 })
    gsap.set(".nav-link", { perspective: 400 })

    timeline.from("#navbar-top-border", { duration: 2, drawSVG: "65% 65%" }, "+=0.5")
    timeline.from("#navbar-bottom-border", { duration: 2, drawSVG: "42.5% 42.5%" }, "-=2")
    timeline.from("#navbar-border-top-left-corner", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.5")
    timeline.from("#navbar-border-top-right-corner", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.5")
    timeline.from("#navbar-border-bottom-right-corner", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.5")
    timeline.from("#navbar-border-bottom-left-corner", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.5")
    timeline.from("#navbar-left-border", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.25")
    timeline.from("#navbar-right-border", { duration: 0.5, drawSVG: "50% 50%" }, "-=0.5")

    timeline.from(logoTextSplit.chars, {
      duration: 0.8,
      opacity: 0,
      scale: 0,
      x: 80,
      rotationY: 180,
      transformOrigin: "0% 50% -50%",
      ease: "back",
      stagger: 0.01,
      onComplete: allDone
    }, "-=0.5")

    timeline.from(searchWordTextSplit.chars, {
      duration: 0.8,
      opacity: 0,
      scale: 0,
      x: -20,
      rotationY: -180,
      transformOrigin: "-100% 0% -50%",
      ease: "back",
      stagger: 0.01,
      onComplete: allDone
    }, "-=0.8")

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, [logo, getUsers])

  return (
    <div className="navbar">
      <h2>
        <Link ref={logo} className="nav-link logo-link" to={'/'}> Trie Algorithm Visualisation</Link>
      </h2>
      <ul>
        <li>
          <Link className="nav-link search-word-link" to={'/'}>Search Name</Link>
        </li>
      </ul>
      <svg className="navbar-frame" width="760" height="66">
        <defs>
          <linearGradient id="gradient-1" x1="18" y1="5" x2="726" y2="5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="30%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="40%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="60%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="63%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="67%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="70%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="75%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="85%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
          </linearGradient>
          <linearGradient id="gradient-2" x1="742" y1="61" x2="34" y2="61" gradientUnits="userSpaceOnUse">
            <stop offset="0%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="5%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="15%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="25%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="30%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="55%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
            <stop offset="60%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="65%" style={{ stopColor: 'rgb(255, 255, 255)', stopOpacity: '0' }} />
            <stop offset="75%" style={{ stopColor: 'rgb(0, 0, 0)', stopOpacity: '1' }} />
          </linearGradient>
        </defs>
        <path id="navbar-border-top-left-corner" d="M 6 17 Q 2 5 18 5" fill="none" stroke="#000000" />
        <path id="navbar-top-border" d="M 18 5 L 726 5 " fill="none" stroke="url(#gradient-1)" />
        <path id="navbar-border-top-right-corner" d="M 726 5 C 734 5 734 5 738 17" fill="none" stroke="#000000" />
        <path id="navbar-right-border" d="M 738 17 L 750 49" fill="none" stroke="#000000" />
        <path id="navbar-border-bottom-right-corner" d="M 750 49 C 754 61 754 61 742 61" fill="none" stroke="#000000" />
        <path id="navbar-bottom-border" d="M 742 61 L 34 61" fill="none" stroke="url(#gradient-2)" />
        <path id="navbar-border-bottom-left-corner" d="M 34 61 C 22 61 22 61 18 49" fill="none" stroke="#000000" />
        <path id="navbar-left-border" d="M 18 49 L 6 17" fill="none" stroke="#000000" />
      </svg>
    </div>
  )
}

Navbar.protoTypes = {
  getUsers: PropTypes.array.isRequired
}

export default connect(null, { getUsers })(Navbar)
