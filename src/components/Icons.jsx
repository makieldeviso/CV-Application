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
import MenuOpen from '@mdi/react';
import MenuClose from '@mdi/react';
import PrinterOutline from '@mdi/react';
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
  mdiAccountMultiple,
  mdiMenuOpen ,
  mdiMenuClose,
  mdiPrinterOutline
  
 } from '@mdi/js';

const PrintIcon = () => <PrinterOutline path={mdiPrinterOutline} className='print-icon'/>

const NavIcons = function ({iconName}) {
  const Icons = {
    BasicInfoIcon : <InformationBoxOutline path={mdiInformationBoxOutline} className='nav-icon' />,
    ContactIcon : <ContactsOutline path={mdiContactsOutline} className='nav-icon' />,
    EducationIcon : <SchoolOutline path={mdiSchoolOutline} className='nav-icon' />,
    ExpertiseIcon : <ToolboxOutline path={mdiToolboxOutline} className='nav-icon' />,
    ExperienceIcon : <HeadPlusOutline path={mdiHeadPlusOutline} className='nav-icon' />,
    ReferenceIcon : <AccountMultiple path={mdiAccountMultiple} className='nav-icon' />,
    NavOpenIcon : <MenuOpen path={mdiMenuOpen} />,
    NavCloseIcon : <MenuClose path={mdiMenuClose} />
  }
  
  return (
    <>{Icons[iconName]}</>
  )
}

NavIcons.propTypes = {
  iconName: PropTypes.string,
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




export { WarnIcon, CloseIcon, AddIcon, SendIcon, EraserIcon, NavIcons, PrintIcon}