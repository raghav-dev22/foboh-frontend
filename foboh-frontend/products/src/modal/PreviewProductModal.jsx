import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ImportProductModal from "./ImportProductModal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "better-react-carousel";
function PreviewProductModal({
  show,
  setShow,
  importedProducts,
  previous,
  setErrorData,
  setAddedFile,
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
    console.log(importedProducts, "importedProducts");
    console.log("prod", prod);

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
        // console.log("Bulk-import-data-response->", response);
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                      <div className="">
                        <img src="/assets/downloadBtn.png" alt="" />
                      </div>
                      <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Preview products
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="my-4 rounded-md	border-y	border-r	border-l-8	border-y-custom	border-left-blue py-3 px-4 border-r-custom	">
                        <p className="text-sm font-normal">
                          You are importing X products into FOBOH. You have
                          chosen to overwrite any existing products that have
                          the same SKU. If this preview doesn’t look right
                          please update the file and try again.
                        </p>
                      </div>
                    </div>
                    <Carousel cols={1} rows={1} gap={10} mobileBreakpoint={0}>
                      {importedProducts.map((product, index) => (
                        <Carousel.Item>
                          <div className="text-center w-full py-2 bg-[#F8FAFC]">
                            <p className="text-sm font-bold text-[#147D73]">
                              PRODUCT {index + 1}
                            </p>
                          </div>
                          <div
                            style={{ height: "150px" }}
                            className="relative px-6 py-3 overflow-y-auto "
                          >
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">Title</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {product.title}
                              </p>
                            </div>
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">skUcode</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {product.skUcode}
                              </p>
                            </div>
                            <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                              <p className="text-sm font-semibold">brand</p>
                              <p className="text-sm font-normal text-lightGreen">
                                {product.brand}
                              </p>
                            </div>
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    {/* <div
                      style={{ height: "100px" }}
                      className="relative px-6 py-3 overflow-y-auto "
                    >
                      {importedProducts.map((product) => (
                        <div className="flex justify-between items-center py-3 px-3 border-inherit border-y">
                          <p className="text-sm font-semibold">Title</p>
                          <p className="text-sm font-normal text-lightGreen">
                            {product.title}{" "}
                          </p>
                        </div>
                      ))}
                    </div> */}
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
                        onClick={showModal}
                        ref={cancelButtonRef}
                      >
                        <h5 className="text-base	font-medium text-white	">
                          {" "}
                          Import
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

      <ImportProductModal
        show={showPreviewModal}
        setShow={(set) => setShowPreviewModal(set)}
      />
    </>
  );
}

export default PreviewProductModal;
