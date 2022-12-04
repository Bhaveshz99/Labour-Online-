import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }: any) => {
    const token: string = localStorage.getItem("token") || "";
    if (token) return <>{children}</>;

    return <Navigate to="/login" />;
};

export default PrivateRouter;
