import { useNavigate } from 'react-router-dom';

const PrivateRouter = ({ children }: any) => {

    const navigate = useNavigate();

    const token: string = localStorage.getItem("token") || "";
    if (token) return children;

    return navigate("/login");
};

export default PrivateRouter;
