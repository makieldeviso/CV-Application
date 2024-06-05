import { useState } from "react";
import PropTypes from 'prop-types';

const ConfirmClearDialog = function ({dialogRef, modalActionFunc, clearFormFunc}) {

  const handleConfirmClear = function (event) {
    const userAction = event.target.value;
    clearFormFunc(userAction)

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
            No
          </button>

          <button
            type='button'
            value={true}
            className='yes-btn'
            onClick={handleConfirmClear}
          >
            Yes
          </button>
        </div>

      </div>

    </dialog>
  )
}

export {ConfirmClearDialog}