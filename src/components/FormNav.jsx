import { NavIcons } from "./Icons"
import { useState } from "react";


const NavOpener = function () {
  const [navStatus, setNavStatus] = useState(false);

  const handleNavSlide = function () {
    const formNavBar = document.querySelector('.form-nav');

    if (navStatus) {
      setNavStatus((n) => n = false);
      formNavBar.classList.remove('shown');
    } else {
      setNavStatus((n) => n = true);
      formNavBar.classList.add('shown');
    }
  }

  return (
    <button
      type='button'
      className="nav-opener menu-btn"
      value ={navStatus} 
      aria-label = {!navStatus ? 'open form navigation' : 'close form navigation'}
      onClick = {handleNavSlide}
    >
      {!navStatus ? <NavIcons iconName={'NavOpenIcon'}/> : <NavIcons iconName={'NavCloseIcon'}/> }
    </button>
  )
}

const FormNav = function () {

  return (
    <nav className="form-nav">
      <ul>
        <li>
          <a href="#form-basic">
            <NavIcons iconName={'BasicInfoIcon'}/>
            Basic info
          </a>
        </li>
        <li>
          <a href="#form-contact">
            <NavIcons iconName={'ContactIcon'}/>  
            Contact
          </a>
        </li>
        <li>
          <a href="#form-education">
            <NavIcons iconName={'EducationIcon'}/>
            Education
          </a>
        </li>
        <li>
          <a href="#form-expertise">
            <NavIcons iconName={'ExpertiseIcon'}/>
            Expertise
          </a>
        </li>
        <li>
          <a href="#form-experience">
            <NavIcons iconName={'ExperienceIcon'}/>
            Experience
          </a>
        </li>
        <li>
          <a href="#form-reference">
            <NavIcons iconName={'ReferenceIcon'}/>
            References
          </a>
        </li>
      </ul>

    </nav>
    
  )
}

export {NavOpener, FormNav}