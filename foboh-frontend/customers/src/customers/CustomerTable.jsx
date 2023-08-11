import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function CustomerTable() {
  const navigate = useNavigate();
  const [tableRecords, setTableRecords] = useState([{
    "_id": {
      "$oid": "64b6a8932041878785ee4a49"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-07-18T14:58:27.252Z"
    },
    "ModifiedDate": {
      "$date": "2023-07-18T14:58:27.252Z"
    },
    "CustomerId": "7649281426",
    "BusinessName": "KOTRA SOLN",
    "ABN": "KOL252228255",
    "LiquorLicence": "2210005",
    "SalesRepId": "NUTAN SINGH",
    "PricingProfileId": "01252",
    "DefaultPaymentMethodId": "CASH",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "VIMAL",
    "OrderingLastName": "KUMAR",
    "OrderingMobile": "9882200052",
    "OrderingEmail": "VIMAL@GMAIL.COM",
    "DeliveryFirstName": "SULTAN",
    "DeliveryLastName": "SINGH",
    "DeliveryMobile": "8820588888",
    "DeliveryEmail": "SULTAN@GMAIL.COM",
    "Address": "FLAT 111, ",
    "Apartment": "KAL APARTMENT",
    "Suburb": "DELHO",
    "PostalCode": "110075",
    "State": "NEW DELHI",
    "DeliveryNotes": "string",
    "BillingAddress": "HNO 101, RAJ NAGAR",
    "BillingApartment": "string",
    "BillingSuburb": "NEW DELHI",
    "BillingPostalCode": "110085",
    "BillingState": "NEW DELHI",
    "IsActive": 1
  },
  {
    "_id": {
      "$oid": "64b6bdd4a631d5f7b9058af9"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-07-18T16:29:08.653Z"
    },
    "ModifiedDate": {
      "$date": "2023-07-18T16:36:54.363Z"
    },
    "CustomerId": "2786609951",
    "BusinessName": "ABN Corporation",
    "ABN": "lkhhhhh555",
    "LiquorLicence": "11125588",
    "SalesRepId": "SALES1256",
    "PricingProfileId": "string",
    "DefaultPaymentMethodId": "string",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "Kuldeep",
    "OrderingLastName": "Singh",
    "OrderingMobile": "9999850125",
    "OrderingEmail": "Kuldeep@gmail.com",
    "DeliveryFirstName": "Kuldeep",
    "DeliveryLastName": "kumar",
    "DeliveryMobile": "9999850125",
    "DeliveryEmail": "Kuldeepkumar@gmail.com",
    "Address": "Address 2",
    "Apartment": "string",
    "Suburb": "string",
    "PostalCode": "110085",
    "State": "New Delhi",
    "DeliveryNotes": "Home delivery option available",
    "BillingAddress": "HNO 540, RAJNGAR",
    "BillingApartment": "string",
    "BillingSuburb": "NEW DELHI",
    "BillingPostalCode": "110090",
    "BillingState": "string",
    "IsActive": 1
  },
  {
    "_id": {
      "$oid": "64b6c52ad169d70bfba1ca0e"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-07-18T17:00:26.230Z"
    },
    "ModifiedDate": {
      "$date": "2023-07-18T17:00:26.236Z"
    },
    "CustomerId": "7905355903",
    "BusinessName": "tata corp",
    "ABN": "amubc50",
    "LiquorLicence": "2258822",
    "SalesRepId": "1411",
    "PricingProfileId": "string",
    "DefaultPaymentMethodId": "cash",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "Jaspreet",
    "OrderingLastName": "singh",
    "OrderingMobile": "string",
    "OrderingEmail": "string",
    "DeliveryFirstName": "string",
    "DeliveryLastName": "string",
    "DeliveryMobile": "string",
    "DeliveryEmail": "string",
    "Address": "string",
    "Apartment": "string",
    "Suburb": "string",
    "PostalCode": "string",
    "State": "string",
    "DeliveryNotes": "string",
    "BillingAddress": "string",
    "BillingApartment": "string",
    "BillingSuburb": "string",
    "BillingPostalCode": "string",
    "BillingState": "string",
    "IsActive": 0
  },
  {
    "_id": {
      "$oid": "64cb77ebe5036d2998f450f6"
    },
    "CreatedBy": "string",
    "CreatedDate": {
      "$date": "2023-08-03T09:54:43.039Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T09:54:43.039Z"
    },
    "CustomerId": "424252525",
    "BusinessName": "2525",
    "ABN": "3252523",
    "LiquorLicence": "efsefs",
    "SalesRepId": "sdfs",
    "PricingProfileId": "sdgdsg",
    "DefaultPaymentMethodId": "sgsg",
    "Tags": "sgsgs",
    "WETLiable": true,
    "OrderingFirstName": "dgdggddd",
    "OrderingLastName": "ggggg",
    "OrderingMobile": "bbb",
    "OrderingEmail": "bfff@gmail.com",
    "DeliveryFirstName": "abc",
    "DeliveryLastName": "rffff",
    "DeliveryMobile": "dddd",
    "DeliveryEmail": "ddd",
    "Address": "cxvxvxv",
    "Apartment": "njgjfjf",
    "Suburb": "gjfjfj",
    "PostalCode": "hfhff",
    "State": null,
    "DeliveryNotes": null,
    "BillingAddress": null,
    "BillingApartment": null,
    "BillingSuburb": null,
    "BillingPostalCode": null,
    "BillingState": null,
    "IsActive": true
  },
  {
    "_id": {
      "$oid": "64cb7d71420cac28e4a669c1"
    },
    "CreatedBy": "nadeem",
    "CreatedDate": {
      "$date": "2023-08-03T10:11:22.464Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T10:11:22.464Z"
    },
    "CustomerId": "akh001",
    "BusinessName": "API",
    "ABN": "string",
    "LiquorLicence": "string",
    "SalesRepId": "string",
    "PricingProfileId": "string",
    "DefaultPaymentMethodId": "string",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "string",
    "OrderingLastName": "string",
    "OrderingMobile": "string",
    "OrderingEmail": "string",
    "DeliveryFirstName": "string",
    "DeliveryLastName": "string",
    "DeliveryMobile": "string",
    "DeliveryEmail": "string",
    "Address": "string",
    "Apartment": "string",
    "Suburb": "string",
    "PostalCode": "string",
    "State": "string",
    "DeliveryNotes": "string",
    "BillingAddress": "string",
    "BillingApartment": "string",
    "BillingSuburb": "string",
    "BillingPostalCode": "string",
    "BillingState": "string",
    "IsActive": true
  },
  {
    "_id": {
      "$oid": "64cbbea46723fa128f686193"
    },
    "CreatedBy": "abdul",
    "CreatedDate": {
      "$date": "2023-08-03T14:49:48.631Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T14:49:48.631Z"
    },
    "CustomerId": "23232424",
    "BusinessName": "sssss",
    "ABN": "string",
    "LiquorLicence": "string",
    "SalesRepId": "string",
    "PricingProfileId": "string",
    "DefaultPaymentMethodId": "string",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "string",
    "OrderingLastName": "string",
    "OrderingMobile": "string",
    "OrderingEmail": "string",
    "DeliveryFirstName": "string",
    "DeliveryLastName": "string",
    "DeliveryMobile": "string",
    "DeliveryEmail": "string",
    "Address": "string",
    "Apartment": "string",
    "Suburb": "string",
    "PostalCode": "string",
    "State": "string",
    "DeliveryNotes": "string",
    "BillingAddress": "string",
    "BillingApartment": "string",
    "BillingSuburb": "string",
    "BillingPostalCode": "string",
    "BillingState": "string",
    "IsActive": true
  },
  {
    "_id": {
      "$oid": "64cbd6b2662470efda1d7a9a"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-08-03T16:32:50.884Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T16:32:50.884Z"
    },
    "CustomerId": "2596808845",
    "BusinessName": "string",
    "ABN": "string",
    "LiquorLicence": "string",
    "SalesRepId": "string",
    "PricingProfileId": "string",
    "DefaultPaymentMethodId": "string",
    "Tags": "string",
    "WETLiable": true,
    "OrderingFirstName": "string",
    "OrderingLastName": "string",
    "OrderingMobile": "string",
    "OrderingEmail": "string",
    "DeliveryFirstName": "string",
    "DeliveryLastName": "string",
    "DeliveryMobile": "string",
    "DeliveryEmail": "string",
    "Address": "string",
    "Apartment": "string",
    "Suburb": "string",
    "PostalCode": "string",
    "State": "string",
    "DeliveryNotes": "string",
    "BillingAddress": "string",
    "BillingApartment": "string",
    "BillingSuburb": "string",
    "BillingPostalCode": "string",
    "BillingState": "string",
    "IsActive": 0
  },
  {
    "_id": {
      "$oid": "64cbded4662470efda1d7a9b"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-08-03T17:07:32.851Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T17:07:32.851Z"
    },
    "CustomerId": "1045373330",
    "BusinessName": "test",
    "ABN": "",
    "LiquorLicence": "",
    "SalesRepId": "245",
    "PricingProfileId": "245",
    "DefaultPaymentMethodId": "245",
    "Tags": "245",
    "WETLiable": true,
    "OrderingFirstName": "jhg",
    "OrderingLastName": "jhgjh",
    "OrderingMobile": "jh",
    "OrderingEmail": "jkh",
    "DeliveryFirstName": "fgdh",
    "DeliveryLastName": "fdgh",
    "DeliveryMobile": "jkjh",
    "DeliveryEmail": "mg",
    "Address": "hjgf",
    "Apartment": "jkhgf",
    "Suburb": "kljh",
    "PostalCode": "kljhg",
    "State": "klj",
    "DeliveryNotes": "jh",
    "BillingAddress": "jhfg",
    "BillingApartment": "jkj",
    "BillingSuburb": "y",
    "BillingPostalCode": "hgf",
    "BillingState": "iuytr",
    "IsActive": 0
  },
  {
    "_id": {
      "$oid": "64cbe122662470efda1d7a9c"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-08-03T17:17:22.551Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T17:17:22.551Z"
    },
    "CustomerId": "2060432150",
    "BusinessName": "vikas",
    "ABN": "tiwriabh",
    "LiquorLicence": "vikaslic",
    "SalesRepId": "234",
    "PricingProfileId": "333",
    "DefaultPaymentMethodId": "33",
    "Tags": "33",
    "WETLiable": true,
    "OrderingFirstName": "vikas",
    "OrderingLastName": "vikas",
    "OrderingMobile": "vikas",
    "OrderingEmail": "vikas",
    "DeliveryFirstName": "vikas",
    "DeliveryLastName": "vikas",
    "DeliveryMobile": "vikas",
    "DeliveryEmail": "v",
    "Address": "vikas",
    "Apartment": "vikas",
    "Suburb": "vikas",
    "PostalCode": "vikas",
    "State": "punjab",
    "DeliveryNotes": "notes",
    "BillingAddress": "add",
    "BillingApartment": "aprt",
    "BillingSuburb": "surpb",
    "BillingPostalCode": "14004",
    "BillingState": "hh",
    "IsActive": 0
  },
  {
    "_id": {
      "$oid": "64cbe181662470efda1d7a9d"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-08-03T17:18:57.751Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T17:18:57.751Z"
    },
    "CustomerId": "8513792065",
    "BusinessName": "test",
    "ABN": "",
    "LiquorLicence": "",
    "SalesRepId": "245",
    "PricingProfileId": "245",
    "DefaultPaymentMethodId": "245",
    "Tags": "245",
    "WETLiable": true,
    "OrderingFirstName": "jhg",
    "OrderingLastName": "jhgjh",
    "OrderingMobile": "jh",
    "OrderingEmail": "jkh",
    "DeliveryFirstName": "fgdh",
    "DeliveryLastName": "fdgh",
    "DeliveryMobile": "jkjh",
    "DeliveryEmail": "mg",
    "Address": "hjgf",
    "Apartment": "jkhgf",
    "Suburb": "kljh",
    "PostalCode": "kljhg",
    "State": "klj",
    "DeliveryNotes": "jh",
    "BillingAddress": "jhfg",
    "BillingApartment": "jkj",
    "BillingSuburb": "y",
    "BillingPostalCode": "hgf",
    "BillingState": "iuytr",
    "IsActive": 0
  },
  {
    "_id": {
      "$oid": "64cbe34a662470efda1d7a9e"
    },
    "CreatedBy": null,
    "CreatedDate": {
      "$date": "2023-08-03T17:26:34.711Z"
    },
    "ModifiedDate": {
      "$date": "2023-08-03T17:26:34.711Z"
    },
    "CustomerId": "2568057153",
    "BusinessName": "test",
    "ABN": "vikas test",
    "LiquorLicence": "vikas john",
    "SalesRepId": "245",
    "PricingProfileId": "245",
    "DefaultPaymentMethodId": "245",
    "Tags": "245",
    "WETLiable": true,
    "OrderingFirstName": "jhgss",
    "OrderingLastName": "jhgjhss",
    "OrderingMobile": "s",
    "OrderingEmail": "jkhss",
    "DeliveryFirstName": "fgdh",
    "DeliveryLastName": "fdgh",
    "DeliveryMobile": "jkjhsss",
    "DeliveryEmail": "mgsss",
    "Address": "hjgfss",
    "Apartment": "jkhgfss",
    "Suburb": "kljhss",
    "PostalCode": "kljhgss",
    "State": "klj",
    "DeliveryNotes": "jhss",
    "BillingAddress": "jhfg",
    "BillingApartment": "jkj",
    "BillingSuburb": "ssy",
    "BillingPostalCode": "hgfss",
    "BillingState": "iuytr",
    "IsActive": 0
  }])
  // useEffect(() => {
  //   fetch(
  //     `https://customer-api-foboh.azurewebsites.net/api/Customer/get`,
  //     {
  //       method: "GET",
  //     }
  //   ).then((response) => response.json())
  //     .then((data) => {
  //       console.log("user data --->", data);
  //       setTableRecords(data.data)
  //     })
  // }, [])

  const handleCustomerId = (item) => {
    console.log("id >>>", item);
    navigate(`/dashboard/view-customer-details/`, { state: { data: item } });
  };
  return (
    <>
      {tableRecords?.length > 0 && tableRecords.map((item, index) => {
        return (
          <tr
            key={index}
            className={`bg-white border-b  dark:border-gray-700 hover:bg-gray-50  tableNo-${index}`}
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-darkGreen bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>

            <th
              scope="row"
              className="flex justify-center items-center gap-3 px-6 py-4 whitespace-nowrap dark:text-white"
            >
              {/* <img
                src="/assets/defaultRange.png"
                alt=""
                className=" mx-auto object-contain	"
              /> */}

              <h5
                onClick={() => handleCustomerId(item)}
                className="font-normal	 whitespace-no-wrap text-gray">
                {" "}
                {item?.BusinessName}
              </h5>
            </th>
            <td className="px-6 py-4">
              <h5 className="font-medium whitespace-no-wrap text-gray">
                {" "}
                {item?.BusinessName}{" "}
              </h5>
              <p className="text-gray font-normal text-sm">
                {item?.OrderingEmail}
              </p>
            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal	 whitespace-no-wrap text-gray">
                {item?.Address}, {item?.State}
              </h5>
            </td>
            <td className="px-6 py-4">
              {" "}
              {item?.IsActive === 1 ?
                <div className="flex justify-center items-center gap-1 radius-30 bg-custom-green h-7	w-32		px-3">
                  <p className="text-green-dark font-normal		text-sm	">Active</p>
                </div> :
                <div className="flex justify-center items-center gap-1 radius-30 bg-custom-red h-7	w-32		px-3">
                  <p className="text-red-dark font-normal		text-sm	">InActive</p>
                </div>}

            </td>
            <td className="px-6 py-4">
              <h5 className="font-normal	 whitespace-no-wrap text-gray">
                10 orders
              </h5>
            </td>
            <td className="px-6 py-4 ">
              <p className="text-sm	font-normal		 whitespace-no-wrap text-gray">
                $5600
              </p>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default CustomerTable;
