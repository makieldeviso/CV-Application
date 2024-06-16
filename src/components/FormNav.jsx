import { NavIcons } from "./Icons"


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

export default FormNav