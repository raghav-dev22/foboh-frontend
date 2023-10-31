export const getInnerUnitMeasureType = async () => {
    const innerUnitMeasureTypeResponse = await fetch('https://masters-api-foboh.azurewebsites.net/api/InnerUOMtype', {
     method: 'GET'
    }).then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))

    return innerUnitMeasureTypeResponse
}