import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { usePaginatedFetching } from "../../hooks/usePaginatedFetching";
import { Pagination } from "../../components";
import { api } from "../../services/api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { cnpj } from "cpf-cnpj-validator";

import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
	const navigate = useNavigate();

	const { items, page, increasePage, decreasePage, hasNextPage, totalPages } =
		usePaginatedFetching(api.companies.getAllByCurrentUser);
	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<Typography variant="h5" component="h1" gutterBottom>
					Empresas gerenciadas por você
				</Typography>
				<Button
					onClick={() => {
						navigate("/dashboard/companies/create");
					}}
					sx={{ mb: 2 }}
				>
					Cadastrar empresa
				</Button>
				{items.length === 0 ? (
					<Typography>
						Você ainda não cadastrou nenhuma empresa
					</Typography>
				) : (
					<TableContainer
						component={Paper}
						sx={{ overflowX: "auto" }}
					>
						<Table
							aria-label="responsibles table"
							sx={{ minWidth: 300 }}
						>
							<TableHead>
								<TableRow>
									<TableCell>Nome</TableCell>
									<TableCell>CNPJ</TableCell>

									<TableCell align="center">
										Editar / Deletar
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>

										<TableCell component="th" scope="row">
											{cnpj.format(row.cnpj)}
										</TableCell>

										<TableCell align="center">
											<Tooltip title="Editar">
												<IconButton
													onClick={() => {
														navigate(
															`companies/edit/${row.id}`
														);
													}}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title="Deletar">
												<IconButton onClick={() => {}}>
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
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					goToNextPage={increasePage}
					goToPreviousPage={decreasePage}
				/>
			</Box>
		</Container>
	);
};
