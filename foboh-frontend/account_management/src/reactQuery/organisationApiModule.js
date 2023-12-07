const url = process.env.REACT_APP_MASTERS_URL;
export const getDepartments = async () => {
  try {
    const response = await fetch(`${url}/api/Department/get`, {
      method: "GET",
    })
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
    throw new Error(error);
  }
};
