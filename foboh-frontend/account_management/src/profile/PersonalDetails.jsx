import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PersonalDetailsSchema } from "../schemas";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import separateFullName from "../helpers/separateFullName";
import ProfileHeader from "../dashboard/ProfileHeader";


function PersonalDetails() {
  const [show, setShow] = useState(false)



  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    status: true,
    role: "",
    meta: "",
    adId: "",
    imageUrl: "",
    bio: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("userId");
    fetch(`https://user-api-foboh.azurewebsites.net/api/User/get?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const separatedName = separateFullName(data.data[0].name);

        setInitialValues({
          firstName: separatedName.firstName,
          lastName: separatedName.lastName,
          email: data.data[0].email,
          mobile: data.data[0].mobile,
          bio: data.data[0].bio,
          password: data.data[0].password,
          status: true,
          role: data.data[0].role,
          meta: data.data[0].meta,
          adId: data.data[0].adId,
          imageUrl: data.data[0].imageUrl,
        });

        setValues({
          firstName: separatedName.firstName,
          lastName: separatedName.lastName,
          email: data.data[0].email,
          mobile: data.data[0].mobile,
          bio: data.data[0].bio,
          password: data.data[0].password,
          status: true,
          role: data.data[0].role,
          meta: data.data[0].meta,
          adId: data.data[0].adId,
          imageUrl: data.data[0].imageUrl,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("Initial Values >>>", initialValues);

  const handleReset = () => {
    setValues(initialValues)
  }

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,


  } = useFormik({
    initialValues: initialValues,
    validationSchema: PersonalDetailsSchema,
    onSubmit: (values) => {
      const id = localStorage.getItem("userId");
      fetch(`https://user-api-foboh.azurewebsites.net/api/User/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          password: values.password,
          status: true,
          role: values.role,
          meta: values.meta,
          adId: values.adId,
          imageUrl: values.imageUrl,
          bio: values.bio,
          mobile: values.mobile,
        }),
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            setShow(false)
            fetch(`https://user-api-foboh.azurewebsites.net/api/User/get?id=${id}`, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                const separatedName = separateFullName(data.data[0].name);

                setInitialValues({
                  firstName: separatedName.firstName,
                  lastName: separatedName.lastName,
                  email: data.data[0].email,
                  mobile: data.data[0].mobile,
                  bio: data.data[0].bio,
                  password: data.data[0].password,
                  status: true,
                  role: data.data[0].role,
                  meta: data.data[0].meta,
                  adId: data.data[0].adId,
                  imageUrl: data.data[0].imageUrl,
                });

                setValues({
                  firstName: separatedName.firstName,
                  lastName: separatedName.lastName,
                  email: data.data[0].email,
                  mobile: data.data[0].mobile,
                  bio: data.data[0].bio,
                  password: data.data[0].password,
                  status: true,
                  role: data.data[0].role,
                  meta: data.data[0].meta,
                  adId: data.data[0].adId,
                  imageUrl: data.data[0].imageUrl,
                });
              })
              .catch((error) => console.log(error));

          }
        }).catch(error => console.log(error))
    },
  });



  const handleInputChange = () => {
    setShow(true)
  }

  return (
    <>
      <div className=" lg:w-3/5 w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">

        {
          show && <ProfileHeader handleSubmit={handleSubmit} handleReset={handleReset} />
        }
        <div className=" border-b	 border-inherit sm:px-5 sm:py-4 py-3 px-4">
          <h6 className="text-base	font-medium	 text-green">Personal details</h6>
        </div>
        <div className="px-6 py-7">
          <form onChange={handleInputChange} className="w-full max-w-lg">
            <div className="flex flex-wrap gap-5 lg:gap-0 -mx-3 mb-5">
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  First name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="firstName"
                  type="text"
                  placeholder="Tom"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.firstName && touched.firstName && "1px solid red",
                  }}
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.firstName}</p>
                )}
                {errors.firstName && touched.firstName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
              <div className="w-full relative md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-last-name"
                >
                  Last name
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  placeholder="Jones"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border:
                      errors.lastName && touched.lastName && "1px solid red",
                  }}
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-2 mb-2 text-red-500">{errors.lastName}</p>
                )}
                {errors.lastName && touched.lastName && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  disabled
                  type="email"
                  name="email"
                  autoComplete="on"
                  placeholder="devidjond45@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.email && touched.email && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500">{errors.email}</p>
                )}
                {errors.email && touched.email && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}

                {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full relative px-3">
                <label
                  className="block  tracking-wide text-gray-700 text-base	 font-medium	 "
                  htmlFor="grid-password"
                >
                  Mobile
                </label>
                <input
                  className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded-md	 py-3 px-4     leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="mobile"
                  placeholder="0412 345 678"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: errors.mobile && touched.mobile && "1px solid red",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 mb-2 text-red-500">{errors.mobile}</p>
                )}
                {errors.mobile && touched.mobile && (
                  <ErrorOutlineIcon className="absolute text-red-500 top-[47px] right-5 transition-all duration-[0.3s]" />
                )}
                {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <label
                  htmlFor="message"
                  className="block mb-2 text-base	 font-medium text-gray-700 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-md	 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 "
                  placeholder="Leave a comment..."
                  defaultValue={""}
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <p class="text-gray-600 text-base	 italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalDetails;
