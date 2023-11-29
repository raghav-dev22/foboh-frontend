import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
function VerifyPassword() {
  const firstName = localStorage.getItem("firstName");
  const email = localStorage.getItem("buyerEmail");
  const [organisationlogo, setOrganisationLogo] = useState();
  const handleEmailLink = () => {
    //Email link
    window.open(`https://${email}`, "_blank");
  };

  const handleResendLink = () => {
    // const url = process.env.REACT_APP_URL
    //Resend Link
    fetch(
      `https://notification-api-foboh.azurewebsites.net/api/notify/GenerateMailContentAndSendEmailSimply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailtype: "wbp-emailverification",
          to: email,
          name: firstName,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("uniqueKey", data.key);
        alert("Email sent successfully!");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const organisationId = JSON.parse(localStorage.getItem("orgID"));
    fetch(
      `https://organization-api-foboh.azurewebsites.net/api/Organization/get?organizationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0], "for logo");
        setOrganisationLogo(data.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="absolute md:bg-[#F8FAFC]  w-full flex items-center justify-center  top-0	right-0	bottom-0	left-0	">
        <div className="lg:container container-fluid mx-auto lg:px-6  px-0">
          <div className="w-full lg:scale-90">
            <div className="flex flex-col md:flex-row md:justify-center bg-white   ">
              <div className="    block md:hidden">
                <img
                  src="/assets/supplier-logo.png"
                  className="h-36	object-cover	 w-full  "
                  alt="signin"
                />
              </div>
              <div
                className="w-fit	 md:w-1/2  #FFFFFF
                  rounded-lg custom-shadow p-8 mx-10 my-14 flex flex-col justify-center items-center gap-8"
              >
                <h2 className="text-[#563FE3]  text-3xl	font-bold text-center	">
                  {" "}
                  Reset your password
                </h2>
                <p className="text-center">
                  Almost there! An email containing your password reset link was
                  sent to{" "}
                  <span
                    onClick={handleEmailLink}
                    className="text-[#563FE3] cursor-pointer underline"
                  >
                    {email || "test123@email.com"}
                  </span>
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-center 	">
                    <span className="font-bold">
                      Didn’t receive an email ?{" "}
                    </span>
                    Please double check that you entered the correct email
                    address or check your spam folder. <br />
                    {/* <span
                      onClick={handleResendLink}
                      className="font-semibold text-base cursor-pointer	text-[#563FE3]"
                    >
                      Still no luck? Resend email.
                    </span> */}
                  </p>
                  <p className="text-center 	">
                    <span className="font-bold"> Still no luck? </span>
                    <span
                      onClick={handleResendLink}
                      className="font-semibold text-base cursor-pointer	text-[#563FE3]"
                    >
                      {" "}
                      Resend email.
                    </span>
                  </p>{" "}
                </div>
                {/* <Link to="#" className="">
                  <button className="font-semibold text-base bg-[#563FE3] rounded-[8px] py-3 px-4	text-[#ffffff] flex gap-2 ">
                    {" "}
                    Reset password
                    <SendIcon />
                  </button>
                </Link> */}
              </div>
              <div className="  md:w-1/2  hidden md:block ">
                <img
                  src={organisationlogo?.organisationlogo}
                  className="h-full w-full  "
                  alt="signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyPassword;
