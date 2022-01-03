import React from "react";
import { useSnackbar } from "notistack";
import { IPaginationResponse } from "../services/api";

export const usePaginatedFetching = <T>(
	fetch: (page: number) => Promise<IPaginationResponse<T>>
) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [items, setItems] = React.useState<T[]>([]);
	const [hasNextPage, setHasNextPage] = React.useState(false);
	const [totalPages, setTotalPages] = React.useState(1);
	const [page, setPage] = React.useState(0);

	const { enqueueSnackbar } = useSnackbar();

	const increasePage = () => {
		if (!hasNextPage) return;
		setPage((currentPage) => currentPage + 1);
	};

	const decreasePage = () => {
		if (page < 1) return;
		setPage((currentPage) => currentPage - 1);
	};

	const refresh = () => {
		setTotalPages(1);
		setHasNextPage(false);
		setItems([]);
		setPage((current) => {
			if (current === 0) {
				updateItems();
			}
			return 0;
		});
	};

	const updateItems = async () => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const { items, totalPages } = await fetch(page);
			setItems(items);
			setTotalPages(totalPages);
			setHasNextPage(page + 1 < totalPages);
		} catch (e: any) {
			enqueueSnackbar(
				e.message || "Houve um erro ao carregar informações.",
				{
					variant: "error",
				}
			);

			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	React.useEffect(() => {
		updateItems();
	}, [page]);

	return {
		items,
		page,
		isLoading,
		hasNextPage,
		totalPages,
		refresh,
		increasePage,
		decreasePage,
	};
};
