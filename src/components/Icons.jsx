import PropTypes from 'prop-types'

import AlertCircleOutline from '@mdi/react';
import Close from '@mdi/react';
import Plus from '@mdi/react';
import { mdiAlertCircleOutline, mdiClose, mdiPlus } from '@mdi/js';


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


export { WarnIcon, CloseIcon, AddIcon }