import React from "react";
import { getAddressFromCep } from "../../services/cep";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import { IAddress } from "../../types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cepFormSchema } from "../../schemas/address";

interface ICepForm {
	cep: string;
}

interface IProps {
	address: Omit<IAddress, "streetNumber">;
	setAddress: (newAddress: Omit<IAddress, "streetNumber">) => void;
	initialCep?: string;
}

export const AddressInput: React.FC<IProps> = (props) => {
	const { address, setAddress, initialCep } = props;
	const {
		handleSubmit: submitCepForm,
		getValues: getCepFormValues,
		formState: cepFormState,
		control: cepControl,
		setValue,
	} = useForm<ICepForm>({
		resolver: yupResolver(cepFormSchema),
	});

	const [isSearchLoading, setIsSearchLoading] = React.useState(false);

	const fetchAddress = async () => {
		if (isSearchLoading) return;
		setIsSearchLoading(true);
		try {
			const { cep } = getCepFormValues();
			const response = await getAddressFromCep(cep);
			setAddress(response);
		} catch (e) {
			console.error(e);
		} finally {
			setIsSearchLoading(false);
		}
	};

	React.useEffect(() => {
		if (initialCep) {
			setValue("cep", initialCep);
		}
	}, [initialCep]);
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Controller
					control={cepControl}
					name="cep"
					render={({ field }) => (
						<TextField
							{...field}
							onChange={(e) =>
								field.onChange(
									e.target.value.replace(/[^0-9]/g, "")
								)
							}
							margin="normal"
							required
							fullWidth
							label="CEP"
							autoComplete="cep"
							InputLabelProps={{
								shrink: initialCep ? true : undefined,
							}}
							InputProps={{
								endAdornment: (
									<Tooltip title="Buscar endere??o">
										<IconButton
											edge="start"
											color="inherit"
											aria-label="search address"
											onClick={submitCepForm(
												fetchAddress
											)}
										>
											<SearchIcon />
										</IconButton>
									</Tooltip>
								),
							}}
							error={!!cepFormState.errors.cep?.message}
							helperText={
								cepFormState.errors.cep?.message ||
								"Clique na lupa para preencher o endere??o depois de digitar o CEP"
							}
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					disabled
					value={address.street}
					InputLabelProps={{ shrink: !!address.street }}
					margin="normal"
					required
					fullWidth
					label="Rua"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					disabled
					value={address.neighborhood}
					InputLabelProps={{ shrink: !!address.neighborhood }}
					margin="normal"
					required
					fullWidth
					label="Bairro"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					disabled
					value={address.city}
					InputLabelProps={{ shrink: !!address.city }}
					margin="normal"
					required
					fullWidth
					label="Cidade"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					disabled
					value={address.state}
					InputLabelProps={{ shrink: !!address.state }}
					margin="normal"
					required
					fullWidth
					label="Estado"
				/>
			</Grid>
		</Grid>
	);
};
