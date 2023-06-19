

export type UserData = Omit<Usuario, "idUsuario" | "descripcionPerfil">;
    /*nombre: string;
    apellidos: string;
    idPerfil: number,
    fecha: Date;
    estado: string;
    passwd: string;
    login: string;
  };*/

export class Usuario {


    public idUsuario: number;
    public nombre: string;
    public apellidos: string;
    public idPerfil: number;
    public passwd: string;
    public login: string;
    //public slt: string;
    public fecha: Date;
    public estado: string;
    //public isLogin?: number;
    public descripcionPerfil?: string;
    //public idPerfilNavigation?:PerfilUsuario;   


    constructor(

        idUsuario:number,
        nombre: string,
        apellidos: string,
        idPerfil: number,
        passwd: string,
        login: string,
        //slt:string,
        fecha: Date,
        estado: string,
        descripcionPerfil: string,
        //isLogin?:number,
        //idPerfilNavigation?:PerfilUsuario


    ) {

        this.idUsuario= idUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.idPerfil = idPerfil;
        this.passwd = passwd;
        this.login = login;
        //this.slt = slt;
        this.fecha = fecha;
        this.estado = estado;
        //this.isLogin = isLogin;
        //this.idPerfilNavigation=idPerfilNavigation;
        this.descripcionPerfil = descripcionPerfil;

    }



}