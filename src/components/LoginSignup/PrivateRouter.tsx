import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }: any) => {
    const checkUser: any = JSON.parse(localStorage.getItem("Data") || "");
    if (checkUser?.token) return <>{children}</>;

    return <Navigate to="/" />;
};

export default PrivateRouter;
