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
import { api, ICreateCompany } from "../../services/api";
import { useSnackbar } from "notistack";

import { ResponsiblesCreateList } from "../../components";
import { useResponsibles } from "../../hooks/useResponsibles";

import { useNavigate, useParams } from "react-router-dom";

type IFormData = Omit<ICreateCompany, "responsibles">;

export const CompanyEdit: React.FC = () => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IFormData>({
		resolver: yupResolver<any>(companySchema),
	});

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const { responsibles, setResponsibles } = useResponsibles();

	const [isFetchLoading, setIsFetchLoading] = useState(false);
	const fetchCompany = async () => {
		if (isFetchLoading || !id) return;
		setIsFetchLoading(true);
		try {
			const company = await api.companies.getById(id);
			setValue("name", company.name);
			setValue("cnpj", company.cnpj);
			setValue("description", company.description);
			setResponsibles(company.responsibles);
		} catch (e: any) {
			const message =
				e.message || "Erro ao carregar informações. Tente novamente";
			navigate("/dashboard");
			enqueueSnackbar(message, {
				variant: "error",
			});
			console.error(e);
		} finally {
			setIsFetchLoading(false);
		}
	};

	const [isLoading, setIsLoading] = useState(false);
	const onSubmit = async (formData: IFormData) => {
		if (isLoading || !id) return;
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
			await api.companies.update({
				companyId: id,
				companyData: { ...formData, responsibles },
			});
			enqueueSnackbar("Empresa editada!", {
				variant: "success",
			});
			navigate("/dashboard");
		} catch (e: any) {
			const message = e.message || "Erro. Tente novamente";
			enqueueSnackbar(message, {
				variant: "error",
			});
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		fetchCompany();
	}, []);

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
								InputLabelProps={{ shrink: true }}
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
								InputLabelProps={{ shrink: true }}
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
								InputLabelProps={{ shrink: true }}
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
