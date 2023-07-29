import React,{useState} from 'react';
import PersonalDetails from './PersonalDetails';
import EditProfile from './EditProfile';
function Profile() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [profileUri, setProfileUri] = useState("");
  const sidebarHandler = () => {
    setIsDivVisible(!isDivVisible);
  };
  return (
    <>
          <div>
              <div className="profile-section  sm:px-11 px-5 h-custom-half     overflow-y-scroll	scroll-smooth	scrollable	">
                <div className="sm:py-12 py-8	">
                  <h4 className="text-green text-2xl	font-semibold pb-2	"> Your profile</h4>
                  <p className="text-gray font-medium	 text-sm	">
                    Customise your public profile
                  </p>
                </div>
                <div className="grid gap-5 lg:flex  ">
                <PersonalDetails profileUri={profileUri} />
                 <EditProfile setProfileUri={setProfileUri} />
                </div>
              </div>

            </div>
    </>
  )
}

export default Profile
