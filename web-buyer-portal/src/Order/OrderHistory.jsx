import React, { useState } from "react";
import { Table } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Dropdown, Space } from "antd";
import { Checkbox, Col, Row } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Tooltip } from "antd";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const columns = [
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Order ID</h5>,
    dataIndex: "OrderID",
    width: 100,
  },
  {
    title: (
      <h5 className="text-base font-semibold text-[#2B4447]">Order date</h5>
    ),
    dataIndex: "OrderDate",
    width: 140,
  },
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Items</h5>,
    dataIndex: "Items",
    width: 80,
  },
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Total</h5>,
    dataIndex: "Total",
    width: 120,
  },
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Payment</h5>,
    dataIndex: "Payment",
    width: 120,
  },
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Status</h5>,
    dataIndex: "Status",
    width: 150,
  },
  {
    title: <h5 className="text-base font-semibold text-[#2B4447]">Action</h5>,
    dataIndex: "Action",
    width: 120,
  },
];
const items = [
  {
    label: <Checkbox value="A">Oldest - Newest</Checkbox>,
    key: "0",
  },
  {
    label: <Checkbox value="A">Newest - Oldest</Checkbox>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <Checkbox value="A">Low - High</Checkbox>,
    key: "3",
  },
  {
    label: <Checkbox value="A">High - Low</Checkbox>,
    key: "4",
  },
];
const payments = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const status = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const date = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const details = <span className="text-[#7D7C7C] ">View Details</span>;
const Reorder = <span className="text-[#7D7C7C] ">Reorder</span>;
const DownloadInvoice = (
  <span className="text-[#7D7C7C] ">Download Invoice</span>
);
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    OrderID: <p className="text-base font-medium text-[#2B4447]">#23456</p>,
    OrderDate: (
      <p className="text-base font-medium text-[#2B4447]">19 / 11 / 2023</p>
    ),
    Items: <p className="text-base font-medium text-[#2B4447]">15</p>,
    Total: <p className="text-base font-medium text-[#2B4447]">$2345.00</p>,
    Payment: <p className="text-base font-medium text-[#2B4447]">Pending</p>,
    Status: (
      <div className="bg-[#D5EEFF] rounded-md py-[4px] px-[8px] max-w-max	  ">
        <p className="text-[#3498DB] text-[base] font-medium">Order placed</p>
      </div>
    ),
    Action: (
      <div className="flex justify-center gap-2 items-center ">
        <Tooltip placement="bottom" title={Reorder} color={"#DCDCDC"}>
          <svg
            width={23}
            height={25}
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0126 1.40142C10.061 1.39498 10.1055 1.37116 10.1377 1.3344C10.1699 1.29763 10.1876 1.25043 10.1876 1.20156V0.172217C10.1876 0.10791 10.1993 0 10.2774 0C10.3135 0 10.3605 0.0156738 10.4097 0.044043L14.1157 2.18374C14.201 2.23296 14.2313 2.28355 14.2313 2.31191C14.2313 2.34028 14.201 2.39087 14.1157 2.44014L10.4098 4.57974C10.3605 4.60815 10.3136 4.62383 10.2775 4.62383C10.1993 4.62383 10.1876 4.51592 10.1876 4.45156V3.65146C10.1876 3.62212 10.1812 3.59313 10.1689 3.56651C10.1565 3.5399 10.1385 3.5163 10.1161 3.49736C10.0937 3.47842 10.0674 3.46461 10.039 3.4569C10.0107 3.44919 9.98107 3.44777 9.95215 3.45273C7.84365 3.81235 5.9125 4.91333 4.5144 6.55283C3.10024 8.21118 2.32144 10.3232 2.32144 12.5C2.32144 15.4809 3.77817 18.2875 6.21826 20.0076C6.43862 20.1629 6.58535 20.3948 6.6313 20.6605C6.67725 20.9263 6.61704 21.194 6.46157 21.4144C6.36818 21.5467 6.2444 21.6546 6.10064 21.729C5.95689 21.8035 5.79735 21.8424 5.63545 21.8424C5.42747 21.8426 5.22459 21.7781 5.05488 21.6579C2.07896 19.56 0.302246 16.1365 0.302246 12.5C0.302246 6.91065 4.47681 2.13926 10.0126 1.40142ZM16.3688 4.33955C16.3911 4.4703 16.439 4.59533 16.5099 4.70741C16.5808 4.81948 16.6733 4.91638 16.7819 4.99248C19.2219 6.71255 20.6787 9.51914 20.6787 12.5C20.6787 14.6768 19.8999 16.7888 18.4857 18.4471C17.0876 20.0866 15.1565 21.1876 13.0479 21.5473C13.019 21.5522 12.9894 21.5507 12.9611 21.543C12.9328 21.5353 12.9065 21.5215 12.8841 21.5026C12.8617 21.4837 12.8436 21.4601 12.8313 21.4335C12.8189 21.4069 12.8125 21.3779 12.8125 21.3485V20.5484C12.8125 20.4841 12.8008 20.3761 12.7226 20.3761C12.6865 20.3761 12.6395 20.3918 12.5903 20.4202L8.88438 22.5599C8.79907 22.6092 8.7688 22.6597 8.7688 22.6881C8.7688 22.7165 8.79907 22.767 8.88438 22.8163L12.5903 24.956C12.6395 24.9843 12.6865 25 12.7226 25C12.7533 25 12.7663 24.989 12.7758 24.9772C12.7991 24.9481 12.8125 24.8937 12.8125 24.8277V23.7984C12.8125 23.6973 12.8873 23.6119 12.9874 23.5985C18.5232 22.8607 22.6978 18.0894 22.6978 12.5C22.6978 8.86353 20.9211 5.44009 17.9453 3.34219C17.7756 3.22194 17.5726 3.15745 17.3646 3.15767C17.2027 3.1577 17.0432 3.19659 16.8995 3.27106C16.7557 3.34553 16.6319 3.45341 16.5385 3.58564C16.4618 3.69384 16.4073 3.81619 16.3782 3.9456C16.349 4.07501 16.3459 4.20891 16.3688 4.33955ZM11.7016 12.6164V18.4353L16.7409 15.5259V9.70693L11.7016 12.6164ZM8.36465 12.0992L9.30039 12.6394V11.3464C9.30039 11.3442 9.30098 11.3421 9.30107 11.3398C9.30122 11.3355 9.30142 11.3311 9.30186 11.3267C9.3022 11.3225 9.30298 11.3183 9.30366 11.3142C9.30444 11.3094 9.30518 11.3046 9.3063 11.3C9.30827 11.2921 9.31068 11.2844 9.31353 11.2768C9.31523 11.2721 9.31689 11.2675 9.31895 11.263C9.32085 11.2589 9.323 11.255 9.3251 11.251C9.32607 11.2493 9.32651 11.2475 9.32749 11.2458C9.32852 11.244 9.32988 11.2427 9.33086 11.2411C9.33325 11.2372 9.33555 11.2333 9.33823 11.2297C9.34106 11.2257 9.34419 11.222 9.34736 11.2182C9.34995 11.215 9.35254 11.2119 9.35532 11.209C9.35815 11.206 9.36094 11.2031 9.36392 11.2003C9.36743 11.197 9.37109 11.194 9.37485 11.1909C9.37813 11.1883 9.38125 11.1856 9.38472 11.1831C9.38833 11.1805 9.39204 11.1781 9.39585 11.1758C9.39775 11.1746 9.39927 11.173 9.40117 11.1719L14.5413 8.2043L13.6056 7.66401L8.36465 10.6898V12.0992ZM6.46069 9.35772L8.16304 10.3405L13.2023 7.4311L11.5 6.44829L6.46069 9.35772ZM11.5 12.2672L16.5393 9.35772L14.9445 8.43701L9.90518 11.3464L11.5 12.2672ZM11.2984 12.6164L9.70361 11.6957V12.9886C9.7036 13.024 9.69428 13.0588 9.67659 13.0894C9.6589 13.12 9.63346 13.1455 9.60283 13.1632C9.57219 13.1809 9.53744 13.1902 9.50206 13.1902C9.46668 13.1902 9.43192 13.1809 9.40127 13.1633L8.0623 12.3902C8.03166 12.3725 8.00621 12.3471 7.98852 12.3164C7.97083 12.2858 7.96152 12.251 7.96152 12.2156V10.6898L6.25918 9.70698V15.5259L11.2985 18.4353V12.6164H11.2984Z"
              fill="#637381"
            />
          </svg>
        </Tooltip>

        <Tooltip placement="bottom" title={details} color={"#DCDCDC"}>
          {/* <Button>Bottom</Button> */}
          <RemoveRedEyeIcon style={{ fill: "#637381" }} />
        </Tooltip>
        <Tooltip placement="bottom" title={DownloadInvoice} color={"#DCDCDC"}>
          <FileDownloadOutlinedIcon style={{ fill: "#637381" }} />
        </Tooltip>
      </div>
    ),
  });
}
const OrderHistory = () => {
  const [Sort, setSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <div className=" md:w-4/5	w-full mx-auto md:p-0 ">
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-[#2B4447] ">
            Order History
          </h1>
        </div>
        <div className="border border-[#E7E7E7] rounded-[8px]   mb-6  p-5">
          <div className="flex justify-between items-center ">
            <div className="relative max-w-max	">
              <input
                className="border border-[#E7E7E7] py-2  rounded-md px-2"
                placeholder="Search|"
                type="search"
              />
              <SearchIcon
                className="absolute top-[8px] right-[8px] "
                style={{ fill: "rgb(164 169 174)" }}
              />
            </div>
            <div className="flex justify-between items-center gap-3">
              <button
                className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                onClick={() => {
                  setShowFilter(true);
                }}
              >
                <FilterAltOutlinedIcon style={{ fill: "#637381" }} />
                <p className="text-base font-normal text-[#2B4447]">Filter</p>
              </button>
              <div className="relative">
                <button
                  onClick={() => setSort(!Sort)}
                  className="border-[#E7E7E7] border rounded-md py-2 px-4 max-w-max flex justify-center items-center gap-2	"
                >
                  <SortOutlinedIcon style={{ fill: "#637381" }} />
                  <p className="text-base font-normal text-[#2B4447]">Sort</p>
                  <KeyboardArrowDownIcon
                    style={{ fill: "#2B4447" }}
                    className=""
                  />
                </button>

                {Sort && (
                  <>
                    <div className=" border border-[#E7E7E7] w-[262px] bg-white rounded-lg shadow-md p-4 z-50  absolute top-[50px] right-0">
                      <div className="flex justify-between items-center pb-2">
                        <h5 className="text-base font-medium text-[#2B4447] ">
                          Alphabetical
                        </h5>

                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>

                      <div className="pb-4 border-b border-[#E7E7E7]">
                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <h5 className="text-base font-medium text-[#2B4447] ">
                          Price
                        </h5>

                        <KeyboardArrowDownIcon style={{ fill: "#2B4447" }} />
                      </div>

                      <div className="pb-4 border-b border-[#E7E7E7]">
                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>

                        <div className="flex items-center mt-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                          />

                          <label htmlFor="default-checkbox" className="ml-2 ">
                            <h5 className="text-base font-normal text-[#637381]">
                              Option-1
                            </h5>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {showFilter && (
            <div className="flex justify-between items-center pt-5">
              <div className="flex justify-center items-center gap-5">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <h5 className="text-base font-medium text-[#637381]">
                      Payment <KeyboardArrowDownIcon className="ml-2" />
                    </h5>
                  </a>
                </Dropdown>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <h5 className="text-base font-medium text-[#637381]">
                      Status
                      <KeyboardArrowDownIcon className="ml-2" />
                    </h5>
                  </a>
                </Dropdown>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <h5 className="text-base font-medium text-[#637381]">
                      Date
                      <KeyboardArrowDownIcon className="ml-2" />
                    </h5>
                  </a>
                </Dropdown>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowFilter(false);
                }}
              >
                <h5 className="font-medium text-base text-[#DC3545] border-b border-b-[#DC3545]">
                  Clear Filters
                </h5>
              </div>
            </div>
          )}
        </div>
        <div
          className="border border-[#E0E0E0] rounded-[8px] mb-8
    "
        >
          <Table
            columns={columns}
            dataSource={data}
            showSizeChanger={false}
            pagination={{
              showSizeChanger: false,
            }}
            scroll={{
              y: 240,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default OrderHistory;
