export const searchOrders = async (orderId, page) => {
    const { buyerId } = JSON.parse(localStorage.getItem('buyerInfo'))
    const orders = await fetch(`https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getOrderHistoryByOrderId?page=${page}&OrderId=${orderId}&BuyerId=${buyerId}`, {
      method: "GET"
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))
    return orders
}