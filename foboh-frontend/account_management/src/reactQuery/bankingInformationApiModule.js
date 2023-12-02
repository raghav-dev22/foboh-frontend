// Get bankingInformation
export const getBankingInformation = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");

    response = await fetch(
      `https://fobohonboardingbankinginfosettingswebapi.azurewebsites.net/api/BankingInfoSettings/getSetupbankingInfoByOrganisationID?OrganisationID=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data;
        else throw new Error("Error occurred while fetching data");
      });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Submitting bankingInformation
export const postBankingInformations = async (values) => {
  try {
    const {
      businessType,
      legalBusinessName,
      acn,
      abn,
      businessAddress,
      businessPhoneNumber,
      businessDetailsSuburb,
      businessDetailsPostcode,
      businessDetailsState,
      businessDetailsCountry,
      businessWebsiteUrl,
      representativeInformationFirstName,
      representativeInformationLastName,
      representativeInformationDob,
      representativeInformationAddress,
      representativeInformationSuburb,
      representativeInformationPostcode,
      representativeInformationState,
      representativeInformationMobile,
      representativeInformationEmail,
      representativeInformationOwnership,
      bankingInformationBsb,
      bankingInformationAccountNumber,
      bankingInformationBankName,
      billingStatementdescriptor,
      billingStatementMobile,
      termsAndConditions,
      organisationId,
    } = values;

    const response = await fetch(
      "https://fobohonboardingbankinginfosettingswebapi.azurewebsites.net/api/BankingInfoSettings/BankingInfoSettingsSubmission",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationID: organisationId,
          businessType: businessType,
          businessStructure: "string",
          businessProfileUrl: "string",
          businessProfileMCC: "string",
          legalbusinessname: legalBusinessName,
          acn: acn,
          abn: abn,
          businessPhoneNumber: businessPhoneNumber,
          businessAddress: businessAddress,
          suburb: businessDetailsSuburb,
          postcode: businessDetailsPostcode,
          state: businessDetailsState,
          country: businessDetailsCountry,
          repFirstName: representativeInformationFirstName,
          repLastName: representativeInformationLastName,
          repDateofBirth: representativeInformationDob,
          repAddress: representativeInformationAddress,
          repSuburb: representativeInformationSuburb,
          repPostcode: representativeInformationPostcode,
          repState: representativeInformationState,
          repPhone: representativeInformationMobile,
          repEmail: representativeInformationEmail,
          repIsOwner: representativeInformationOwnership,
          repIsDirector: true,
          bsBnumber: bankingInformationBsb,
          accountNumber: bankingInformationAccountNumber,
          statementDescriptor: billingStatementdescriptor,
          phoneNumber: billingStatementMobile,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data;
        else throw new Error("Error while fetching data");
      })
      .catch((error) => console.log(error));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Editing bankingInformation
export const putBankingInformations = async (values) => {
  try {
    const {
      businessType,
      legalBusinessName,
      acn,
      abn,
      businessAddress,
      businessPhoneNumber,
      businessDetailsSuburb,
      businessDetailsPostcode,
      businessDetailsState,
      businessDetailsCountry,
      businessWebsiteUrl,
      representativeInformationFirstName,
      representativeInformationLastName,
      representativeInformationDob,
      representativeInformationAddress,
      representativeInformationSuburb,
      representativeInformationPostcode,
      representativeInformationState,
      representativeInformationMobile,
      representativeInformationEmail,
      representativeInformationOwnership,
      bankingInformationBsb,
      bankingInformationAccountNumber,
      bankingInformationBankName,
      billingStatementdescriptor,
      billingStatementMobile,
      termsAndConditions,
      organisationId,
    } = values;

    const response = await fetch(
      "https://fobohonboardingbankinginfosettingswebapi.azurewebsites.net/api/BankingInfoSettings/UpdateBankingInfoSettings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationID: organisationId,
          businessType: businessType,
          businessStructure: "string",
          businessProfileUrl: "string",
          businessProfileMCC: "string",
          legalbusinessname: legalBusinessName,
          acn: acn,
          abn: abn,
          businessPhoneNumber: businessPhoneNumber,
          businessAddress: businessAddress,
          suburb: businessDetailsSuburb,
          postcode: businessDetailsPostcode,
          state: businessDetailsState,
          country: businessDetailsCountry,
          repFirstName: representativeInformationFirstName,
          repLastName: representativeInformationLastName,
          repDateofBirth: representativeInformationDob,
          repAddress: representativeInformationAddress,
          repSuburb: representativeInformationSuburb,
          repPostcode: representativeInformationPostcode,
          repState: representativeInformationState,
          repPhone: representativeInformationMobile,
          repEmail: representativeInformationEmail,
          repIsOwner: representativeInformationOwnership,
          repIsDirector: true,
          bsBnumber: bankingInformationBsb,
          accountNumber: bankingInformationAccountNumber,
          statementDescriptor: billingStatementdescriptor,
          phoneNumber: billingStatementMobile,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data;
        else throw new Error("Error while fetching data");
      })
      .catch((err) => console.log(err));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
