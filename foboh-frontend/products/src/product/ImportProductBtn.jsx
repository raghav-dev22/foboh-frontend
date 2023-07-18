import React, { useState } from 'react'
import ImportModal from '../modal/ImportModal';

function ImportProductBtn() {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button type='button' className="shadow-md border-inherit border rounded	w-28		h-10	flex justify-center items-center text-base	font-medium	" onClick={() => setShowModal(!showModal)}>
        <h6 className="text-gray">Import</h6>
      </button>

    <ImportModal Show={showModal} Hide={setShowModal} />
    </>
  )
}

export default ImportProductBtn
