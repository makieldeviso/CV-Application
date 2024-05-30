import { useState } from "react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

const Form = function () {

  return (
    <div className='form-fields'>
      <BasicInfo/>
      <ContactInfo/>
      <EducationInfo/>
      <ExpertiseInfo/>
      <ExperienceInfo/>
      <ReferenceInfo/>
    </div>
    
  ) 

}

export default Form