import React, { useEffect, useState } from "react";

import Sort from "./Sort";

const stock = [
  { label: "In Stock", value: "inStock" },
  { label: "Low Stock", value: "lowStock" },
  { label: "Out of Stock", value: "outOfStock" },
];

const status = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "inactive" },
  { label: "Archived", value: "archived" },
];

let filterAndSort = {
  filter: {
    category: [],
    subcategory: [],
    stock: [],
    productStatus: [],
    visibility: true,
    page: 0,
  },
  sort: {
    sortBy: "",
    sortOrder: "asc",
  },
};

function SearchProduct({ products, setProducts, prevProducts }) {
  const [Open, setOpen] = useState(false);
  const [filterTextFirst, setFilterTextFirst] = useState(false);
  const [filterTextSecond, setFilterTextSecond] = useState(false);
  const [filterTextThird, setFilterTextThird] = useState(false);
  const [filterTextForth, setFilterTextForth] = useState(false);
  const [input, setInput] = useState("");
  const [selectedCatId, setSelectedCatId] = useState([]);
  const [categoryAndSubcategory, setCategoryAndSubcategory] = useState([]);
  const [selectedSubcatId, setSelectedSubcatId] = useState([]);
  const [itemLabel, setItemLabel] = useState("");
  const [showFilter, setShowFilter] = useState(false)



  const FirstDropdown = () => {
    setFilterTextFirst(!filterTextFirst);
    setFilterTextSecond(false);
    setFilterTextThird(false);
    setFilterTextForth(false);
  };
  const SecondDropdown = () => {
    setFilterTextFirst(false);
    setFilterTextSecond(!filterTextSecond);
    setFilterTextThird(false);
    setFilterTextForth(false);
  };
  const ThirdDropdown = () => {
    setFilterTextFirst(false);
    setFilterTextSecond(false);
    setFilterTextThird(!filterTextThird);
    setFilterTextForth(false);
  };
  const ForthDropdown = () => {
    setFilterTextFirst(false);
    setFilterTextSecond(false);
    setFilterTextThird(false);
    setFilterTextForth(!filterTextForth);
  };

  useEffect(() => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/ShowCategorySubcategory`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Category and Subcategory >>", data);

        console.log(
          "cat drop",
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );

        setCategoryAndSubcategory(
          data.map((i) => {
            return {
              categoryName: i.categoryName,
              categoryId: i.categoryId,
              subcategory: i.subcategoryId.map((c, n) => {
                return { name: i.subCategorys[n], id: c };
              }),
            };
          })
        );
      });
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Debouce function
  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput(name) {
    if (name === "filterAndSort") {
      fetch(
        "https://product-fobohwepapi-fbh.azurewebsites.net/api/product/Filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterAndSort),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.data);
          console.log("filter data table", data.data);
        })
        .catch((error) => console.log(error));
    } else {
      fetch(
        `https://product-fobohwepapi-fbh.azurewebsites.net/api/product/GetAllByTitle?search=${input}`,
        {
          method: "GET",
        }
      )
        .then((respose) => respose.json())
        .then((data) => {
          if (!data.status) {
            setProducts(data.data);
          } else {
            setProducts(prevProducts);
          }
        });
    }
  }
  const processChange = debounce((name) => saveInput(name));

  const toggleCategoryAndSubcategory = (e, id, name) => {
    console.log(id, name);
    if (name === "category") {
      setOpen(!Open);

      const newCategoryIds = e.target.checked
        ? [...filterAndSort.filter.category, id]
        : filterAndSort.filter.category.filter((catId) => catId !== id);

      const newFilter = {
        ...filterAndSort.filter,
        category: newCategoryIds,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };

    
    } else if (name === "subcategory") {
      const newSubcategoryIds = e.target.checked
        ? [...filterAndSort.filter.subcategory, id]
        : filterAndSort.filter.subcategory.filter(
            (subcatId) => subcatId !== id
          );

      const newFilter = {
        ...filterAndSort.filter,
        subcategory: newSubcategoryIds,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };

      
    } else if (name === "stock") {
      const newStockValues = e.target.checked
        ? [...filterAndSort.filter.stock, id]
        : filterAndSort.filter.stock.filter((stockValue) => stockValue !== id);

      console.log("stock", newStockValues);

      const newFilter = {
        ...filterAndSort.filter,
        stock: newStockValues,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };

    
    } else if (name === "status") {
      const newStatusValues = e.target.checked
        ? [...filterAndSort.filter.productStatus, id] // Replace id with the actual status value
        : filterAndSort.filter.productStatus.filter(
            (statusValue) => statusValue !== id
          );

      const newFilter = {
        ...filterAndSort.filter,
        productStatus: newStatusValues,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };

      
    } else if (name === "visibility") {
      const newVisibilityValue = id ? true : false;
      const newFilter = {
        ...filterAndSort.filter,
        visibility: newVisibilityValue,
      };

      filterAndSort = {
        ...filterAndSort,
        filter: newFilter,
      };

    }
    console.log(filterAndSort);

    processChange("filterAndSort");
  };

  const handleSortChange = (sortBy, sortOrder) => {
    console.log(sortBy, sortOrder);
    setItemLabel(sortBy);

    filterAndSort = {
      ...filterAndSort,
      sort: {
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    };

    processChange("filterAndSort");
    console.log("val", filterAndSort);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <>
      <div className=" border border-inherit bg-white h-full py-3	 px-4">
        <div className=" rounded-md gap-3	  sm:flex grid sm:justify-between items-center ">
          <div>
            <div className="relative 	">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onKeyUp={processChange}
                onChange={handleInputChange}
                type="search"
                id="default-search"
                className="block  shadow-md lg:w-96 w-full h-11 p-4 pl-10 text-sm text-gray-900 border  rounded-md  border-inherit  "
                placeholder="Search Mockups, Logos..."
                required=""
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div onClick={handleFilter} className="h-11	w-fit px-5 shadow-md cursor-pointer	border  border-inherit rounded-md flex items-center justify-center gap-2">
              <div className="">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.13131 2.44682C1.2458 2.2053 1.4931 2.05078 1.76513 2.05078H15.7395C16.0115 2.05078 16.2588 2.2053 16.3733 2.44682C16.4878 2.68833 16.4487 2.97292 16.273 3.17621L10.8485 9.45426V15.044C10.8485 15.281 10.7231 15.5011 10.5171 15.6257C10.3111 15.7503 10.0539 15.7616 9.83727 15.6556L7.0424 14.2879C6.80569 14.1721 6.65616 13.9353 6.65616 13.6763V9.45426L1.23161 3.17621C1.05596 2.97292 1.01682 2.68833 1.13131 2.44682ZM3.27108 3.41848L7.8884 8.76229C7.99507 8.88574 8.0536 9.04219 8.0536 9.20387V13.2536L9.45103 13.9375V9.20387C9.45103 9.04219 9.50956 8.88574 9.61623 8.76229L14.2335 3.41848H3.27108Z"
                    fill="#637381"
                  />
                </svg>
              </div>
              <h6 className="text-base	font-normal	text-gray">Filter</h6>
            </div>
            <Sort filterAndSort={filterAndSort} itemLabel={itemLabel} handleSortChange={handleSortChange} />
          </div>
        </div>
        {
          showFilter && (
            <div className="flex gap-8 relative  pt-4 flex-wrap">
          {/* <Category/> */}

          <div className="relative ">
            <div
              className="flex items-center gap-2 cursor-pointer product-category-box"
              onClick={FirstDropdown}
            >
              <h5 className="text-base font-medium	text-gray">Sub-category</h5>
              <div className="">
                <img
                  src="/assets/dropdownArrow.png"
                  alt=""
                />
              </div>
            </div>
            {filterTextFirst && (
              <div className=" z-10	left-0   w-max	 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
                <ul className="dropdown-content ">
                  {categoryAndSubcategory &&
                    categoryAndSubcategory.map((category, idx) => (
                      <li className="py-2.5	px-4	">
                        <div className="flex items-center">
                          <input
                            id={idx}
                            type="checkbox"
                            value={category.categoryId}
                            onClick={(e) =>
                              toggleCategoryAndSubcategory(
                                e,
                                category.categoryId,
                                "category"
                              )
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={idx}
                            className="ml-2 text-sm font-medium text-gray"
                          >
                            {category.categoryName}
                          </label>
                        </div>
                        <ul className="dropdown-content">
                          {category.subcategory.map((subcat) => (
                            <>
                              {filterAndSort.filter.category.includes(
                                category.categoryId
                              ) && (
                                <li className="py-2.5	px-4	">
                                  <div className="flex items-center">
                                    <input
                                      id={subcat.id}
                                      type="checkbox"
                                      onClick={(e) =>
                                        toggleCategoryAndSubcategory(
                                          e,
                                          subcat.id,
                                          "subcategory"
                                        )
                                      }
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      htmlFor={subcat.id}
                                      className="ml-2 text-sm font-medium text-gray cursor-pointer"
                                    >
                                      {subcat.name}
                                    </label>
                                  </div>
                                </li>
                              )}
                            </>
                          ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box"
              onClick={SecondDropdown}
            >
              <h5 className="text-base font-medium	text-gray">Stock</h5>
              <div className="">
                <img
                  src="/assets/dropdownArrow.png"
                  alt=""
                />
              </div>
            </div>
            {filterTextSecond && (
              <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
                <ul className="dropdown-content 	 ">
                  {stock.map((ele, idx) => (
                    <li className="py-2.5	px-4	">
                      <div className="flex items-center">
                        <input
                          id={`${ele.label}-${idx}`}
                          type="checkbox"
                          value={ele.value}
                          onClick={(e) =>
                            toggleCategoryAndSubcategory(e, ele.value, "stock")
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`${ele.label}-${idx}`}
                          className="ml-2 text-sm font-medium text-gray"
                        >
                          {ele.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box"
              onClick={ThirdDropdown}
            >
              <h5 className="text-base font-medium	text-gray">Status</h5>
              <div className="">
                <img
                  src="/assets/dropdownArrow.png"
                  alt=""
                />
              </div>
            </div>
            {filterTextThird && (
              <div className="z-10 left-0 w-60 absolute product-dropdown bg-white	shadow-md rounded-lg h-fit py-3	">
                <ul className="dropdown-content">
                  {status.map((sts) => (
                    <li className="py-2.5	px-4	">
                      <div className="flex items-center">
                        <input
                          id={sts.value}
                          type="checkbox"
                          value={sts.value}
                          onClick={(e) =>
                            toggleCategoryAndSubcategory(e, sts.value, "status")
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={sts.value}
                          className="ml-2 text-sm font-medium text-gray"
                        >
                          {sts.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-2 product-category-box"
              onClick={ForthDropdown}
            >
              <h5 className="text-base font-medium	text-gray">Visibility</h5>
              <div className="">
                <img
                  src="/assets/dropdownArrow.png"
                  alt=""
                />
              </div>
            </div>
            {filterTextForth && (
              <div className=" z-10	left-0   w-60 absolute product-dropdown bg-white	shadow-md rounded-lg	h-fit py-3	">
                <ul className="dropdown-content 	 ">
                  <li className="py-2.5	px-4	">
                    <div className="flex items-center">
                      <input
                        id="Visible"
                        type="checkbox"
                        onClick={(e) =>
                          toggleCategoryAndSubcategory(e, true, "visibility")
                        }
                        checked={filterAndSort.filter.visibility === true}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="Visible"
                        className="ml-2 text-sm font-medium text-gray"
                      >
                        Visible
                      </label>
                    </div>
                  </li>

                  <li className="py-2.5	px-4	">
                    <div className="flex items-center">
                      <input
                        id="Hidden"
                        type="checkbox"
                        onClick={(e) =>
                          toggleCategoryAndSubcategory(e, false, "visibility")
                        }
                        checked={filterAndSort.filter.visibility === false}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded       dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="Hidden"
                        className="ml-2 text-sm font-medium text-gray"
                      >
                        Hidden
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
          )
        }
        
      </div>
    </>
  );
}

export default SearchProduct;
