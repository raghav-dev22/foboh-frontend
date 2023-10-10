import React from "react";
import SellIcon from "@mui/icons-material/Sell";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WineBarIcon from "@mui/icons-material/WineBar";
const ordeItem = [
  {
    title: "Delivery address",
    SubTitle: "576 King St, Newtown NSW 2042",
    image: <SellIcon />,
  },
  {
    title: "Pricing profile",
    SubTitle: "Plus pricing",
    image: <SellIcon />,
  },
  {
    title: "ABN",
    SubTitle: "12 345 678 910 ",
    image: <WorkIcon />,
  },
  {
    title: "Supplier rep",
    SubTitle: "Jessica Smith",
    image: <PersonIcon />,
  },
  {
    title: "Freight profile",
    SubTitle: "Regional - NSW",
    image: <LocalShippingIcon />,
  },
  {
    title: "Liquor licence",
    SubTitle: "LIQO660011539",
    image: <WineBarIcon />,
  },
];
function CustomerAddress() {
  // const orderItem=ordeItem.from({ length: 6 });
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1 px-12">
        {ordeItem.map((item, index) => {
          return (
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
          );
        })}
      </div>
    </>
  );
}

export default CustomerAddress;
