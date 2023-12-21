export const getPaymentMethod = async (buyerId) => {
  try {
    const response = await fetch("", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return null;
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePaymentMethod = async (data) => {
  try {
    const response = await fetch("", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return null;
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
