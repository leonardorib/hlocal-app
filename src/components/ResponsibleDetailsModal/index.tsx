import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import { ICreateResponsible } from "../../services/api";

interface IProps {
	isOpen: boolean;
	selectedResponsible: ICreateResponsible;
	close: () => void;
}

export const ResponsibleDetailsModal: React.FC<IProps> = (props) => {
	const { isOpen, selectedResponsible, close } = props;

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
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								sx={{ mt: 2 }}
								label="Nome"
								required
								fullWidth
								disabled
								value={selectedResponsible.name}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Telefone"
								required
								fullWidth
								disabled
								value={selectedResponsible.phone}
							/>
						</Grid>
						<DialogTitle sx={{ mt: 2 }}>Endereço</DialogTitle>
						<Grid item xs={12}>
							<TextField
								label="Número"
								required
								fullWidth
								disabled
								value={selectedResponsible.address.streetNumber}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="CEP"
								required
								fullWidth
								disabled
								value={selectedResponsible.address.cep}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Rua"
								required
								fullWidth
								disabled
								value={selectedResponsible.address.street}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Cidade"
								required
								fullWidth
								disabled
								value={selectedResponsible.address.city}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Estado"
								required
								fullWidth
								disabled
								value={selectedResponsible.address.state}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => close()}>Fechar</Button>
				</DialogActions>
			</Container>
		</Dialog>
	);
};
