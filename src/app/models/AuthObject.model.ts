import { TokenModelo } from './Token.model';

export class AuthObject {
  public nombre: string;
  public apellidos: string;
  public cargo: string;
  public token: TokenModelo;

  //Lista de Claims

  constructor(
    nombre: string,
    apellidos: string,
    cargo: string,
    token: TokenModelo
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.cargo = cargo;
    this.token = token;
  }
}
