// Fetching invoice
export const fetchInvoice = async (id) => {
  try {
    const resposne = await fetch(
      `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getOrderInvoiceByOrderId?OrderId=${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      })
      .catch((err) => {
        console.log(err);
      });
    return resposne;
  } catch (error) {
    throw new Error("Error while fetching data");
  }
};
