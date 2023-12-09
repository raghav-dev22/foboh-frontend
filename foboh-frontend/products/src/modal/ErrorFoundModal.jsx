import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import ImportProductModal from "./ImportProductModal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "better-react-carousel";
function ErrorFoundModal({
  show,
  setShow,
  importedProducts,
  previous,
  setErrorData,
  setAddedFile,
  errorData,
}) {
  // const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const showModal = () => {
    setShowPreviewModal(true);
    setShow(false);

    const prod = importedProducts.map((product) => {
      return {
        title: product.title,
        skUcode: product.skUcode,
        brand: product.brand,
        description: product.description,
        productImage: product.productImageUrls,
        globalPrice: product.globalPrice,
        createdBy: "",
        articleID: 0,
        skUcode: product.SkUcode,
        unitofMeasure: product.unitofMeasure,
        configuration: "",
        brand: product.brand,
        departmentId: product.departmentId,
        categoryId: product.categoryID,
        subCategoryId: product.subCategoryId,
        segmentId: product.segmentId,
        variety: product.variety ? product.variety.split(",") : [],
        vintage: product.vintage,
        abv: product.abv,
        luCcost: product.luCcost ? product.luCcost : 0,
        buyPrice: product.buyPrice ? product.buyPrice : 0,
        gstFlag: product.gstFlag,
        wetFlag: product.wetFlag,
      };
    });

    fetch(
      "https://product-fobohwepapi-fbh.azurewebsites.net/api/product/CreateUpdateBulkData",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          importedProducts.map((product) => {
            return {
              title: product.title,
              description: product.description,
              productImage: product.productImageUrls,
              globalPrice: parseInt(product.globalPrice),
              createdBy: "string",
              articleID: 0,
              skUcode: product.skUcode,
              unitofMeasure: product.unitofMeasure,
              configuration: "",
              brand: product.brand,
              departmentId: product.departmentId,
              innerUnitofMeasure: "",
              award: "",
              categoryId: product.categoryID,
              subCategoryId: product.subCategoryId,
              segmentId: product.segmentId,
              variety: product.variety ? product.variety.split(",") : [],
              vintage: product.vintage,
              abv: 0,
              luCcost: product.luCcost ? parseInt(product.luCcost) : 0,
              buyPrice: product.buyPrice ? parseInt(product.buyPrice) : 0,
              gstFlag: product.gstFlag === 1 ? true : false,
              wetFlag: product.wetFlag === 1 ? true : false,
              trackInventory: true,
              region: "string",
              availableQty: 0,
              stockThreshold: 0,
              stockStatus: "string",
              regionAvailability: ["string"],
              productStatus: "string",
              visibility: true,
              minimumOrder: 0,
              tags: ["string"],
              countryOfOrigin: "string",
              barcodes: "string",
              esgStatus: "string",
              healthRating: "string",
              isActive: true,
              category: "string",
              subCategory: "string",
              stock: "string",
              status: true,
            };
          })
        ),
      }
    )
      .then((response) => {
        // navigation logic here
      })
      .catch((error) => console.log(error));
  };
  const previousModal = () => {
    previous(true);
    setShowPreviewModal(false);
    setAddedFile(null);
    setErrorData([]);
  };
  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=""
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo=""
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[40] overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl	">
                  <div className="bg-white px-8 pb-8 pt-8 sm:p-6 sm:pb-4 rounded-t-lg">
                    <div className="sm:flex sm:items-center">
                      <div
                        className=" w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#FED4C7]"
                        style={{
                          background: "#FED4C7",
                          height: "48px",
                          width: "48px",
                          borderRadius: "100%",
                          border: "4px solid #FFE9E3",
                        }}
                      >
                        <WarningAmberIcon style={{ fill: "#DC3545" }} />
                      </div>
                      <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Errors found
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div
                        className="my-4 rounded-md	border-y	border-r	border-l-8	border-y-custom	border-left-red py-3 px-4 border-r-custom	"
                        style={{ background: "#FDF5F6" }}
                      >
                        <p className="text-sm font-normal">
                          <span className="font-bold">
                            {errorData?.length} products
                          </span>{" "}
                          have errors that need correcting before importing.
                          After you fix the errors, try importing the file again
                        </p>
                      </div>
                    </div>
                    <table
                      className="table-auto"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #EEEEEE",
                      }}
                    >
                      <thead
                        style={{
                          background: "#F9FAFB",
                          borderBottom: "1px solid #EEEEEE",
                        }}
                      >
                        <tr>
                          <th
                            className="font-semiBold text-sm  p-4"
                            style={{ width: "35px" }}
                          >
                            {" "}
                            Row
                          </th>
                          <th
                            className="font-semiBold text-sm p-4"
                            style={{ width: "105px" }}
                          >
                            Title
                          </th>
                          <th
                            className="font-semiBold text-sm p-4"
                            style={{ width: "140px" }}
                          >
                            Error location
                          </th>
                          <th
                            className="font-semiBold text-sm p-4"
                            style={{ width: "200px" }}
                          >
                            Error description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {errorData?.map((errors, errorRow) =>
                          errors.length ? (
                            <tr style={{ borderBottom: "1px solid #EEEEEE" }}>
                              <td className="font-medium text-sm p-4">
                                {errorRow + 1}
                              </td>

                              <td className="font-normal text-sm p-4">
                                {errors.join(", ")}
                              </td>
                              <td className="font-normal text-sm p-4">
                                Column: {errors.join(", ")}
                              </td>
                              <td className="font-normal text-sm p-4">
                                {errors.map((err, idx) => (
                                  <p>
                                    {idx + 1}: Missing{" "}
                                    <span className="font-semibold">{err}</span>
                                    , please add a valid{" "}
                                    <span className="font-semibold">{err}</span>
                                    .
                                  </p>
                                ))}
                              </td>
                            </tr>
                          ) : (
                            ""
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-white rounded-b-lg sm:flex grid gap-2 justify-end items-center  pb-6 px-8 ">
                    <div className="flex gap-3">
                      <button
                        className=" rounded-lg	border border-inherit py-2.5	px-5 w-full"
                        type="button"
                        onClick={() => previousModal()}
                      >
                        <h5 className="text-base	font-medium text-green	">
                          Back
                        </h5>
                      </button>
                      <button
                        className="rounded-lg	bg-custom-skyBlue py-2.5	px-5 w-full"
                        type="button"
                        onClick={() => previousModal()}
                        ref={cancelButtonRef}
                      >
                        <h5 className="text-base	font-medium text-white	">
                          Reload
                        </h5>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* <ImportProductModal
        show={showPreviewModal}
        setShow={(set) => setShowPreviewModal(set)}
      /> */}
    </>
  );
}

export default ErrorFoundModal;
