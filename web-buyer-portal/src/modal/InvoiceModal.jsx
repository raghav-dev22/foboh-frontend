import React, { forwardRef, useImperativeHandle } from "react";
var htmlToPdfmake = require("html-to-pdfmake");
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const InvoiceModal = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    handlePrint(
      orderId,
      invoiceData,
      invoiceDataProducts,
      isWine,
      calculations
    ) {
      console.log("orderId", orderId);
      setTimeout(() => {
        console.log("print", JSON.stringify(invoiceData));
        var val = htmlToPdfmake(
          ` 
            <table style="width:100%">
            <tr>
               <td style="border:none;font-size:25px;font-weight:800;color:#111111  ;width:80%">
                  Tax Invoice
               </td>
               <td style="border:none;font-size:12px;font-weight:400;color:#111111">
               
                  Supplier Logo
               </td>
            </tr>
         </table>
         <table style="width:100% ">
            <tr>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">Billed to</td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">Billed from</td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">Order number</td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">Invoice number</td>
            </tr>
            <tr>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">${
                 invoiceData?.buyerBusinessName
               }
               </td>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">${
                 invoiceData?.businessName
               }
               </td>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">${
                 invoiceData?.orderId
               }
               </td>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">${
                 invoiceData?.invoiceNo
               }
               </td>
            </tr>
            <tr>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">ABN ${
                 invoiceData?.buyerABN
               }
               </td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">ABN ${
                 invoiceData?.abn
               }
               </td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400"></td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400"></td>
            </tr>
            <tr>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">${
                 invoiceData?.apartmentSuite
               } ${invoiceData?.streetaddress}<br />${invoiceData?.buyerCity} ${
            invoiceData?.buyerState
          } ${invoiceData?.buyerPostCode}
               </td>
               <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">${
                 invoiceData?.apartment
               } ${invoiceData?.organisationAddress}<br />${
            invoiceData?.city
          } ${invoiceData?.state} ${invoiceData?.postcode}
               </td>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">Date issued <br/>${
                 invoiceData?.orderEntryDate
               }
               </td>
               <td style="border:none;color:#1A1C21;font-size:12px;font-weight:600">Date due <br/>${
                 invoiceData?.paymentDate
               }
               </td>
            </tr>
         </table>
         <table style="width:100% ">
            <thead style:"border-radius:8px; padding:10px;border:1px solid #F1F3F5 ;height:50px   ">
            <tr>
               <th style="border:none;color:#687076  ; padding:6px 6px;font-size:12px;font-weight:700">CODE</th>
               <th style="border:none;color:#687076 ;padding:6px 6px;font-size:12px;font-weight:700">DESCRIPTION</th>
               ${
                 isWine
                   ? `
               <th
                  style="border:none;color:#687076 "
                  >
                  UNIT
                  <br />
                  LUC
               </th>
               `
                   : ""
               }
               <th style="border:none;color:#687076 ;padding:6px 6px  ;font-size:12px;font-weight:700;border:none">QTY</th>
               <th style="border:none;color:#687076;padding:6px 6px ;font-size:12px;font-weight:700;border:none">SALE PRICE</th>
               <th style="border:none;color:#687076 ;padding:6px 6px ;font-size:12px;font-weight:700;border:none">AMOUNT</th>
               <th style="border:none;color:#687076 ;padding:6px 6px ;font-size:12px;font-weight:700;border:none">GST</th>
            </tr>
            </thead>
            <tbody>
               ${invoiceDataProducts?.map((product) => {
                 return `
               <tr class="border-b">
                  <td   style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     ${product?.skUcode}
                  </td>
                  <td style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     <div   >
                        ${product?.title}
                     </div>
                     <div   style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                        ${product?.configuration}
                     </div>
                  </td>
                  ${
                    isWine
                      ? `
                  <td
                     style="border:none;color:#5E6470;font-size:12px;font-weight:400"
                     >
                     ${product?.luCcost}
                  </td>
                  `
                      : ""
                  }
                  <td  style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     ${product?.quantity}
                  </td>
                  <td  style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     $${product?.globalPrice}
                  </td>
                  <td  style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     $${product?.amountPerItem}
                  </td>
                  <td  style="border:none;color:#5E6470;font-size:12px;font-weight:400">
                     $${product?.gstPerItem}
                  </td>
               </tr>
               `;
               })}
            </tbody>
         </table>
         <table style="width:100% ;margin-left:300px">
            <tbody style="width:100%">
               <tr style="width:80%">
                  <td 
                     style="border:none;color:#7E868C;font-size:12px;font-weight:400"
                     >
                     Subtotal
                  </td>
                  <td
                     style="border:none;color:#11181C      ;font-size:12px;font-weight:400"
                     >
                     ${calculations?.subtotal}
                  </td>
               </tr>
               <tr>
                  <td
                     style="border:none;color:#7E868C;font-size:12px;font-weight:400"
                     >
                     Shipping Charges
                  </td>
                  <td
                     style="border:none;color:#11181C      ;font-size:12px;font-weight:400"
                     >
                     $XX.XXX
                  </td>
               </tr>
               ${
                 isWine
                   ? `
               <tr>
                  <td
                     style="border:none;color:#7E868C;font-size:12px;font-weight:400"
                     >
                     WET (29%)
                  </td>
                  <td
                     style="border:none;color:#11181C        ;font-size:12px;font-weight:400"
                     >
                     ${calculations?.wet}
                  </td>
               </tr>
               `
                   : ""
               }
               <tr>
                  <td
                     style="border:none;color:#7E868C;font-size:12px;font-weight:400"
                     >
                     GST (10%)
                  </td>
                  <td  
                     style="border:none;color:#11181C      ;font-size:12px;font-weight:400"
                     >
                     ${calculations?.gst}
                  </td>
               </tr>
               <tr>
                  <td  style="border:none;color:#11181C
                     ;font-size:14px;font-weight:700"
                     >
                     Total inc. GST
                  </td>
                  <td style="border:none;color:#11181C
                     ;font-size:14px;font-weight:700"
                     >
                     ${calculations?.total}
                  </td>
               </tr>
            </tbody>
         </table>
         </table>
         <table style="width:100%; border-collapse: collapse;">
    <tr>
        <td style="border-right: 10px solid white;border-left:none;border-top:none;border-bottom:none; width: 50%; padding: 10px; border-radius: 10px ;background-color: #F8FAFC
        ;">
            <!-- Table 1 content -->
            <table style="width:100%">
            <tr>
               <td  style="border:none;color:#687076
                  ;font-size:14px;font-weight:700"
                  >
                  Payment details
               </td>
               <td style="border:none"></td>
            </tr>
            <tr>
               <td 
                  style="border:none;color:#111111;font-size:12px;font-weight:700;"
                  >
                  TERMS
               </td>
               <td
                  style="border:none;color:#111111      ;font-size:12px;font-weight:400"
                  >
                  30 days from invoice date
               </td>
            </tr>
            <tr>
               <td 
                  style="border:none;color:#111111;font-size:12px;font-weight:700"
                  >
                  TERMS
               </td>
               <td
                  style="border:none;color:#111111      ;font-size:12px;font-weight:400"
                  >
                  30 days from invoice date
               </td>
            </tr>
         </table>
        </td>

        <td style="border-left: 10px solid white;border-right:none;border-top:none;border-bottom:none; width: 50%; padding: 10px; border-radius: 10px ;background-color: #F8FAFC">
            <!-- Table 2 content -->
            <table style="width:100%">
         <tr>
            <td  style="border:none;color:#687076
               ;font-size:14px;font-weight:700"
               >
               Payment status
            </td>
            <td style="border:none;background:#DC3545 ; border-radius:50px; color:#fff   ; padding: 10px;        ">
            Overdue
            </td>
         </tr>
         <tr>
            <td 
               style="border:none;color:#111111;font-size:12px;font-weight:700;"
               >
               PAID
            </td>
            <td
               style="border:none;color:#111111      ;font-size:12px;font-weight:400"
               >
               $${invoiceData?.paymentAmount}
            </td>
         </tr>
         <tr>
            <td 
               style="border:none;color:#111111;font-size:12px;font-weight:700"
               >
               OUTSTANDING
            </td>
            <td
               style="border:none;color:#111111      ;font-size:12px;font-weight:400"
               >
               $XX.XX
            </td>
         </tr>
      </table>
        </td>
    </tr>
</table>
         
        

      <table>
      <tr>
      <td  style="border:none;color:#000000      ;font-size:10px;font-weight:400">
      For any queries, please contact First Last at email@email.com or 0428 100 000. 
      </td>
      </tr>
      </table>
  `,
          {
            tableAutoSize: true,
          }
        );
        console.log("val", val);
        var dd = { content: val };
        pdfMake.createPdf(dd).download();
      }, 500);
    },
  }));

  return <></>;
});

export default InvoiceModal;
