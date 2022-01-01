import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAuth } from "../../hooks/auth";

export const Home: React.FC = () => {
	const { logout } = useAuth();
	return (
		<Container maxWidth="sm">
			<Box sx={{ my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Home Page
				</Typography>
				<Button onClick={logout}>Logout</Button>
			</Box>
		</Container>
	);
};
