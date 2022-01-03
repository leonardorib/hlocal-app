import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IProps {
	currentPage: number;
	totalPages: number;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
}

export const Pagination: React.FC<IProps> = (props) => {
	const { currentPage, totalPages, goToNextPage, goToPreviousPage } = props;

	return (
		<Box
			component="div"
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				my: 2,
			}}
		>
			<Button onClick={goToPreviousPage} disabled={currentPage < 1}>
				Anterior
			</Button>
			<Typography sx={{ mx: 4 }}>{`${
				currentPage + 1
			} / ${totalPages}`}</Typography>
			<Button
				onClick={goToNextPage}
				disabled={currentPage + 1 >= totalPages}
			>
				Pŕoxima
			</Button>
		</Box>
	);
};
