const constants = {
	environment: process ? process.env.REACT_APP_ENV : "",
	apiUrl: process.env.REACT_APP_API_URL || "",
	tokenKey: "@hlocal:token",
	currentUserKey: "@hlocal:user",
};

export default constants;
