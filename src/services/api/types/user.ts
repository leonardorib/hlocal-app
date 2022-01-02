export interface IUser {
	id: string;
	name: string;
	email: string;
	createdDate?: Date;
	updatedDate?: Date;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface ILoginResponse {
	user: IUser;
	access_token: string;
}

export interface IUpdateUser {
	userData: {
		name: string;
		email: string;
	};
	userId: string;
}

export interface ICreateUser {
	name: string;
	email: string;
	password: string;
}
