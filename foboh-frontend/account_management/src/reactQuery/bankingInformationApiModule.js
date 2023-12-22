// Get bankingInformation
export const getBankingInformation = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");
    const bankingInfoUrl = process.env.REACT_APP_BANKING_INFO_URL;

    response = await fetch(
      `${bankingInfoUrl}/api/BankingInfoSettings/getSetupbankingInfoByOrganisationID?OrganisationID=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else throw new Error("Error occurred while fetching data");
      });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Submitting bankingInformation
export const postBankingInformations = async (data) => {
  const bankingInfoUrl = process.env.REACT_APP_BANKING_INFO_URL;

  const [values, stripe] = data;

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

    let businessTypeSelected = "";
    let companyStructure = "";

    switch (businessType) {
      case "Individual":
        businessTypeSelected = "individual";
        break;

      case "Sole Trader":
        businessTypeSelected = "company";
        companyStructure = "sole_proprietorship";
        break;

      case "Private Company":
        businessTypeSelected = "company";
        companyStructure = "private_corporation";
        break;

      case "Public Company":
        businessTypeSelected = "company";
        companyStructure = "public_corporation";
        break;

      case "Partnership":
        businessTypeSelected = "company";
        companyStructure = "private_partnership";
        break;

      case "Nonprofit":
        businessTypeSelected = "non_profit";
        companyStructure = "nil";
        break;

      default:
        break;
    }

    const result = await stripe.createToken("bank_account", {
      country: "AU",
      currency: "aud",
      routing_number: bankingInformationBsb,
      account_number: bankingInformationAccountNumber,
      account_holder_name: legalBusinessName,
      account_holder_type: businessTypeSelected, // Or 'company'
    });

    const response = await fetch(
      `${bankingInfoUrl}/api/BankingInfoSettings/BankingInfoSettingsSubmission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationId: localStorage.getItem("organisationId"),
          businessType: businessTypeSelected,
          companyStructure: companyStructure,
          businessWebsiteUrl: businessWebsiteUrl,
          legalBusinessName: legalBusinessName,
          acn: acn,
          abn: abn,
          businessPhoneNumber: businessPhoneNumber,
          businessAddress: businessAddress,
          businessDetailsSuburb: businessDetailsSuburb,
          businessDetailsPostcode: businessDetailsPostcode,
          businessDetailsState: businessDetailsState,
          businessDetailsCountry: businessDetailsCountry,
          representativeInformationFirstName:
            representativeInformationFirstName,
          representativeInformationLastName: representativeInformationLastName,
          representativeInformationDob: representativeInformationDob,
          representativeInformationAddress: representativeInformationAddress,
          representativeInformationSuburb: representativeInformationSuburb,
          representativeInformationPostcode: representativeInformationPostcode,
          representativeInformationState: representativeInformationState,
          representativeInformationMobile: representativeInformationMobile,
          representativeInformationEmail: representativeInformationEmail,
          representativeInformationOwnership:
            representativeInformationOwnership,
          bankingInformationBsb: bankingInformationBsb,
          bankingInformationAccountNumber: bankingInformationAccountNumber,
          billingStatementdescriptor: billingStatementdescriptor,
          billingStatementMobile: billingStatementMobile,
          bankingInformationBankName: bankingInformationBankName,
          bankAccountToken: {
            token: result.token.id,
            bankId: result.token.bank_account.id,
            bankName: result.token.bank_account.bank_name,
            accountHolder: result.token.bank_account.account_holder_name,
            last4: result.token.bank_account.last4,
            ip: result.token.client_ip,
            created: result.token.created,
          },
          termsAndConditions: termsAndConditions,
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
  const bankingInfoUrl = process.env.REACT_APP_BANKING_INFO_URL;

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

    let businessTypeSelected = "";
    let companyStructure = "";

    switch (businessType) {
      case "Individual":
        businessTypeSelected = "individual";
        break;

      case "Sole Trader":
        businessTypeSelected = "company";
        companyStructure = "sole_proprietorship";
        break;

      case "Private Company":
        businessTypeSelected = "company";
        companyStructure = "private_corporation";
        break;

      case "Public Company":
        businessTypeSelected = "company";
        companyStructure = "public_corporation";
        break;

      case "Partnership":
        businessTypeSelected = "company";
        companyStructure = "private_partnership";
        break;

      case "Nonprofit":
        businessTypeSelected = "non_profit";
        companyStructure = "nil";
        break;

      default:
        break;
    }

    const response = await fetch(
      `${bankingInfoUrl}/api/BankingInfoSettings/UpdateBankingInfoSettings`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationId: localStorage.getItem("organisationId"),
          businessType: businessTypeSelected,
          companyStructure: companyStructure,
          businessWebsiteUrl: businessWebsiteUrl,
          legalBusinessName: legalBusinessName,
          acn: acn,
          abn: abn,
          businessPhoneNumber: businessPhoneNumber,
          businessAddress: businessAddress,
          businessDetailsSuburb: businessDetailsSuburb,
          businessDetailsPostcode: businessDetailsPostcode,
          businessDetailsState: businessDetailsState,
          businessDetailsCountry: businessDetailsCountry,
          representativeInformationFirstName:
            representativeInformationFirstName,
          representativeInformationLastName: representativeInformationLastName,
          representativeInformationDob: representativeInformationDob,
          representativeInformationAddress: representativeInformationAddress,
          representativeInformationSuburb: representativeInformationSuburb,
          representativeInformationPostcode: representativeInformationPostcode,
          representativeInformationState: representativeInformationState,
          representativeInformationMobile: representativeInformationMobile,
          representativeInformationEmail: representativeInformationEmail,
          representativeInformationOwnership:
            representativeInformationOwnership,
          bankingInformationBsb: bankingInformationBsb,
          bankingInformationAccountNumber: bankingInformationAccountNumber,
          billingStatementdescriptor: billingStatementdescriptor,
          billingStatementMobile: billingStatementMobile,
          bankingInformationBankName: bankingInformationBankName,
          termsAndConditions: termsAndConditions,
          isBankingInfoSubmitted: false,
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
