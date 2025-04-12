
import React from "react";
import Stepper from "../Register/Stepper";

const RegisterFrom: React.FC = () => {
    return (
        <div className="h-full items-center flex mt-20 mb-20 p-15 xl:mt-4 xl-h-screen ">
            <div className="w-1/5 text-center"></div>
            <div className="w-3/5 text-center h-full">
                <div className="text-lime-200">
                    <div className="text-5xl font-extrabold mb-10 xl:text-5xl xl:mb-5 ">Sign Up</div>
                </div>
                <div className="p-2">
                    <Stepper />
                </div>
            </div>
        </div>
    );
};

export default RegisterFrom;