export const getStates = async () => {
  try {
    const getuserState = await fetch(
      " https://masters-api-foboh.azurewebsites.net/api/State",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return getuserState;
  } catch (error) {
    throw new Error(error);
  }
};
