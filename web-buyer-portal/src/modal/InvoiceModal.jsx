import React, {
  useRef,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import { Table, Divider } from "antd";
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

    useImperativeHandle(ref, () => ({
      handlePrint(orderId) {
        console.log("print");
        console.log("orderId", orderId);
        setTimeout(() => {
          print(`Invoice-${orderId}`, "jsx-template");
        }, 1000);
      },
    }));
    // const columns = [
    //   {
    //     title: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">Billed to</p>
    //     ),
    //     dataIndex: "BilledTo",
    //   },
    //   {
    //     title: (
    //       <p className="font-normal text-[10px] text-[#5E6470] ">Billed from</p>
    //     ),
    //     dataIndex: "BilledFrom",
    //   },
    //   {
    //     title: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">Order number</p>
    //     ),
    //     dataIndex: "OrderNumber",
    //   },
    //   {
    //     title: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         Invoice number
    //       </p>
    //     ),
    //     dataIndex: "InvoiceNumber",
    //   },
    // ];
    // const data = [
    //   {
    //     key: "1",
    //     BilledTo: (
    //       <p className="font-semibold text-[10px] text-[#1A1C21]">
    //         {invoiceData?.buyerBusinessName}
    //       </p>
    //     ),
    //     BilledFrom: (
    //       <p className="font-semibold text-[10px] text-[#1A1C21]">
    //         Lo-Fi Wines
    //       </p>
    //     ),
    //     OrderNumber: (
    //       <p className="font-semibold text-[10px] text-[#1A1C21]">123456790</p>
    //     ),
    //     InvoiceNumber: (
    //       <p className="font-semibold text-[10px] text-[#1A1C21]">123456790</p>
    //     ),
    //   },
    //   {
    //     key: "2",
    //     BilledTo: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         ABN 58 621 583 944
    //       </p>
    //     ),
    //     BilledFrom: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         ABN 58 621 583 944
    //       </p>
    //     ),
    //     OrderNumber: "",
    //     InvoiceNumber: "",
    //   },
    //   {
    //     key: "3",
    //     BilledTo: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         106 Hardware St,
    //         <br /> Melbourne VIC 3000
    //       </p>
    //     ),
    //     BilledFrom: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         106 Hardware St,
    //         <br /> Melbourne VIC 3000
    //       </p>
    //     ),
    //     OrderNumber: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         Date issued <br />
    //         <span className="font-semibold text-[10px] text-[#1A1C21]">
    //           3rd Oct 2023
    //         </span>
    //       </p>
    //     ),
    //     InvoiceNumber: (
    //       <p className="font-normal text-[10px] text-[#5E6470]">
    //         Date due <br />{" "}
    //         <span className="font-semibold text-[10px] text-[#1A1C21]">
    //           {" "}
    //           13th Nov 2023
    //         </span>
    //       </p>
    //     ),
    //   },
    // ];
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

            <div className="fixed inset-0 overflow-y-auto w-[650px]">
              <div className="flex min-h-full md:items-center items-end	 justify-center  text-center 	 ">
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
                            {invoiceData?.organisationlogo ? (
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
                                Supplier Logo
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className=" mt-10 mb-5" style={{ inset: "0" }}>
                          <Table
                            columns={columns}
                            dataSource={data}
                            size="middle"
                            pagination={false}
                            className="custom-table-invoice"
                          />
                        </div> */}
                        <div className="flex justify-between mt-10 mb-5">
                          <table className="w-full">
                            <tr>
                              <th
                                className="gray-text text-left w-[115px] h-[14.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                Billed to
                              </th>

                              <th
                                className="gray-text text-left w-[115px] h-[14.44px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                billed from
                              </th>
                            </tr>
                            <tr>
                              <td
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.buyerBusinessName}
                              </td>
                              <td
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "600 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {invoiceData?.businessName}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {" "}
                                ABN {invoiceData?.buyerABN}
                              </td>
                              <td
                                className="text-gray-900 text-left w-[115px] h-[15px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                ABN {`${invoiceData?.abn}`}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-[#000000] text-left w-[115px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {`${invoiceData?.apartmentSuite} ${invoiceData?.streetaddress},`}
                                <br />
                                {`${invoiceData?.buyerCity} ${invoiceData?.buyerState} ${invoiceData?.buyerPostCode}`}
                              </td>
                              <td
                                className="text-[#000000] text-left w-[115px]"
                                style={{
                                  font: "400 10px/14px 'Inter', sans-serif",
                                }}
                              >
                                {`${invoiceData?.apartment} ${invoiceData?.organisationAddress},`}{" "}
                                <br />
                                {`${invoiceData?.city} ${invoiceData?.state} ${invoiceData?.postcode}`}
                              </td>
                            </tr>
                          </table>
                          <div className="w-[70%]">
                            <table className="w-full">
                              <tr>
                                <th
                                  className="gray-text text-left w-[115px] h-[14.44px]"
                                  style={{
                                    font: "400 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  Order number
                                </th>
                                <th
                                  className="gray-text text-left w-[115px] h-[14.44px]"
                                  style={{
                                    font: "400 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  Invoice number
                                </th>
                              </tr>
                              <tr>
                                <td
                                  className="text-gray-900 text-left w-[69.37px] h-[17.44px]"
                                  style={{
                                    font: "600 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  {invoiceData?.orderId}
                                </td>
                                <td
                                  className="text-gray-900 text-left w-[62.81px] h-[17.44px]"
                                  style={{
                                    font: "600 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  {invoiceData?.invoiceNo}
                                </td>
                              </tr>
                            </table>
                            <table className="w-full">
                              <tr>
                                <th
                                  className="gray-text text-left w-[115px] h-[14.44px]"
                                  style={{
                                    font: "400 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  Date issued
                                </th>
                                <th
                                  className="gray-text text-left w-[115px] h-[14.44px]"
                                  style={{
                                    font: "400 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  Date due
                                </th>
                              </tr>
                              <tr>
                                <td
                                  className="text-gray-900 text-left w-[83px] h-[17.44px]"
                                  style={{
                                    font: "600 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  {invoiceData?.orderEntryDate}
                                </td>
                                <td
                                  className="text-gray-900 text-left w-[83px] h-[17.44px]"
                                  style={{
                                    font: "600 10px/14px 'Inter', sans-serif",
                                  }}
                                >
                                  {invoiceData?.paymentDate}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>

                        <div className="invoice-table pb-10 border-b">
                          <div className="flex flex-col mt-8">
                            <table className="divide-slate-500 w-full">
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
                                    className="text-[#687076] text-left relative w-[130px]"
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
                                    <tr className="border-b">
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

                            <div className="table-footer flex justify-end mt-4 ">
                              <div className="w-[50%]">
                                <table className="w-[100%]">
                                  <tbody>
                                    <tr>
                                      <th
                                        scope="row"
                                        colspan="6"
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
                                        colspan="6"
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
                                          colspan="6"
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
                                        colspan="6"
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
                                        colspan="6"
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
                        </div>

                        <div className="flex flex-row justify-between gap-5 my-8">
                          <div className="bg-gray-2 rounded p-6 w-[245px]">
                            <h4
                              className="text-[#687076] text-left mb-6"
                              style={{
                                font: "700 12px/150% 'Inter', sans-serif",
                              }}
                            >
                              Payment details
                            </h4>
                            <table className="w-full">
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
                          <div className="bg-gray-2 rounded p-6 w-[245px]">
                            <div className="flex justify-between items-start mb-b ">
                              <h4
                                className="text-[#687076] text-left mb-6 mx-1"
                                style={{
                                  font: "700 12px/150% 'Inter', sans-serif",
                                }}
                              >
                                Payment Status
                              </h4>

                              <h6 className="inline-flex items-center rounded-full bg-red-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                                Overdue
                              </h6>
                            </div>
                            <table className="w-full">
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
