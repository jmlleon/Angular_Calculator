export class UserProfile{

    public idPerfil:string;
    public nombre:string;
    public descripcion:string;

    constructor(idPerfil:string, nombre:string, descripcion:string){

        this.idPerfil=idPerfil;
        this.nombre=nombre;
        this.descripcion=descripcion;
    }

}