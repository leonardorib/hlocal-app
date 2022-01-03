import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
	Home,
	NotFound,
	SignIn,
	SignUp,
	CompanyCreate,
	CompanyEdit,
	CompanyLocations,
	CompanyLocationCreate,
} from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from "../hooks/useAuth";
import { PageLoading } from "../components";

export const App: React.FC = () => {
	const { isInitialCheckLoading, user } = useAuth();

	if (isInitialCheckLoading) {
		return <PageLoading />;
	}

	return (
		<Routes>
			<Route
				path="/"
				element={!!user ? <Navigate to="/dashboard" /> : <Outlet />}
			>
				<Route index element={<SignIn />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signUp" element={<SignUp />} />
			</Route>

			<Route
				path="/dashboard"
				element={<PrivateRoutes isAuthenticated={!!user} />}
			>
				<Route index element={<Home />} />
				<Route
					path="/dashboard/companies/create"
					element={<CompanyCreate />}
				/>
				<Route
					path="/dashboard/companies/edit/:id"
					element={<CompanyEdit />}
				/>
				<Route
					path="/dashboard/companies/:id/locations"
					element={<CompanyLocations />}
				/>
				<Route
					path="/dashboard/companies/:id/locations/create"
					element={<CompanyLocationCreate />}
				/>
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
