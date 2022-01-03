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
import { createLocationSchema } from "../../schemas/location";
import { api } from "../../services/api";
import { useSnackbar } from "notistack";

import { ResponsiblesCreateList, AddressInput } from "../../components";
import { useResponsibles } from "../../hooks/useResponsibles";
import { useAddress } from "../../hooks/useAddress";

import { useNavigate, useParams } from "react-router-dom";

interface IFormData {
	name: string;
	streetNumber: string;
}

export const CompanyLocationCreate: React.FC = () => {
	const { id: companyId } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(createLocationSchema),
	});

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const { responsibles, setResponsibles } = useResponsibles();

	const { address, setAddress } = useAddress();

	const onSubmit = async (formData: IFormData) => {
		if (isLoading || !companyId) return;
		setIsLoading(true);
		try {
			if (!address.street) {
				throw new Error(
					"Clique na lupa para checar o endereço antes de submeter!"
				);
			}
			if (responsibles.length === 0) {
				throw new Error("Cadastre pelo menos um responsável");
			}
			if (
				responsibles.filter((resp) => resp.isMainResponsible).length < 1
			) {
				throw new Error("Escolha um responsável principal");
			}
			const { name, streetNumber } = formData;
			await api.locations.create({
				companyId,
				name,
				address: { ...address, streetNumber: parseInt(streetNumber) },
				responsibles,
			});
			enqueueSnackbar("Local cadastrado!", {
				variant: "success",
			});
			navigate(`/dashboard/companies/${companyId}/locations`);
		} catch (error: any) {
			const message = error.message || "Erro. Tente novamente";
			enqueueSnackbar(message, {
				variant: "error",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const [companyName, setCompanyName] = React.useState("");
	const [isFetchCompanyLoading, setIsFetchCompanyLoading] =
		React.useState(false);
	const fetchCompany = async () => {
		if (isFetchCompanyLoading || !companyId) return;
		setIsFetchCompanyLoading(true);
		try {
			const company = await api.companies.getById(companyId);
			setCompanyName(company.name);
		} catch (e: any) {
			const message =
				e.message || "Erro ao carregar informações. Tente novamente";
			navigate("/dashboard");
			enqueueSnackbar(message, {
				variant: "error",
			});
			console.error(e);
		} finally {
			setIsFetchCompanyLoading(false);
		}
	};

	React.useEffect(() => {
		fetchCompany();
	}, [companyId]);

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
					{`Criar local para a empresa ${companyName}`}
				</Typography>
				<Box
					component="form"
					id="create-location-form"
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
						<Typography sx={{ mt: 2 }}>Endereço</Typography>
						<Grid item xs={12}>
							<TextField
								{...register("streetNumber")}
								id="streetNumber"
								autoComplete="streetNumber"
								label="Número"
								sx={{ mb: 2 }}
								required
								fullWidth
								error={!!errors.streetNumber?.message}
								helperText={
									errors.streetNumber?.message || undefined
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<AddressInput
								address={address}
								setAddress={setAddress}
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
				form="create-location-form"
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
