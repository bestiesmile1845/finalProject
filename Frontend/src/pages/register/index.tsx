import React from "react";

import "../../App.css";
import  RegisterForm  from "../../components/signin/RegisterForm";
import Header from "../../components/home/header";




const Register: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="h-[700px] relative bg-[#FBE2E0] ">
                <div className="fixed right-0 top-0 h-full w-screen object-cover -z-10 " />
                <div className="items-center"><RegisterForm /></div>
            </div>
            {/* About */}
        </div>
    );
};

export default Register;
