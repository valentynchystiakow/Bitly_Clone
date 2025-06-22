// imports libraries(modules)
import Modal from '@mui/material/Modal';
import React from 'react'
// imports components
import CreateNewShorten from './CreateNewShorten';


// creates ShortenPopUp conmponent that will be used to create new shorten url
const ShortenPopUp = ({ open, setOpen, refetch}) => {

    // creates function that handles state of shortenPopUp close
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
      {/* Create new shorten url block */}
        <div className='flex justify-center items-center h-full w-full'>
            <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </div>
      </Modal>
  )
}

// exports ShortenPopUp component
export default ShortenPopUp;