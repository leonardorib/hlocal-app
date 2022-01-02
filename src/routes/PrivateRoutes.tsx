import { Navigate, Outlet } from "react-router";
import { DashboardLayout } from "../components";

interface IProps {
	isAuthenticated: boolean;
}

export const PrivateRoutes: React.FC<IProps> = (props) => {
	const { isAuthenticated } = props;
	return isAuthenticated ? (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	) : (
		<Navigate to="/signIn" />
	);
};
