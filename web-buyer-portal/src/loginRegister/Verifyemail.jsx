import React from "react";
import { Link } from "react-router-dom";

function verifyemail() {

  const buyerCred = localStorage.getItem('buyerCred')
  const email = buyerCred?.email


  const handleEmailLink = () => {
    //Email link
    window.open(`https://${email}`, "_blank");
  };

  const handleResendLink = () => {
    // const url = process.env.REACT_APP_URL
    //Resend Link
    fetch(
      `https://notificationapi-multimedia.azurewebsites.net/api/notify/sendNotification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationType: "wbp-emailverification",
          recieverId: email,
          recieverName: buyerCred?.name,
          priority: 255,
          mediaChannel: "email",
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
                  Verify your email
                </h2>
                <p className="text-center">
                  Almost there! An email containing your verification link was
                  sent to{" "}
                  <span onClick={handleEmailLink} className="text-[#563FE3]">
                    {email}
                  </span>
                </p>
                <p className="text-center">
                  Didn’t receive an email? Please double check that you entered
                  the correct email address and check your spam folder.
                </p>
                <p className="text-center">
                  Still no luck?
                  <span
                  onClick={handleResendLink}
                    className="font-semibold text-base	text-[#563FE3]"
                  >
                    Resend email
                  </span>
                </p>
              </div>
              <div className="  md:w-1/2  hidden md:block ">
                <img
                  src="/assets/supplier-logo.png"
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

export default verifyemail;
