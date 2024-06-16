import PropTypes from 'prop-types'

import AlertCircleOutline from '@mdi/react';
import Close from '@mdi/react';
import Plus from '@mdi/react';
import SendVariantIcon from '@mdi/react';
import EraserVariantIcon from '@mdi/react';
import InformationBoxOutline from '@mdi/react';
import ContactsOutline from '@mdi/react';
import SchoolOutline from '@mdi/react';
import ToolboxOutline from '@mdi/react';
import HeadPlusOutline from '@mdi/react';
import AccountMultiple from '@mdi/react';
import { 
  mdiAlertCircleOutline, 
  mdiClose, 
  mdiPlus, 
  mdiSendVariant, 
  mdiEraserVariant,
  mdiInformationBoxOutline,
  mdiContactsOutline,
  mdiSchoolOutline,
  mdiToolboxOutline,
  mdiHeadPlusOutline,
  mdiAccountMultiple
 } from '@mdi/js';

 


<AccountMultiple path={mdiAccountMultiple} size={1} />


const NavIcons = function ({iconName}) {

  const Icons = {
    BasicInfoIcon : <InformationBoxOutline path={mdiInformationBoxOutline} className='nav-icon' />,
    ContactIcon : <ContactsOutline path={mdiContactsOutline} className='nav-icon' />,
    EducationIcon : <SchoolOutline path={mdiSchoolOutline} className='nav-icon' />,
    ExpertiseIcon : <ToolboxOutline path={mdiToolboxOutline} className='nav-icon' />,
    ExperienceIcon : <HeadPlusOutline path={mdiHeadPlusOutline} className='nav-icon' />,
    ReferenceIcon : <AccountMultiple path={mdiAccountMultiple} className='nav-icon' />
  }
  
  return (
    <>{Icons[iconName]}</>
  )

}

const SendIcon = function () {
  return (
    <SendVariantIcon path={mdiSendVariant} size={1}/>
  )
}

const EraserIcon = function () {
  return (
    <EraserVariantIcon path={mdiEraserVariant} size={1}/>
  )
}

const WarnIcon = function ({addClass}) {
  return (
    <AlertCircleOutline className={`warn-icon ${addClass}`}
      path = {mdiAlertCircleOutline}
      aria-hidden = 'true'
    /> 
  )
}

WarnIcon.propTypes = {
  addClass: PropTypes.string
}

const CloseIcon = function () {
  return (
    <Close className='remove-icon' path={mdiClose}/>
  )
}

const AddIcon = function () {
  return (
    <Plus className='add-icon' path={mdiPlus}/>
  )
}




export { WarnIcon, CloseIcon, AddIcon, SendIcon, EraserIcon, NavIcons }