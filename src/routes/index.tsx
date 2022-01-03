import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NotFound, SignIn, SignUp, CompanyCreate } from "../pages";
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
				path="/signIn"
				element={!!user ? <Navigate to="/createCompany" /> : <SignIn />}
			/>
			<Route
				path="/"
				element={<PrivateRoutes isAuthenticated={!!user} />}
			>
				<Route path="/createCompany" element={<CompanyCreate />} />
				<Route path="/home" element={<Home />} />
			</Route>
			<Route
				path="/signUp"
				element={!!user ? <Navigate to="/createCompany" /> : <SignUp />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
