export const deleteBaseUnitMeasure = async (id) => {
  const response = await fetch(``, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id: id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    });

  return response;
};
