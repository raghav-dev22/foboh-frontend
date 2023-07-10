import React from 'react'

function CancelBtn() {
    return (
        <>
            <div
                class="flex justify-center items-center gap-1 radius-30 bg-custom-yellow h-7	 w-min	px-3">
                <div class="dot bg-custom-darkYellow rounded-full	"></div>
                <p class="text-yellow font-medium	text-sm	">Pending</p>
            </div>
        </>
    )
}

export default CancelBtn
