import { Children, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Select from "react-select";
function CustomerBulkEdit() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [defaultPaymentTerm, setDefaultPaymentTerm] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedData,setSelectedData]=useState([]);
  useLayoutEffect(() => {
    getDatafromLocal()
  }, [])
  const getDatafromLocal = async() => {
    const data=await localStorage.getItem('selectedCustomers');
    if(data){
      setSelectedData(JSON.parse(data))
    }
  }

  const initialValues = [
    {
      supplierRep: {},
      pricingProfile: {},
      freightProfile: {},
      defaultPaymentMethod: {},
      defaultPaymenterm: {},
    },
  ];

  useEffect(() => {
      axios
        .get('https://masters-api-foboh.azurewebsites.net/api/PaymentMethods')
        .then((response) => {
          setPaymentMethods(response.data.map(method => {
            return {
              label: method.name,
              value : method.paymentMethodId
            }
          }));
        })
        .catch((error) => {
          console.error('Error fetching PaymentMethods:', error);
        });
   
      axios
      .get('https://masters-api-foboh.azurewebsites.net/api/DefaultPaymentTerm')
      .then((response) => {
        setDefaultPaymentTerm(response.data.map(payment =>{
          return{
            label: payment.paymentTermName,
            value: payment.id
          }
        }));
      })
      .catch((error) => {
        console.error('Error fetching DefaultPaymentTerm:', error);
      });
 
      const selectedProductsValue = selectedData.map((customer) => {

        return {
    
          supplierRep: product?.supplierRep,
    
          pricingProfile: product?.pricingProfile,
    
          freightProfile: product?.freightProfile,
    
          defaultPaymentMethod: product?.defaultPaymentMethod,
    
          defaultPaymenterm: product?.defaultPaymenterm,
    
        };
    
      });
  }, []); 
  
  const handleFieldChange = (productId, title, value) => {
    setIsUpdate(true);
  };
  const handleCancle = () => {
    setIsUpdate(false)
 };
  


  return (
    <>
      {isUpdate && (
        <div className="2xl:container 2xl:mx-auto absolute z-50 top-0 right-0 left-0">
          <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
            <div className="block">
              <nav className="flex h-[65px] items-center justify-end gap-5 ">
                <button className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
                <button
                  // onClick={handleSubmit}
                  className="rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	"
                >
                  Save
                </button>
              </nav>
            </div>
          </div>
          {/* <AlertModal show={show} setShow={(set) => setShow(set)} /> */}
        </div>
      )}
      <div className="py-8 flex flex-col items-start justify-start px-6 gap-5">
        <div className="flex justify-start gap-3 items-center">
          <div
            onClick={() => navigate("/dashboard/customers")}
            className="cursor-pointer"
          >
            <img src="/assets/previousBtn.png" alt="" />
          </div>
          <div className="">
            <h4 className=" text-2xl font-semibold text-darkGreen">
              Customer Bulk edit
            </h4>
            <p className="text-gray font-normal text-sm">
              Editing X selected products
            </p>
          </div>
        </div>
        <div
          className={`relative overflow-x-auto overflow-y-auto no-scrollbar shadow-md sm:rounded-lg rounded-md border border-inherit bg-white  w-full`}
          style={{ height: "530px" }}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" border-b">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base"
                >
                  supplier rep
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  pricing profile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                 freight profile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  default payment method
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green	font-medium text-base	"
                >
                  default payment term
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((product, index) => {
                return (
                  <tr
                    key={index.toString()}
                    className={`bg-white border-b  dark:border-gray-700   tableNo-${index}`}
                  >
                    <th
                      scope="row"
                      className=" whitespace-nowrap dark:text-white"
                    >
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          // options={configurations}
                          value={product.state}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "configuration",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    </th>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          // options={configurations}
                          value={product.state}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "configuration",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          // options={configurations}
                          value={product.state}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "configuration",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          // options={configurations}
                          options={paymentMethods}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "configuration",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>

                    <td className={`px-6 py-4 selectId-${index}`}>
                      <div className="w-44">
                        <Select
                          name="colors"
                          options={defaultPaymentTerm}
                          value={product.state}
                          onChange={(e) =>
                            handleFieldChange(
                              product.productId,
                              "configuration",
                              e
                            )
                          }
                          className="basic-multi-select-2 "
                          classNamePrefix="select"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default CustomerBulkEdit;
// https://masters-api-foboh.azurewebsites.net/api/PaymentMethods
// https://masters-api-foboh.azurewebsites.net/api/DefaultPaymentTerm