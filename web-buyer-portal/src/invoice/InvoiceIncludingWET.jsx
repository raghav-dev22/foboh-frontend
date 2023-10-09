import React from "react";

function InvoiceIncludingWET() {
  return (
    <div className="bg-gray-400">
      <div className="box-border bg-white w-[595px] h-[830px] m-auto p-8 border">
        <div className="flex justify-between items-center">
          <h1
            className="text-black"
            style={{ font: "800 25px/150% 'Inter', sans-serif" }}
          >
            Tax Invoice
          </h1>
          <div className="flex items-center ">
            <img className="w-[50px] h-[50px]" src="assets/Logo-1.png" />
            <div
              className="text-black ml-4 bg-[#D9D9D9] h-[42px] w-[125px] flex justify-center items-center"
              style={{ font: "700 10px/150% 'Source Sans Pro', sans-serif" }}
            >
              Supplier Logo{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-10 mb-5" style={{ inset: "0" }}>
          <div style={{ inset: "0" }}>
            <div className="flex flex-col gap-1.5 items-start justify-start">
              <div
                className="gray-text text-left w-[115px] h-[14.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Billed to{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[115px] h-[15px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                Mjolner Melbourne{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[115px] h-[15px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                ABN 58 621 583 944{" "}
              </div>
              <div
                className="text-[#000000] text-left w-[115px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                106 Hardware St, Melbourne VIC 3000{" "}
              </div>
            </div>
          </div>
          <div style={{ inset: "0" }}>
            <div className="flex flex-col gap-1.5 items-start justify-start">
              <div
                className="gray-text text-left w-[115px] h-[14.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Billed from{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[115px] h-[15px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                Lo-Fi Wines{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[115px] h-[15px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                ABN 58 621 583 944{" "}
              </div>
              <div
                className="text-[#000000] text-left w-[115px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                106 Hardware St, Melbourne VIC 3000{" "}
              </div>
            </div>
          </div>
          <div style={{ inset: "0" }}>
            <div className="w-[83px] h-[33px] static">
              <div
                className="gray-text text-left w-[83px] h-[17.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Order number{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[69.37px] h-[17.44px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                123456790{" "}
              </div>
            </div>
            <div className="w-[83px] h-[33px] static mt-7">
              <div
                className="gray-text text-left w-[83px] h-[17.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Date issued{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[83px] h-[17.44px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                3rd Oct 2023{" "}
              </div>
            </div>
          </div>
          <div style={{ inset: "0" }}>
            <div className="w-[83px] h-[33px] static">
              <div
                className="gray-text text-left w-[83px] h-[17.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Invoice number{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[62.81px] h-[17.44px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                123456790{" "}
              </div>
            </div>
            <div className="w-[83px] h-[33px] static mt-7">
              <div
                className="gray-text text-left w-[83px] h-[17.44px]"
                style={{ font: "400 10px/14px 'Inter', sans-serif" }}
              >
                Date due{" "}
              </div>
              <div
                className="text-gray-900 text-left w-[83px] h-[17.44px]"
                style={{ font: "600 10px/14px 'Inter', sans-serif" }}
              >
                13th Nov 2023{" "}
              </div>
            </div>
          </div>
        </div>

        <div class="invoice-table pb-20 border-b">
          <div class="flex flex-col mt-8">
            <table class="min-w-full divide-slate-500 ">
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
                  <th
                    scope="col"
                    className="text-[#687076] text-left"
                    style={{
                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    UNIT LUC
                  </th>
                  <th
                    scope="col"
                    className="text-[#687076] text-left"
                    style={{
                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    QTY
                  </th>
                  <th
                    scope="col"
                    className="text-[#687076] text-left"
                    style={{
                      font: "var(--outline-bold, 700 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    SALE PRICE
                  </th>
                  <th
                    scope="col"
                    className="text-[#687076] text-left"
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
                <tr class="border-b">
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{ font: "400 10px/133% 'Inter', sans-serif" }}
                  >
                    SKU Code
                  </td>
                  <td>
                    <div
                      className="text-neutral-slate-a-12 text-left"
                      style={{
                        font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                      }}
                    >
                      Product Title
                    </div>
                    <div
                      className="text-[#7E868C] text-left"
                      style={{
                        font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                      }}
                    >
                      Configuration
                    </div>
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $XXX.XX
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    X
                  </td>

                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $XXX.XX
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $XXX.XX
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $XX.XX
                  </td>
                </tr>
                <tr class="border-b">
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{ font: "400 10px/133% 'Inter', sans-serif" }}
                  >
                    DASJROSE21
                  </td>
                  <td>
                    <div
                      className="text-neutral-slate-a-12 text-left"
                      style={{
                        font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                      }}
                    >
                      Das Juice 2021 Rosé
                    </div>
                    <div
                      className="text-[#7E868C] text-left"
                      style={{
                        font: "var(--outline-regular, 400 10px/143% 'Inter', sans-serif)",
                      }}
                    >
                      12 x 750mL Bottle
                    </div>
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $14.85
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    2
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $178.20
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $356.40
                  </td>
                  <td
                    className="text-neutral-slate-a-12 text-left"
                    style={{
                      font: "var(--outline-regular, 400 10px/133% 'Inter', sans-serif)",
                    }}
                  >
                    $XX.XX
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="table-footer flex justify-end mt-4">
              <table className="w-[230px]">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      colspan="4"
                      className="neutral-slate-text text-left"
                      style={{
                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                      }}
                    >
                      Total Wholesale Price
                    </th>
                    <td
                      className="text-neutral-slate-a-12 text-right"
                      style={{
                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                      }}
                    >
                      $XXX.XXX
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
                      $XX.XX
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colspan="4"
                      className="text-gray-900 text-left"
                      style={{ font: "600 10px/14px 'Inter', sans-serif" }}
                    >
                      Subtotal
                    </th>
                    <td
                      className="text-neutral-slate-a-12 text-right"
                      style={{
                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                      }}
                    >
                      $XXX.XX
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
                      GST (10%)
                    </th>

                    <td
                      className="text-neutral-slate-a-12 text-right"
                      style={{
                        font: "var(--outline-regular, 400 10px/33% 'Inter', sans-serif)",
                      }}
                    >
                      $XX.XX
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
                      $XXX.XX
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          <div className="bg-gray-2 rounded p-6 w-[245px] h-[140px]">
            <h4
              className="text-[#687076] text-left mb-6"
              style={{ font: "700 12px/150% 'Inter', sans-serif" }}
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
                    style={{ font: "700 10px/150% 'Inter', sans-serif" }}
                  >
                    TERMS
                  </td>
                  <td
                    className="text-black text-left pb-2"
                    style={{ font: "400 10px/150% 'Inter', sans-serif" }}
                  >
                    30 days from invoice date
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="4"
                    className="text-black text-left uppercase w-[70px]"
                    style={{ font: "700 10px/150% 'Inter', sans-serif" }}
                  >
                    METHOD
                  </td>
                  <td
                    className="text-black text-left"
                    style={{ font: "400 10px/150% 'Inter', sans-serif" }}
                  >
                    Direct debit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-2 rounded p-6 w-[245px] h-[140px]">
            <div className="flex justify-between items-center mb-5">
              <h4
                className="text-[#687076] text-left "
                style={{ font: "700 12px/150% 'Inter', sans-serif" }}
              >
                Payment status
              </h4>

              <div>
                <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                  Overdue
                </span>
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td
                    scope="row"
                    colspan="4"
                    className="text-black text-left uppercase pb-2 w-[100px]"
                    style={{ font: "700 10px/150% 'Inter', sans-serif" }}
                  >
                    PAID
                  </td>
                  <td
                    className="text-black text-left pb-2"
                    style={{ font: "400 10px/150% 'Inter', sans-serif" }}
                  >
                    $XX.XX
                  </td>
                </tr>
                <tr>
                  <td
                    scope="row"
                    colspan="4"
                    className="text-black text-left uppercase w-[100px]"
                    style={{ font: "700 10px/150% 'Inter', sans-serif" }}
                  >
                    OUTSTANDING
                  </td>
                  <td
                    className="text-black text-left"
                    style={{ font: "400 10px/150% 'Inter', sans-serif" }}
                  >
                    $XX.XX
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="text-[#000000] text-left mt-5"
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
    </div>
  );
}

export default InvoiceIncludingWET;
