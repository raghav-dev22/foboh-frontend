export const getOrganisationDetails = async () => {
  const orgID = localStorage.getItem("organisationId");
  const organisationDetails = await fetch(
    `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${orgID}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data[0];
      else return new Error("Some error occurred on fetching data.");
    });

  return organisationDetails;
};
