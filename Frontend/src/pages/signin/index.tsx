import React from "react";

import "../../App.css";
import LoginForm  from "../../components/signin/LoginForm";
import Header from "../../components/home/header";




const Login: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="h-[700px] relative bg-[#FBE2E0] ">
                <div className="fixed right-0 top-0 h-full w-screen object-cover -z-10 " />
                <div className="items-center"><LoginForm /></div>
            </div>
            {/* About */}
        </div>
    );
};

export default Login;
