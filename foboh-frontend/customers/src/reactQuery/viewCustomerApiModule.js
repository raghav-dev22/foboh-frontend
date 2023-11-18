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

export const getdefaultPaymentTerm = async () => {
  try {
    const defaultTerm = await fetch(
      "https://masters-api-foboh.azurewebsites.net/api/DefaultPaymentTerm",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return defaultTerm;
  } catch (error) {
    throw new Error(error);
  }
};

export const getdefaultPaymentMethod = async (e) => {
  try {
    if (!e || !e.label) {
      console.error("Invalid input. 'e' or 'e.label' is undefined.");
      return null;
    }
    const defaultPaymentMethod = await fetch(
      `https://masters-api-foboh.azurewebsites.net/api/order?DefaultPaymentTerm=${e.label.trim()}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return defaultPaymentMethod;
  } catch (error) {
    throw new Error(error);
  }
};
