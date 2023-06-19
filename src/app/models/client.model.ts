export class Client {

    public clientId!:number;
    public firstName:string;
    public lastName: string;
    public email: string;

    constructor(clientId:number, firstName: string, lastName: string, email: string) {
        this.clientId=clientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

    }


}

export type RegisterData=Omit<Client,"clientId">;