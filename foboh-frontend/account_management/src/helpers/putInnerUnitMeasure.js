export const putInnerUnitMeasure = async (value) => {
  const organisationId = localStorage.getItem("organisationId");

  const body = value.map((item) => {
    return {
      _id: item?.id,
      unit: `${item?.amount} ${item?.iumUnit}`,
      type: item?.iumType,
    };
  });

  const response = await fetch(
    `https://masters-api-foboh.azurewebsites.net/api/innerUnitOfMeasure/InnerUnitbulkupdate?OrganisationID=${organisationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((err) => console.log(err));

  return response;
};