export const getProducts = async () => {
    const organisationId = localStorage.getItem('organisationId')
    const products = await fetch(`https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/getProduct?OrganisationId=${organisationId}`, {
        method : 'GET',
    }).then(response => response.json())
    .then(data => {
        if(data.success) return data.data
        else throw new Error('Some error has occurred on fetching products.')
    }).catch(error => console.log(error))

    return products
}