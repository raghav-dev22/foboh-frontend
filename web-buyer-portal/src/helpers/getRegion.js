export const getRegion = async () => {
    const region = await fetch('https://masters-api-foboh.azurewebsites.net/api/Region', {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))

    return region
}