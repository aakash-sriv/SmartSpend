import React from "react";
import { BarLoader } from "react-spinners";

const AccountLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="text-center">
                <h2 className="text-xl font-semibold gradient-title mb-2">Loading Account Details...</h2>
                <p className="text-muted-foreground text-sm">Please wait while we fetch your transactions.</p>
            </div>
            <BarLoader width={200} color="#93BFC7" />
        </div>
    );
};

export default AccountLoading;
