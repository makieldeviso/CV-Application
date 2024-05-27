import { useState } from "react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";

const Form = function () {

  return (
    <>
      <BasicInfo/>
      <ContactInfo/>
      <EducationInfo/>
      <ExpertiseInfo/>
      <ExperienceInfo/>

    </>
    
  )

}

export default Form