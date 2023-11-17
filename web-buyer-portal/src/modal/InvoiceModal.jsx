import React, {
  useRef,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { Preview, print } from "react-html2pdf";
import { theme } from "antd";
import zIndex from "@mui/material/styles/zIndex";
import { useEffect } from "react";

const InvoiceModal = forwardRef(
  (
    { show, setShow, invoiceData, invoiceDataProducts, isWine, calculations },
    ref
  ) => {
    const { useToken } = theme;
    const { token } = useToken();
    const cancelButtonRef = useRef(null);
    console.log(invoiceData, "ccccccccccccccc");
    console.log("invoiceDataProducts", invoiceDataProducts);

    useImperativeHandle(ref, () => ({
      handlePrint(orderId) {
        console.log("print");
        console.log("orderId", orderId);
        setTimeout(() => {
          print(`Invoice-${orderId}`, "jsx-template");
        }, 1000);
      },
    }));

    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            initialFocus={cancelButtonRef}
            onClose={setShow}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" />
              {/*   bg-[#0000]  z-[0] */}
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full md:items-center items-end	 justify-center  text-center opacity-0	">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-fit custom-invoice-popup px-6 transform overflow-hidden md:rounded-2xl rounded-se-1xl rounded-tl-1xl	 bg-white  py-8 text-center  align-middle shadow-xl transition-all flex flex-col justify-center gap-4 relative">
                    <Preview id="jsx-template">
                      <div className="bg-white m-5">
                        <div className="flex justify-between items-center">
                          <h1
                            className="text-black"
                            style={{
                              font: "800 25px/150% 'Inter', sans-serif",
                            }}
                          >
                            Tax Invoice
                          </h1>
                          <div className="flex items-center ">
                            {/* <img className="w-[50px] h-[50px]" src="assets/Logo-1.png" /> */}
                            {invoiceData?.organisationlogo !== "" ? (
                              <img
                                className="h-[42px] w-[125px] object-cover"
                                src={invoiceData?.organisationlogo}
                                alt="organisationlogo"
                              />
                            ) : (
                              <div
                                className="text-black ml-4 bg-[#D9D9D9] h-[42px] w-[125px] flex justify-center items-center"
                                style={{
                                  font: "700 10px/150% 'Source Sans Pro', sans-serif",
                                }}
                              >
                                Supplier Logo{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="flex justify-between mt-10 mb-5"
                          style={{ inset: "0" }}
                        >
                          <div style={{ inset: "0" }}>
                            <div className="flex flex-col gap-1.5 items-start justify-start">
                              <div
                                className="gray-text text-left w-[115px] h-[14.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Billed to{" "}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {/* {invoiceData.businessName} */}
                                {invoiceData?.buyerBusinessName}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                ABN {invoiceData?.buyerABN}
                              </div>
                              <div
                                className="text-[#000000] text-left w-[115px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {`${invoiceData?.apartmentSuite} ${invoiceData?.streetaddress},`}
                                <br />
                                {`${invoiceData?.buyerCity} ${invoiceData?.buyerState} ${invoiceData?.buyerPostCode}`}
                              </div>
                            </div>
                          </div>
                          <div style={{ inset: "0" }}>
                            <div className="flex flex-col gap-1.5 items-start justify-start">
                              <div
                                className="gray-text text-left w-[115px] h-[14.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                billed from
                              </div>
                              <div
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.businessName}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                ABN {`${invoiceData?.abn}`}
                              </div>
                              <div
                                className="text-[#000000] text-left w-[115px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {`${invoiceData?.apartment} ${invoiceData?.organisationAddress},`}{" "}
                                <br />
                                {`${invoiceData?.city} ${invoiceData?.state} ${invoiceData?.postcode}`}
                              </div>
                            </div>
                          </div>
                          <div style={{ inset: "0" }}>
                            <div className="w-[83px] h-[33px] static">
                              <div
                                className="gray-text text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Order number
                              </div>
                              <div
                                className="text-gray-900 text-left w-[69.37px] h-[17.44px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.orderId}
                              </div>
                            </div>
                            <div className="w-[83px] h-[33px] static mt-7">
                              <div
                                className="gray-text text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Date issued{" "}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.orderEntryDate}
                              </div>
                            </div>
                          </div>
                          <div style={{ inset: "0" }}>
                            <div className="w-[83px] h-[33px] static">
                              <div
                                className="gray-text text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Invoice number{" "}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[62.81px] h-[17.44px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.invoiceNo}
                              </div>
                            </div>
                            <div className="w-[83px] h-[33px] static mt-7">
                              <div
                                className="gray-text text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Date due{" "}
                              </div>
                              <div
                                className="text-gray-900 text-left w-[83px] h-[17.44px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.paymentDate}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="invoice-table pb-10 border-b">
                          <div class="flex flex-col mt-8">
                            <table class="divide-slate-500 mr-[140px]">
                              <thead className="bg-neutral-slate-a-2 my-3 rounded-md">
                                <tr>
                                  <th
                                    scope="col"
                                    className="text-left relative w-[70px] text-[#687076]"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    CODE
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-[#687076] text-left relative w-[140px]"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    DESCRIPTION
                                  </th>
                                  {isWine && (
                                    <th
                                      scope="col"
                                      className="text-[#687076] text-left relative w-[35px]"
                                      style={{
                                        font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                      }}
                                    >
                                      UNIT
                                      <br />
                                      LUC
                                    </th>
                                  )}
                                  <th
                                    scope="col"
                                    className="text-[#687076] text-left relative w-[35px]"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    QTY
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-[#687076] text-left relative w-[60px]"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    SALE PRICE
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-[#687076] text-left relative w-[60px]"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    AMOUNT
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-[#687076] text-left relative w-10"
                                    style={{
                                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                                    }}
                                  >
                                    GST
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoiceDataProducts?.map((product) => {
                                  return (
                                    <tr class="border-b">
                                      <td
                                        className="text-neutral-slate-a-12 text-left"
                                        style={{
                                          font: "400 10px/133% 'Inter', sans-serif",
                                        }}
                                      >
                                        {product?.skUcode}
                                      </td>
                                      <td>
                                        <div
                                          className="text-neutral-slate-a-12 text-left"
                                          style={{
                                            font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                                          }}
                                        >
                                          {product?.title}
                                        </div>
                                        <div
                                          className="text-[#7E868C] text-left"
                                          style={{
                                            font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                                          }}
                                        >
                                          {product?.configuration}
                                        </div>
                                      </td>
                                      {isWine && (
                                        <td
                                          className="text-neutral-slate-a-12 text-left"
                                          style={{
                                            font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                                          }}
                                        >
                                          {product?.luCcost}
                                        </td>
                                      )}
                                      <td
                                        className="text-neutral-slate-a-12 text-left"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                                        }}
                                      >
                                        {product?.quantity}
                                      </td>
                                      <td
                                        className="text-neutral-slate-a-12 text-left"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                                        }}
                                      >
                                        ${product?.globalPrice}
                                      </td>
                                      <td
                                        className="text-neutral-slate-a-12 text-left"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                                        }}
                                      >
                                        ${product?.amountPerItem}
                                      </td>
                                      <td
                                        className="text-neutral-slate-a-12 text-left"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                                        }}
                                      >
                                        ${product?.gstPerItem}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>

                            <div className="table-footer flex justify-end mt-4 pr-[180px]">
                              <table className="w-[230px]">
                                <tbody>
                                  <tr>
                                    <th
                                      scope="row"
                                      colspan="4"
                                      className="text-gray-900 text-left"
                                      style={{
                                        font: "600 10px/14px 'Inter', sans-serif",
                                      }}
                                    >
                                      Subtotal
                                    </th>
                                    <td
                                      className="text-neutral-slate-a-12 text-right"
                                      style={{
                                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      ${calculations?.subtotal}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      scope="row"
                                      colspan="4"
                                      className="neutral-slate-text text-left"
                                      style={{
                                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      Shipping Charges
                                    </th>
                                    <td
                                      className="text-neutral-slate-a-12 text-right"
                                      style={{
                                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      $XX.XXX
                                    </td>
                                  </tr>
                                  {isWine && (
                                    <tr>
                                      <th
                                        scope="row"
                                        colspan="4"
                                        className="neutral-slate-text text-left"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                        }}
                                      >
                                        WET (29%)
                                      </th>
                                      <td
                                        className="text-neutral-slate-a-12 text-right"
                                        style={{
                                          font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                        }}
                                      >
                                        ${calculations?.wet}
                                      </td>
                                    </tr>
                                  )}
                                  <tr>
                                    <th
                                      scope="row"
                                      colspan="4"
                                      className="neutral-slate-text text-left"
                                      style={{
                                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      GST (10%)
                                    </th>
                                    <td
                                      className="text-neutral-slate-a-12 text-right"
                                      style={{
                                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      ${calculations?.gst}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      scope="row"
                                      colspan="4"
                                      className="text-neutral-slate-a-12 text-left"
                                      style={{
                                        font: "var(--paragraph-2-bold, 700 14px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      Total inc. GST
                                    </th>

                                    <td
                                      className="text-neutral-slate-a-12 text-right"
                                      style={{
                                        font: "var(--paragraph-2-bold, 700 14px/33% 'Inter', sans-serif)",
                                      }}
                                    >
                                      ${calculations?.total}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row justify-between">
                          <div className="bg-gray-2 rounded p-6 w-[245px] h-[140px]">
                            <h4
                              className="text-[#687076] text-left mb-6"
                              style={{
                                font: "700 12px/150% 'Inter', sans-serif",
                              }}
                            >
                              Payment details
                            </h4>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    scope="row"
                                    colspan="4"
                                    className="text-black text-left uppercase pb-2 w-[70px]"
                                    style={{
                                      font: "700 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    TERMS
                                  </td>
                                  <td
                                    className="text-black text-left pb-2"
                                    style={{
                                      font: "400 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    30 days from invoice date
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    scope="row"
                                    colspan="4"
                                    className="text-black text-left uppercase w-[70px]"
                                    style={{
                                      font: "700 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    METHOD
                                  </td>
                                  <td
                                    className="text-black text-left"
                                    style={{
                                      font: "400 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    Direct debit
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="bg-gray-2 rounded pr-[400px] w-[245px] h-[140px]">
                            <div className="flex justify-between items-center mb-3 mt-3">
                              <h4
                                className="text-[#687076] text-left mb-6 mx-1"
                                style={{
                                  font: "700 12px/150% 'Inter', sans-serif",
                                }}
                              >
                                Payment
                              </h4>
                              <h4
                                className="text-[#687076] text-left mb-6 mx-1"
                                style={{
                                  font: "700 12px/150% 'Inter', sans-serif",
                                }}
                              >
                                Status
                              </h4>

                              <div className="flex items-center justify-end ml-[80px]">
                                <h6 className="inline-flex items-center rounded-full bg-red-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                                  Overdue
                                </h6>
                              </div>
                            </div>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    scope="row"
                                    colspan="4"
                                    className="text-black text-left uppercase pb-2 w-[100px]"
                                    style={{
                                      font: "700 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    PAID
                                  </td>
                                  <td
                                    className="text-black text-left pb-2"
                                    style={{
                                      font: "400 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    ${invoiceData?.paymentAmount}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    scope="row"
                                    colspan="4"
                                    className="text-black text-left uppercase w-[100px]"
                                    style={{
                                      font: "700 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    OUTSTANDING
                                  </td>
                                  <td
                                    className="text-black text-left"
                                    style={{
                                      font: "400 10px/150% 'Inter', sans-serif",
                                    }}
                                  >
                                    $XX.XX
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div
                          className="text-[#000000] text-left mb-3"
                          style={{ font: "400 8px/150% 'Inter', sans-serif" }}
                        >
                          <span>
                            <span className="for-any-queries-please-contact-first-last-at-email-email-com-or-0428-100-000-span">
                              For any queries, please contact First Last at{" "}
                            </span>
                            <a
                              href="#"
                              className="for-any-queries-please-contact-first-last-at-email-email-com-or-0428-100-000-span2 underline"
                            >
                              email@email.com{" "}
                            </a>
                            <span className="for-any-queries-please-contact-first-last-at-email-email-com-or-0428-100-000-span3">
                              or 0428 100 000.{" "}
                            </span>
                          </span>{" "}
                        </div>
                      </div>
                    </Preview>
                    {/* <button
                      onClick={handlePrint}
                      style={{ backgroundColor: token.buttonThemeColor }}
                      className="bg-[#563FE3] rounded-md p-[10px] sm:py-[12px] sm:px-[40px] mt-2"
                    >
                      Download
                    </button> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

export default InvoiceModal;
