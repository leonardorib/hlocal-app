import React from "react";

import { AuthProvider } from "./useAuth";

export const GlobalProvider: React.FC = ({ children }) => {
	return <AuthProvider>{children}</AuthProvider>;
};
