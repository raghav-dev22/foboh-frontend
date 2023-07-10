import React from 'react'

function stock() {
  const stockBox = Array.from({ length: 4 });;
  return (
    <>
      {
        stockBox.map((item, index) => {
          return (
            <>
              <div className={` rounded-md	 border border-inherit bg-white grow h-40 stock-${index}`}>
                <div className="grid grid-cols-1 gap-6 p-4">
                  <div className=" stock-icon h-12 w-12 rounded-full	flex justify-center items-center bg-slate-100	">
                    <img src="assets/revenue.png" alt="" />
                  </div>
                  <div className="">
                    <h4 className="text-2xl font-bold text-start	">$12,489</h4>
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold text-zinc-500">
                        Total revenue
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-lime-600">
                          0.43%{" "}
                        </p>
                        <div className="">
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.57066 2.47722L1.12248 5.82972L0.213501 4.94597L5.2135 0.0847163L10.2135 4.94597L9.30453 5.82972L5.85634 2.47722L5.85634 10.0847L4.57066 10.0847L4.57066 2.47722Z" fill="#45CB85" />
                          </svg>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })
      }

    </>
  )
}

export default stock
