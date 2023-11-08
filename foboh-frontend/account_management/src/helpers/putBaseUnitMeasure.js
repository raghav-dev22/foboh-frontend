export const putBaseUnitMeasure = async (unit) => {
  const organisationId = localStorage.getItem("organisationId");
  const body = unit.map((item) => {
    return {
      unit: `${item?.amount} ${item?.bumUnit}`,
      type: item?.type,
    };
  });
  const response = await fetch(``, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true
      else return false
    })
    .catch((error) => console.log(error));

  return response;
};
