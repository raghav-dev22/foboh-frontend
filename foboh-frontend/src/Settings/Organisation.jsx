import React from 'react'
import Sidebar from '../dashBoard/Sidebar'
import Header from '../dashBoard/Header'
import OrganisationDetails from './OrganisationDetails'
import OrganisationAddress from './OrganisationAddress'
import BillingAddress from './BillingAddress'
import OrganisationLogo from './OrganisationLogo'
import LogisticsContact from './LogisticsContact'
import OrderingContact from './OrderingContact'

function Organisation() {
    return (
        <div>
            <section className="home-dashboard grid md:flex">
                <section className="sidebar w-1/5 h-screen	flex justify-between flex-col	 border border-inherit">
                    <Sidebar />
                </section>
                <section className="dashboard w-full md:w-4/5 bg-slate-100">
                    <div className="container mx-auto px-0">
                        <Header />
                        <div>
                            <div className="profile-section  px-11 h-custom-half     overflow-y-scroll	scroll-smooth	scrollable	">
                                <div className="py-12">
                                    <h4 className="text-green text-2xl	font-semibold pb-2	"> Your profile</h4>
                                    <p className="text-gray font-medium	 text-sm	">
                                        Customise your public profile
                                    </p>
                                </div>
                                <div className="grid gap-5 md:flex  ">
                                    <div className=" md:w-3/5 w-full  rounded-lg		 border border-inherit bg-white h-full	 grid	  ">
                                   <OrganisationDetails/>
                                   <OrganisationAddress/>
                                   <BillingAddress/>
                                   </div>
                                    <div className="w-full md:w-2/5	 rounded-md	 border border-inherit bg-white h-full	">
                                   <OrganisationLogo/>
                                   <OrderingContact/>
                                   <LogisticsContact/>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Organisation
