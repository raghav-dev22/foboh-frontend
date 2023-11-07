import React, { useState } from "react";
import Select from "react-select";
import OrderDetails from "../ViewCustomer/OrderDetails";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { ViewCustomerDetails } from "../schemas";
import { useFormik } from "formik";
import SaveCancel from "./SaveCancel";
function ViewCustomer() {
  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const location = useLocation();
  console.log(
    "params location for checking at view time>>",
    location?.state?.data
  );
  const [customerEdit, setCustomerEdit] = useState(true);
  const ordeItem = [
    {
      title: "Business name",
      SubTitle: "576 King St, Newtown NSW 2042",
      image: <SellIcon />,
    },
    {
      title: "Delivery address",
      SubTitle: "Plus pricing",
      image: <LocationOnIcon />,
    },
    {
      title: "ABN / Liquor licence",
      SubTitle: "12 345 678 910 ",
      image: <WorkIcon />,
    },

    {
      title: "Customer Status",
      SubTitle: "LIQO660011539",
      image: <PersonIcon />,
    },
  ];
  const [show, setShow] = useState(false);
  const initialValues = {
    buyerId: "",
    BusinessName: "",
    abn: "",
    liquorLicence: "",
    salesRepId: "",
    pricingProfileId: "",
    isActive: "",
  };
  const handleInputChange = () => {
    setShow(true);
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ViewCustomerDetails,
    onSubmit: (values) => {},
  });

  const handleCustomerTiles = () => {
    const buyID = location?.state?.data.buyerId;
    fetch(
      `https://customerfobohwepapi-fbh.azurewebsites.net/api/Customer/UpdateCustomerProfile/${buyID}`,
      {
        method: "POST",
        body: JSON.stringify({
          buyerId: buyID,
          BusinessName: values?.BusinessName,
          abn: values?.abn,
          liquorLicence: values?.liquorLicence,
          salesRepId: "",
          pricingProfileId: "",
          isActive: "1",
        }),
      }
        .than((response) => response.json())
        .than((data) => {
          console.log(data, "postdata");
        })
    );
  };

  return (
    <div className="px-6 padding-top-custom">
      {show === true ? (
        <SaveCancel handleCustomerTiles={handleCustomerTiles} />
      ) : null}
      <div className="py-8 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <Link to="/dashboard/customers">
            <div className="">
              <img src="/assets/previousBtn.png" alt="" />
            </div>
          </Link>
          <h4 className=" text-2xl font-semibold text-darkGreen">
            The Union Hotel
          </h4>
        </div>
        <div className=" flex-wrap	 flex judstify-center items-center gap-3">
          <button
            onClick={() => {
              setCustomerEdit(false);
            }}
            type="button"
            className="border-darkGreen shadow-md border rounded	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium gap-2	"
          >
            <div className="">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.586 1.58519C10.7705 1.39417 10.9912 1.2418 11.2352 1.13698C11.4792 1.03216 11.7416 0.976993 12.0072 0.974685C12.2728 0.972377 12.5361 1.02298 12.7819 1.12354C13.0277 1.2241 13.251 1.37261 13.4388 1.5604C13.6266 1.74818 13.7751 1.97148 13.8756 2.21728C13.9762 2.46307 14.0268 2.72643 14.0245 2.99199C14.0222 3.25755 13.967 3.51999 13.8622 3.76399C13.7574 4.008 13.605 4.22869 13.414 4.41319L12.621 5.20619L9.793 2.37819L10.586 1.58519ZM8.379 3.79219L0 12.1712V14.9992H2.828L11.208 6.62019L8.378 3.79219H8.379Z"
                  fill="#147D73"
                />
              </svg>
            </div>
            <h6 className="text-darkGreen">Edit</h6>
          </button>
          <Link to="/dashboard/supplier-order-management">
            <button
              type="button"
              className=" border rounded 	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium	gap-2 btn-animation"
            >
              <div className="">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.40791 11.25H8.59209V8.09209H11.75V6.90791H8.59209V3.75001H7.40791V6.90791H4.25001V8.09209H7.40791V11.25ZM8.00132 15C6.964 15 5.98897 14.8032 5.07624 14.4095C4.16348 14.0158 3.36952 13.4815 2.69435 12.8066C2.01916 12.1318 1.48464 11.3381 1.09078 10.4258C0.696928 9.51347 0.5 8.53864 0.5 7.50132C0.5 6.464 0.696843 5.48897 1.09053 4.57624C1.48421 3.66348 2.01849 2.86952 2.69336 2.19435C3.36824 1.51916 4.16186 0.984642 5.0742 0.590785C5.98653 0.196929 6.96136 0 7.99868 0C9.036 0 10.011 0.196843 10.9238 0.590529C11.8365 0.984214 12.6305 1.51849 13.3057 2.19336C13.9808 2.86824 14.5154 3.66186 14.9092 4.5742C15.3031 5.48653 15.5 6.46136 15.5 7.49868C15.5 8.536 15.3032 9.51102 14.9095 10.4238C14.5158 11.3365 13.9815 12.1305 13.3066 12.8057C12.6318 13.4808 11.8381 14.0154 10.9258 14.4092C10.0135 14.8031 9.03864 15 8.00132 15ZM8 13.8158C9.76316 13.8158 11.2566 13.204 12.4803 11.9803C13.704 10.7566 14.3158 9.26316 14.3158 7.5C14.3158 5.73684 13.704 4.24341 12.4803 3.01973C11.2566 1.79604 9.76316 1.18419 8 1.18419C6.23684 1.18419 4.74341 1.79604 3.51972 3.01973C2.29604 4.24341 1.68419 5.73684 1.68419 7.5C1.68419 9.26316 2.29604 10.7566 3.51972 11.9803C4.74341 13.204 6.23684 13.8158 8 13.8158Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h6 className="text-white">create order</h6>
            </button>
          </Link>
        </div>
      </div>
      {customerEdit === true ? (
        <div className="grid gap-4 lg:grid-cols-2 grid-cols-1 px-12">
          {ordeItem.map((item, index) => {
            return (
              <>
                <div
                  className={`address-box address-box-${index} bg-white rounded-lg border border-darkGreen shadow-md	 p-5`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                      {item?.image}
                    </div>
                    <h4 className="text-darkGreen font-bold	text-lg	">
                      {item?.title}
                    </h4>
                  </div>
                  <div className="">
                    <p className="text-green text-sm font-normal">
                      {item?.SubTitle}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <form onChange={handleInputChange}>
          <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 px-12">
            <div className={`relative`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                  <SellIcon />
                </div>
                <h4 className="text-darkGreen font-bold	text-lg	">
                  Business name
                </h4>
              </div>
              <input
                type="text"
                className="bg-white rounded-lg border border-darkGreen shadow-md	"
                placeholder="The Union Hotel"
                onBlur={handleBlur}
                name="BusinessName"
                onChange={handleChange}
                value={values?.BusinessName}
                style={{
                  border:
                    errors.BusinessName &&
                    touched.BusinessName &&
                    "1px solid red",
                }}
              />
              {errors.BusinessName && touched.BusinessName && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.BusinessName}
                </p>
              )}
              {errors.BusinessName && touched.BusinessName && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[55px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className={`relative`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                  <WorkIcon />
                </div>
                <h4 className="text-darkGreen font-bold	text-lg	">
                  ABN / Liquor licence
                </h4>
              </div>
              <div
                className="flex bg-white rounded-lg border border-darkGreen shadow-md relative"
                style={{
                  border:
                    errors.liquorLicence &&
                    touched.liquorLicence &&
                    "1px solid red",
                }}
              >
                <input
                  type="text"
                  className=" w-[50%]	mt-0 custom-form"
                  placeholder="-- --- --- ---"
                  onBlur={handleBlur}
                  name="abn"
                  onChange={handleChange}
                  value={values?.abn}
                />
                <p className="text-[#637381] absolute top-[50%] left-[50%] custom-absolute">
                  /
                </p>
                <input
                  type="text"
                  className="	w-[50%] mt-0  custom-form"
                  placeholder="-- --- --- ---"
                  onBlur={handleBlur}
                  name="liquorLicence"
                  onChange={handleChange}
                  value={values?.liquorLicence}
                />
              </div>
              {errors.abn && touched.abn && (
                <p className="mt-2 mb-2 text-red-500 font-sm text-xs">
                  {errors.abn}
                </p>
              )}
              {errors.abn && touched.abn && (
                <ErrorOutlineIcon className="absolute text-red-500 top-[55px] right-5 transition-all duration-[0.3s] " />
              )}
            </div>
            <div className={`relative`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                  <LocationOnIcon />
                </div>
                <h4 className="text-darkGreen font-bold	text-lg	">
                  Delivery address
                </h4>
              </div>
              <i className="text-normal font-normal text-[#2B4447]">
                Delivery address can be changed in the
                <br />
                <span className="font-bold ">Address</span> tab below
              </i>
            </div>
            <div className={``}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[25px] w-[25px] rounded-full bg-[#147D73] flex justify-center items-center order-tab-svg">
                  <PersonIcon />
                </div>
                <h4 className="text-darkGreen font-bold	text-lg	">
                  Customer Status
                </h4>
              </div>
              <Select
                options={options}
                placeholder="The Union Hotel"
                className="bg-white rounded-lg border border-[#e2e8f0] shadow-md custom-status	"
              />
            </div>
          </div>
        </form>
      )}

      <OrderDetails datas={location?.state?.data?.buyerId} />
    </div>
  );
}

export default ViewCustomer;
