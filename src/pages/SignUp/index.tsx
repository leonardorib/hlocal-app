import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schemas/signUp";
import { api, treatErrorMessage } from "../../services/api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

interface FormData {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export const SignUp: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(signUpSchema),
	});

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (formData: FormData) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const { name, email, password } = formData;
			await api.users.create({ name, email, password });
			enqueueSnackbar("Cadastro realizado. Você já pode logar", {
				variant: "success",
			});
			navigate("/signIn");
		} catch (error: any) {
			const message = treatErrorMessage(
				error,
				"Erro no cadastro. Tente novamente"
			);
			enqueueSnackbar(message, {
				variant: "error",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Cadastro
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									{...register("name")}
									id="name"
									autoComplete="name"
									label="Nome"
									required
									fullWidth
									autoFocus
									error={!!errors.name?.message}
									helperText={
										errors.name?.message || undefined
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register("email")}
									required
									fullWidth
									id="email"
									label="Email"
									autoComplete="email"
									error={!!errors.email?.message}
									helperText={
										errors.email?.message || undefined
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register("password")}
									required
									fullWidth
									label="Senha"
									type="password"
									id="password"
									autoComplete="new-password"
									error={!!errors.password?.message}
									helperText={
										errors.password?.message || undefined
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register("passwordConfirmation")}
									required
									fullWidth
									label="Confirme a senha"
									type="password"
									id="passwordConfirmation"
									error={
										!!errors.passwordConfirmation?.message
									}
									helperText={
										errors.passwordConfirmation?.message ||
										undefined
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={isLoading}
						>
							{isLoading ? (
								<CircularProgress
									sx={{
										color: "white",
									}}
									size={24}
								/>
							) : (
								"Cadastrar"
							)}
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link
									component={RouterLink}
									to="/"
									variant="body2"
								>
									Já tem uma conta? Faça o login.
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};
