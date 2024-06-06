import { useState } from "react";
import PropTypes from 'prop-types';

import CheckIcon from '@mdi/react';
import CloseIcon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';

const ConfirmClearDialog = function ({dialogRef, modalActionFunc, clearFormFunc}) {

  const handleConfirmClear = function (event) {
    const userAction = event.target.value;
    clearFormFunc(userAction === 'true' ? true : false);

    // Note: event.target.value will not return 'open-modal' either way so it will close the modal
    modalActionFunc(event)
  }

  return (
    <dialog className="confirm-dialog clear-dialog" ref={dialogRef}>

      <div className='dialog-cont'>

        <p>Are you sure you want to clear your information form?</p>
        <p>This will empty your input fields and reset your CV template.</p>

        <div className='choice-btns'>
          <button
            type='button'
            value={false}
            className='no-btn'
            onClick={handleConfirmClear}
          >
            <CloseIcon path={mdiClose} size={1}/>
            No
          </button>

          <button
            type='button'
            value={true}
            className='yes-btn'
            onClick={handleConfirmClear}
          >
            <CheckIcon path={mdiCheck} size={1}/>
            Yes
          </button>
        </div>

      </div>

    </dialog>
  )
}

export {ConfirmClearDialog}