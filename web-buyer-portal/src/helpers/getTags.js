export const getTags = async () => {
    const tags = await fetch('https://masters-api-foboh.azurewebsites.net/api/tags', {
    method:'GET'
    }).then(response => response.json())
    .then(data => {
        return data
    }).catch(error => console.log(error))

    return tags
}