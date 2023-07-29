import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TableRange({products, setProducts}) {
  const tableItem = Array.from({ length: 8 });
  const [productId, setProductId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://product-api-foboh.azurewebsites.net/api/Product/get", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      }).catch(error => console.log(error))
  }, []);


  const handleProductId = (id) => {
    console.log("id >>>", id);
    navigate(`/dashboard/view-product/${id}`)
  }

  return (
    <>
      {products.map((product) => {
        return (
          <tr
            key={product.index}
            className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${product.index}`}
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  name={product.title}
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>

            <th
              scope="row"
              className="flex justify-start items-center gap-3 px-6 py-4 whitespace-nowrap dark:text-white"
            >
              <img
                src="http://localhost:3001/assets/defaultRange.png"
                alt=""
                className="object-contain	"
              />
              <h5 onClick={() => handleProductId(product.productId)} name={product.title} className="font-medium cursor-pointer whitespace-no-wrap text-gray">
                {" "}
                {product.title}
              </h5>
            </th>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                {" "}
                {product.skUcode}
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                {product.configuration}
              </h5>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal whitespace-no-wrap text-gray">
                ${product.globalPrice}
              </h5>
            </td>

            <td className="px-6 py-4">
              {" "}
              <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                <p className="text-green-dark font-normal		text-sm	">
                  In stock ({product.availableQty})
                </p>
              </div>
            </td>
            <td className="px-6 py-4 ">
              <p className="text-sm	font-normal		 whitespace-no-wrap text-gray">
                {product.stockStatus} <br /> {product.visibility ? 'visible' : ''}
              </p>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default TableRange;
