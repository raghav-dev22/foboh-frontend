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
    } = values;

    const response = await fetch(
      "https://fobohonboardingbankinginfosettingswebapi.azurewebsites.net/api/BankingInfoSettings/BankingInfoSettingsSubmission",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationID: "string",
          businessType: "string",
          businessStructure: "string",
          businessProfileUrl: "string",
          businessProfileMCC: "string",
          legalbusinessname: "string",
          acn: 0,
          abn: 0,
          businessPhoneNumber: 0,
          businessAddress: "string",
          suburb: "string",
          postcode: "string",
          state: "string",
          country: "string",
          repFirstName: "string",
          repLastName: "string",
          repDateofBirth: "2023-11-30",
          repAddress: "string",
          repSuburb: "string",
          repPostcode: 0,
          repState: "string",
          repPhone: 0,
          repEmail: "string",
          repIsOwner: true,
          repIsDirector: true,
          bsBnumber: 0,
          accountNumber: 0,
          statementDescriptor: "string",
          phoneNumber: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.log(error));
  } catch (error) {
    throw new Error(error);
  }
};
