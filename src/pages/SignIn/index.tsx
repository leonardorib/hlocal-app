import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signInSchema } from "../../schemas/signIn";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { treatErrorMessage } from "../../services/api";

const theme = createTheme();

interface FormData {
	email: string;
	password: string;
}

export const SignIn: React.FC = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(signInSchema),
	});

	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (formData: FormData) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const { email, password } = formData;
			await login({ email, password });
			enqueueSnackbar("Bem vindo!", {
				variant: "success",
			});
		} catch (error: any) {
			const message = treatErrorMessage(
				error,
				"Erro no login. Tente novamente"
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
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							{...register("email")}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							autoComplete="email"
							error={!!errors.email?.message}
							helperText={errors.email?.message || undefined}
							autoFocus
						/>
						<TextField
							{...register("password")}
							margin="normal"
							required
							fullWidth
							label="Senha"
							type="password"
							id="password"
							autoComplete="current-password"
							error={!!errors.password?.message}
							helperText={errors.password?.message || undefined}
						/>
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
								"Entrar"
							)}
						</Button>
						<Link
							component={RouterLink}
							to="/signUp"
							variant="body2"
						>
							{"Não tem uma conta? Cadastre-se"}
						</Link>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};
