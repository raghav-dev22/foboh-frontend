export const getSetupBankingDetails = async () => {
  const orgID = localStorage.getItem("organisationId");
  const setupBankingDetails = await fetch(
    `https://setupbankinginfofobohwebapi-fbh.azurewebsites.net/api/SetupBanking/getSetupbankingInfoByOrganisationID?OrganisationID=${orgID}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data[0];
      else return new Error("Some error has occurred on fetching data.");
    });

  return setupBankingDetails;
};
