import { Navigate, Outlet } from "react-router";

interface IProps {
	isAuthenticated: boolean;
}

export const PrivateRoutes: React.FC<IProps> = (props) => {
	const { isAuthenticated } = props;
	return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};
