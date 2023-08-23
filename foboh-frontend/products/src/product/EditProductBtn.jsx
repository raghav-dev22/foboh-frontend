import React from "react";

function EditProductBtn({handleBulkEdit, selectedProductsLength}) {

  const handlelength = (e) =>{
   console.log("bbbbbbbbbb",selectedProductsLength)
  }

  return (
    <>
      <button
        type="button"
        disabled={selectedProductsLength < 1 ? true : false}
        onClick={handleBulkEdit}
        className="border-darkGreen shadow-md border rounded	w-32	h-10	flex justify-center items-center text-base	font-medium	"
      >
        <h6 className="text-darkGreen">Edit products</h6>
      </button>
    </>
  );
}

export default EditProductBtn;
