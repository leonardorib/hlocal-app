import React from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export const PageLoading: React.FC = () => {
	return (
		<Container
			sx={{
				display: "flex",
				flex: 1,
				width: "100%",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Container>
	);
};
