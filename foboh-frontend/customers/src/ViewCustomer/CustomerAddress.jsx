import React from "react";

const ordeItem = [
  {
    title: "Delivery address",
    SubTitle: "576 King St, Newtown NSW 2042",
  },
  {
    title: "Pricing profile",
    SubTitle: "Plus pricing",
  },
  {
    title: "ABN",
    SubTitle: "12 345 678 910 ",
  },
  {
    title: "Supplier rep",
    SubTitle: "Jessica Smith",
  },
  {
    title: "Freight profile",
    SubTitle: "Regional - NSW",
  },
  {
    title: "Liquor licence",
    SubTitle: "LIQO660011539",
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
                <div className="">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.91101 19.877L15.286 15.502L19.661 6.12695L10.286 10.502L5.91101 19.877ZM12.786 14.252C12.4318 14.252 12.135 14.1322 11.8954 13.8926C11.6558 13.653 11.536 13.3561 11.536 13.002C11.536 12.6478 11.6558 12.3509 11.8954 12.1113C12.135 11.8717 12.4318 11.752 12.786 11.752C13.1402 11.752 13.4371 11.8717 13.6766 12.1113C13.9162 12.3509 14.036 12.6478 14.036 13.002C14.036 13.3561 13.9162 13.653 13.6766 13.8926C13.4371 14.1322 13.1402 14.252 12.786 14.252ZM12.786 25.502C11.0568 25.502 9.43184 25.1738 7.91101 24.5176C6.39018 23.8613 5.06726 22.9707 3.94226 21.8457C2.81726 20.7207 1.92664 19.3978 1.27039 17.877C0.614136 16.3561 0.286011 14.7311 0.286011 13.002C0.286011 11.2728 0.614136 9.64779 1.27039 8.12695C1.92664 6.60612 2.81726 5.2832 3.94226 4.1582C5.06726 3.0332 6.39018 2.14258 7.91101 1.48633C9.43184 0.830078 11.0568 0.501953 12.786 0.501953C14.5152 0.501953 16.1402 0.830078 17.661 1.48633C19.1818 2.14258 20.5048 3.0332 21.6298 4.1582C22.7548 5.2832 23.6454 6.60612 24.3016 8.12695C24.9579 9.64779 25.286 11.2728 25.286 13.002C25.286 14.7311 24.9579 16.3561 24.3016 17.877C23.6454 19.3978 22.7548 20.7207 21.6298 21.8457C20.5048 22.9707 19.1818 23.8613 17.661 24.5176C16.1402 25.1738 14.5152 25.502 12.786 25.502Z"
                      fill="#147D73"
                    />
                  </svg>
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
