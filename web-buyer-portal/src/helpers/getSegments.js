export const getSegments = async (segmentIds) => {
  const segments = await fetch(
    "https://masters-api-foboh.azurewebsites.net/api/Segment/get",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subCategoryIds: segmentIds,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data.data;
      }
    })
    .catch((error) => console.log(error));

  return segments;
};
