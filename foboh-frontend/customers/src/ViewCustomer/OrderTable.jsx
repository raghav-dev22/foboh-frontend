import React, { useEffect, useState } from "react";

function OrderTable() {
  const tableItem = Array.from({ length: 8 });
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetch("https://product-api-foboh.azurewebsites.net/api/Product/get", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      });
  }, []);


  const handleProductId = (e) => {
    console.log( e.target.name, e.target.value);
  }

  return (
    <>
      {products.map((product) => {
        return (
          <tr
            key={product.index}
            className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${product.index}`}
          >
          

            <td
              
              className=" px-6 py-4 "
            >
            
              <h5 className="font-medium whitespace-no-wrap text-gray">
                {" "}
                {product.title}
              </h5>
            </td>
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
                {product.stockStatus}
              </p>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default OrderTable;
