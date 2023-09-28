export const getVariety = async () => {
    const varieties = await fetch('https://masters-api-foboh.azurewebsites.net/api/GrapeVarieties', {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))

    return varieties
}