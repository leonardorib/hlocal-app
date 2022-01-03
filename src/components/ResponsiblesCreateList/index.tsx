import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ResponsibleCreateModal } from "../ResponsibleCreateModal";
import { ResponsibleDetailsModal } from "../ResponsibleDetailsModal";
import { ICreateResponsible } from "../../services/api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DetailsIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface IProps {
	responsibles: ICreateResponsible[];
	setResponsibles: React.Dispatch<React.SetStateAction<ICreateResponsible[]>>;
}
export const ResponsiblesCreateList: React.FC<IProps> = (props) => {
	const { responsibles, setResponsibles } = props;
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [isCreateOpen, setIsCreateOpen] = React.useState(false);
	const [selectedResponsible, setSelectedResponsible] =
		React.useState<ICreateResponsible | null>(null);

	const openCreate = () => {
		setIsCreateOpen(true);
	};
	const closeCreate = () => {
		setIsCreateOpen(false);
	};

	const closeDetails = () => {
		setSelectedResponsible(null);
	};
	return (
		<>
			<Typography fontSize={22} sx={{ mb: 2 }}>
				Responsáveis
			</Typography>
			{responsibles.length === 0 ? (
				<Typography>Adicione responsáveis</Typography>
			) : (
				<TableContainer component={Paper} sx={{ overflowX: "auto" }}>
					<Table
						aria-label="responsibles table"
						sx={{ minWidth: 300 }}
					>
						<TableHead>
							<TableRow>
								<TableCell>Nome</TableCell>
								{!isSmallScreen && (
									<TableCell>Telefone</TableCell>
								)}
								<TableCell align="center">
									Tornar principal / Ver / Deletar
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{responsibles.map((row, index) => (
								<TableRow
									key={index}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									{!isSmallScreen && (
										<TableCell component="th" scope="row">
											{row.phone}
										</TableCell>
									)}

									<TableCell
										align={
											isSmallScreen ? "right" : "center"
										}
									>
										{row.isMainResponsible ? (
											<Tooltip title="Já é o principal">
												<IconButton>
													<StarIcon />
												</IconButton>
											</Tooltip>
										) : (
											<Tooltip title="Tornar principal">
												<IconButton
													onClick={() => {
														let responsiblesUpdated =
															[...responsibles];
														responsiblesUpdated =
															responsiblesUpdated.map(
																(
																	item,
																	respIndex
																) => ({
																	...item,
																	isMainResponsible:
																		respIndex ===
																		index,
																})
															);
														setResponsibles(
															responsiblesUpdated
														);
													}}
												>
													<StarBorderIcon />
												</IconButton>
											</Tooltip>
										)}
										<Tooltip title="Ver detalhes">
											<IconButton
												onClick={() => {
													setSelectedResponsible(row);
												}}
											>
												<DetailsIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Deletar">
											<IconButton
												onClick={() => {
													setResponsibles(
														(previous) =>
															previous.filter(
																(
																	resp,
																	respIndex
																) =>
																	index !==
																	respIndex
															)
													);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<Button onClick={openCreate} sx={{ mt: 2 }}>
				Adicionar responsável
			</Button>
			{isCreateOpen && (
				<ResponsibleCreateModal
					isOpen={isCreateOpen}
					close={closeCreate}
					onSubmit={(responsible) => {
						setResponsibles((current) => [...current, responsible]);
					}}
				/>
			)}
			{!!selectedResponsible && (
				<ResponsibleDetailsModal
					isOpen={!!selectedResponsible}
					close={closeDetails}
					selectedResponsible={selectedResponsible}
				/>
			)}
		</>
	);
};
