export const getDepartments = async () => {
  try {
    const response = await fetch(
      `https://masters-api-foboh.azurewebsites.net/api/Department/get`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching department: " + error);
  }
};

export const getCategories = async (departmentNames) => {
  try {
    const response = await fetch(
      `https://masters-api-foboh.azurewebsites.net/api/Category/getDepartmentbyName`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentNames),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching catgories: " + error);
  }
};

export const getOrganisation = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");
    const response = await fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data?.data[0];
        else return null;
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching organisation: " + error);
  }
};
