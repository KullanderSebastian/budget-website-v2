import React from "react";
import Image from "next/image";

const TransparentHeader = () => {
    return (
        <div className="w-full bg-transparent fixed flex items-center">
            <Image className="my-4 mx-8" src="/budgetPlannerLogo.png" alt="logo depicting a bird" width={75} height={75}/>
            <h1 className="-ml-6 text-customPurple-1300 font-semibold">BUDGET PLANNER</h1>
        </div>
    );
}

export default TransparentHeader;