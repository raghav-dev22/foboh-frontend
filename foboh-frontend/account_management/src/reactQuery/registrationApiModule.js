export const postBusinessName = async (businessName) => {
  try {
    const response = await fetch(
      "https://organization-api-foboh.azurewebsites.net/api/Organization/InitialSubmit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName: businessName }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data?.data?.organisationID;
        else throw new Error("Organisation not created successfully!");
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const putUserUpdate = async (
  ccrn,
  firstName,
  lastName,
  email,
  mobile,
  password,
  userInfo,
  organisationId
) => {
  try {
    const response = await fetch(
      `https://user-api-foboh.azurewebsites.net/api/User/update?ccrn=${ccrn}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          status: true,
          role: "",
          meta: "",
          adId: "",
          imageUrl: "",
          bio: "",
          mobile: mobile,
          organisationId: organisationId,
          isActive: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data;
        else throw new Error("Could not able to update user organisation id.");
      })
      .catch((error) => console.log(error));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
