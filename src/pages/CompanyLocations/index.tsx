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

import { useNavigate, useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

export const CompanyLocations: React.FC = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { id } = useParams();
	const [companyName, setCompanyName] = React.useState("");
	const fetchLocations = (page: number) => {
		return api.locations.getAllByCompany({ companyId: id!, page });
	};
	const {
		items,
		page,
		increasePage,
		decreasePage,
		isLoading,
		totalPages,
		refresh,
	} = usePaginatedFetching(fetchLocations);

	const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);
	const deleteLocation = async (id: string) => {
		if (isDeleteLoading || isLoading) return;
		setIsDeleteLoading(true);
		try {
			await api.locations.delete(id);
			enqueueSnackbar("Local deletado!", { variant: "success" });
			refresh();
		} catch (e) {
			enqueueSnackbar("Erro. Tente novamente", { variant: "error" });
		} finally {
			setIsDeleteLoading(false);
		}
	};

	const [isFetchCompanyLoading, setIsFetchCompanyLoading] =
		React.useState(false);
	const fetchCompany = async () => {
		if (isFetchCompanyLoading || !id) return;
		setIsFetchCompanyLoading(true);
		try {
			const company = await api.companies.getById(id);
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
	}, []);
	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<Typography variant="h5" component="h1" gutterBottom>
					{`Locais da empresa ${companyName}`}
				</Typography>
				<Button
					onClick={() => {
						navigate("/dashboard/companies/create");
					}}
					sx={{ mb: 2 }}
				>
					Cadastrar Local
				</Button>
				{items.length === 0 ? (
					<Typography>
						Você ainda não cadastrou nenhum Local
					</Typography>
				) : (
					<TableContainer
						component={Paper}
						sx={{ overflowX: "auto" }}
					>
						<Table
							aria-label="Tabela de Locais"
							sx={{ minWidth: 300 }}
						>
							<TableHead>
								<TableRow>
									<TableCell>Nome</TableCell>

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

										<TableCell align="center">
											<Tooltip title="Editar">
												<IconButton
													onClick={() => {
														navigate(
															`companies/locations/edit/${row.id}`
														);
													}}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title="Deletar">
												<IconButton
													onClick={() => {
														deleteLocation(row.id);
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
				{items.length > 0 && (
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						goToNextPage={increasePage}
						goToPreviousPage={decreasePage}
					/>
				)}
			</Box>
		</Container>
	);
};
