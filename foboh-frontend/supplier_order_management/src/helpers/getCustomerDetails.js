export const getCustomerDetails = async (buyerId) => {
    const customer = await fetch(`https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/getCustomerProfile?BuyerId=${buyerId}`, {
        method : "GET"
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))

    return customer
}