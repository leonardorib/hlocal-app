import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAuth } from "../../hooks/useAuth";
import { useAddress } from "../../hooks/useAddress";

import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Home Page - Empresas
				</Typography>
				<Button
					onClick={() => {
						navigate("/createCompany");
					}}
				>
					Cadastrar empresa
				</Button>
			</Box>
		</Container>
	);
};
