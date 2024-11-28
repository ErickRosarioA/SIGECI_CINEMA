
export interface IToken{
    token: string;
}

export interface ITokenData {
    username: string;
    name: string;
    role: string;
    identifier: string;
    exp: number;
    iss: string;
    aud: string;
}


export interface ILogin{ 
    email: string | null,
    password: string | null
}

export interface ISignUp{
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    roleId: number,
    creatorUserId: number
}