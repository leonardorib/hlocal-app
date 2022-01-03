import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "../../schemas/company";
import { api, treatErrorMessage, ICreateCompany } from "../../services/api";
import { useSnackbar } from "notistack";

import { ResponsiblesCreateList } from "../../components";
import { useResponsibles } from "../../hooks/useResponsibles";

import { useNavigate } from "react-router-dom";

type IFormData = Omit<ICreateCompany, "responsibles">;

export const CompanyCreate: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver<any>(companySchema),
	});

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const { responsibles, setResponsibles } = useResponsibles();

	const onSubmit = async (formData: IFormData) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			if (responsibles.length === 0) {
				throw new Error("Cadastre pelo menos um responsável");
			}
			if (
				responsibles.filter((resp) => resp.isMainResponsible).length < 1
			) {
				throw new Error("Escolha um responsável principal");
			}
			await api.companies.create({ ...formData, responsibles });
			enqueueSnackbar("Empresa cadastrada", {
				variant: "success",
			});
			navigate("/dashboard");
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
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Criar empresa
				</Typography>
				<Box
					component="form"
					id="create-company-form"
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
								helperText={errors.name?.message || undefined}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register("description")}
								required
								fullWidth
								id="description"
								label="Descrição"
								error={!!errors.description?.message}
								helperText={
									errors.description?.message || undefined
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register("cnpj")}
								required
								fullWidth
								id="cnpj"
								label="CNPJ"
								error={!!errors.cnpj?.message}
								helperText={errors.cnpj?.message || undefined}
							/>
						</Grid>
						<Grid item xs={12}></Grid>
					</Grid>
				</Box>
			</Box>
			<ResponsiblesCreateList
				responsibles={responsibles}
				setResponsibles={setResponsibles}
			/>
			<Button
				type="submit"
				form="create-company-form"
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
		</Container>
	);
};
