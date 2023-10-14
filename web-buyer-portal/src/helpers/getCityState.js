export const getCityState = async () => {
    const cityStates = await fetch('https://masters-api-foboh.azurewebsites.net/api/CityStateRegion', {
        method : 'GET'
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))

    return cityStates
}