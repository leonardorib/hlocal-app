import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useAddress } from "../../hooks/useAddress";
import { ICreateResponsible } from "../../services/api";
import { AddressInput } from "../AddressInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createResponsibleSchema } from "../../schemas/responsible";

import { useSnackbar } from "notistack";

interface IResponsibleForm {
	name: string;
	phone: string;
	streetNumber: string;
}

interface IProps {
	isOpen: boolean;
	close: () => void;
	onSubmit: (responsibleData: ICreateResponsible) => void;
}

export const ResponsibleCreateModal: React.FC<IProps> = (props) => {
	const { isOpen, close, onSubmit } = props;
	const { address, setAddress } = useAddress();
	const { enqueueSnackbar } = useSnackbar();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IResponsibleForm>({
		resolver: yupResolver(createResponsibleSchema),
	});
	const submitForm = (formData: IResponsibleForm) => {
		if (!address.street) {
			enqueueSnackbar(
				"Clique na lupa para checar o endereço antes de submeter!",
				{ variant: "error" }
			);
			return;
		}

		onSubmit({
			...formData,
			address: {
				...address,
				streetNumber: parseInt(formData.streetNumber),
			},
			isMainResponsible: false,
		});

		close();
	};
	return (
		<Dialog
			open={isOpen}
			onClose={close}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Container>
				<DialogTitle>Responsável</DialogTitle>
				<DialogContent>
					<Box
						component="form"
						id="responsible-form"
						noValidate
						onSubmit={handleSubmit(submitForm)}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									{...register("name")}
									sx={{ mt: 2 }}
									id="name"
									autoComplete="name"
									label="Nome"
									required
									fullWidth
									error={!!errors.name?.message}
									helperText={
										errors.name?.message || undefined
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register("phone")}
									id="phone"
									autoComplete="phone"
									label="Telefone"
									required
									fullWidth
									error={!!errors.phone?.message}
									helperText={
										errors.phone?.message || undefined
									}
								/>
							</Grid>
							<DialogTitle sx={{ mt: 2 }}>Endereço</DialogTitle>
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
										errors.streetNumber?.message ||
										undefined
									}
								/>
							</Grid>
						</Grid>
					</Box>
					<AddressInput address={address} setAddress={setAddress} />
				</DialogContent>
				<DialogActions>
					<Button onClick={close}>Cancelar</Button>
					<Button
						variant="outlined"
						type="submit"
						form="responsible-form"
					>
						Salvar
					</Button>
				</DialogActions>
			</Container>
		</Dialog>
	);
};
