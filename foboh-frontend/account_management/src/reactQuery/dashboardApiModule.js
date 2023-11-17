export const getmonthlyGraphData = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");

    const response = await fetch(
      `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/Orders/Monthly?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      })
      .catch((error) => console.log(error));

    return response;
  } catch (error) {
    throw new Error("Error while processing!");
  }
};

export const getWeeklyGraphData = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");
    const response = await fetch(
      `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/Orders/Weekly?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error("Error while processing!");
  }
};
