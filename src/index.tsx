import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { App } from "./routes";
import { GlobalProvider } from "./hooks/GlobalProvider";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
	<React.Fragment>
		<CssBaseline />
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<GlobalProvider>
					<App />
				</GlobalProvider>
			</SnackbarProvider>
		</BrowserRouter>
	</React.Fragment>,
	document.getElementById("root")
);
