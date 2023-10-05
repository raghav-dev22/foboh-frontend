export const getCountry  = async () => {
    const country = await fetch('https://masters-api-foboh.azurewebsites.net/api/Country/get', {
        method: 'GET',
    }).then(response => response.json())
    .then(data => {
        if(data.success){
            return data.data
        }
    }).catch(error => console.log(error))
    return country
}



