import React,{useState} from 'react'
import Sidebar from '../dashboard/sidebar'
import Header from '../dashboard/Header'
import OrganisationDetails from './OrganisationDetails'
import OrganisationAddress from './OrganisationAddress'
import BillingAddress from './BillingAddress'
import OrganisationLogo from './OrganisationLogo'
import LogisticsContact from './LogisticsContact'
import OrderingContact from './OrderingContact'

function Organisation() {
    const [isDivVisible, setIsDivVisible] = useState(false);

    const sidebarHandler = () => {
      setIsDivVisible(!isDivVisible);
    };
    return (
        <>
             <div className="flex flex-no-wrap">
      
             <div className="w-custom-20  absolute sm:relative border border-inherit md:h-full flex-col justify-between hidden sm:flex">
          <Sidebar />
        </div>
        <div className="w-64  z-40 absolute bg-white  shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out" id="mobile-nav" >
                <div className="h-10 w-10 bg-gray-800 absolute left-4 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer" id="mobile-toggler" onClick={sidebarHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={6} cy={10} r={2} />
                        <line x1={6} y1={4} x2={6} y2={8} />
                        <line x1={6} y1={12} x2={6} y2={20} />
                        <circle cx={12} cy={16} r={2} />
                        <line x1={12} y1={4} x2={12} y2={14} />
                        <line x1={12} y1={18} x2={12} y2={20} />
                        <circle cx={18} cy={7} r={2} />
                        <line x1={18} y1={4} x2={18} y2={5} />
                        <line x1={18} y1={9} x2={18} y2={20} />
                    </svg>
                </div>
                <div className={`	justify-between h-screen ${isDivVisible ? 'grid' : 'hidden'}`}>
                <Sidebar />
                </div>
            </div> 
      {/* Sidebar ends */}
      {/* Remove class [ h-64 ] when adding a card block */}
      <div className="container mx-auto  h-64 md:w-4/5 w-full ">
      <div className="container mx-auto px-0">
          <Header />
          <div>
                            <div className="profile-section  sm:px-11 px-5 h-custom-half     overflow-y-scroll	scroll-smooth	scrollable	">
                                <div className="sm:py-12 py-8">
                                    <h4 className="text-green text-2xl	font-semibold pb-2	"> Organisation settings</h4>
                                    <p className="text-gray font-medium	 text-sm	">
                                    Keep your organisation details up to date 
                                    </p>
                                </div>
                                <div className="grid lg:flex gap-5 ">
                                    <div className=" lg:w-3/5 w-full  gap-5 h-full	 grid	  ">
                                   <OrganisationDetails/>
                                   <OrganisationAddress/>
                                   <BillingAddress/>
                                   </div>
                                    <div className="w-full lg:w-2/5 grid	 gap-5 h-full	">
                                   <OrganisationLogo/>
                                   <OrderingContact/>
                                   <LogisticsContact/>

                                    </div>
                                </div>
                            </div>

                        </div>
        </div>
      </div>
    </div>
 
        </>
        // <div>
        //     <section className="home-dashboard grid md:flex">
        //         <section className="sidebar w-1/5 h-screen	flex justify-between flex-col	 border border-inherit">
        //             <Sidebar />
        //         </section>
        //         <section className="dashboard w-full md:w-4/5 bg-slate-100">
        //             <div className="container mx-auto px-0">
        //                 <Header />
        //                 <div>
        //                     <div className="profile-section  px-11 h-custom-half     overflow-y-scroll	scroll-smooth	scrollable	">
        //                         <div className="py-12">
        //                             <h4 className="text-green text-2xl	font-semibold pb-2	"> Your profile</h4>
        //                             <p className="text-gray font-medium	 text-sm	">
        //                                 Customise your public profile
        //                             </p>
        //                         </div>
        //                         <div className="grid md:flex gap-5 ">
        //                             <div className=" md:w-3/5 w-full  gap-5 h-full	 grid	  ">
        //                            <OrganisationDetails/>
        //                            <OrganisationAddress/>
        //                            <BillingAddress/>
        //                            </div>
        //                             <div className="w-full md:w-2/5 grid	 gap-5 h-full	">
        //                            <OrganisationLogo/>
        //                            <OrderingContact/>
        //                            <LogisticsContact/>

        //                             </div>
        //                         </div>
        //                     </div>

        //                 </div>
        //             </div>
        //         </section>
        //     </section>
        // </div>
    )
}

export default Organisation
