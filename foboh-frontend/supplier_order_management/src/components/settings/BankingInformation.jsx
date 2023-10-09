import React from "react";
import { Select } from "antd";
const BankingInformation = () => {
  return (
    <>
      <div className="bank-information-page">
        <div className="py-6 px-6">
          <h4 className="text-xl font-semibold text-[#2B4447]">
            Set up banking Information
          </h4>
        </div>
        <div className="lg:flex gap-5 px-6 ">
          <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
            <div className="border border-[#E7E7E7] rounded-md bg-white h-[423px] overflow-y-scroll">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447]">
                  Business Details
                </h5>
              </div>
              <div className="py-6 px-6">
                <form action="">
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Business type
                    </label>
                    <Select
                      className="mt-[3px]"
                      showSearch
                      style={{
                        width: "100%",
                        height: "48px",
                      }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={[
                        {
                          value: "1",
                          label: "Individual",
                        },
                        {
                          value: "2",
                          label: "sole trader",
                        },
                        {
                          value: "3",
                          label: "Company",
                        },
                        {
                          value: "4",
                          label: "Nonprofit",
                        },
                        {
                          value: "5",
                          label: "Partnership",
                        },
                      ]}
                    />
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 ">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Legal business name
                      </label>
                      <input
                        disabled
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Business Name PVT LTD"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        ACN/ABN
                      </label>
                      <input
                        disabled
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="XX XXX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Business address
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Apartment , Street Name , etc."
                    />
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Suburb
                      </label>
                      <Select
                        className="mt-[3px]"
                        showSearch
                        style={{
                          width: "100%",
                          height: "48px",
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: "Not Identified",
                          },
                          {
                            value: "2",
                            label: "Closed",
                          },
                          {
                            value: "3",
                            label: "Communicated",
                          },
                          {
                            value: "4",
                            label: "Identified",
                          },
                          {
                            value: "5",
                            label: "Resolved",
                          },
                          {
                            value: "6",
                            label: "Cancelled",
                          },
                        ]}
                      />
                      {/* <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Lo-Fi Wines"
                      /> */}
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Postcode
                      </label>
                      <input
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="XXXX"
                      />
                    </div>
                  </div>
                  <div className="flex flex-nowrap gap-2">
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        State
                      </label>
                      <Select
                        className="mt-[3px]"
                        showSearch
                        style={{ width: "100%", height: "48px" }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: "Not Identified",
                          },
                          {
                            value: "2",
                            label: "Closed",
                          },
                          {
                            value: "3",
                            label: "Communicated",
                          },
                          {
                            value: "4",
                            label: "Identified",
                          },
                          {
                            value: "5",
                            label: "Resolved",
                          },
                          {
                            value: "6",
                            label: "Cancelled",
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        className="block text-[#2B4447] text-base font-medium mb-2"
                        htmlFor="username"
                      >
                        Country
                      </label>
                      <input
                        disabled
                        className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Australia "
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 gap-5 h-[423px] overflow-y-scroll	">
            <div className="border border-[#E7E7E7] rounded-md mb-6 bg-white ">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447] mb-2">
                  Banking information
                </h5>
                <p className="text-sm font-medium text-[#637381] leading-[20px]">
                  Nominate your bank account for fund deposit.
                </p>
              </div>
              <div className="py-6 px-6">
                <form action="">
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Bank State Branch (BSB) number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="XXY-ZZZ"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Account number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="XXXXXX YYYYYYY ZZZ"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="border border-[#E7E7E7] rounded-md bg-white">
              <div className="px-6 py-3 border-b border-[#E7E7E7]">
                <h5 className="text-base font-medium text-[#2B4447] mb-2">
                  Customer billing statement
                </h5>
                <p className="text-sm font-medium text-[#637381] leading-[20px]">
                  This information will be shown on the buyer’s card statements.{" "}
                </p>
              </div>
              <div className="py-6 px-6">
                <form action="">
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Statement descriptor
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Trade Name Inc."
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-[#2B4447] text-base font-medium mb-2"
                      htmlFor="username"
                    >
                      Phone number
                    </label>
                    <input
                      className="appearance-none border rounded-[6px] w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="04XX XXX XXX / +61 4XX XXX XXX
                      "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6">
          <h4 className="text-xl font-semibold  text-[#2B4447]">
            Terms and Conditions
          </h4>
          <p className="mt-3 text-sm font-medium text-[#637381]">
            By using FOBOH Payments you agree to the Payments terms of service.
          </p>
        </div>
      </div>
    </>
  );
};

export default BankingInformation;
