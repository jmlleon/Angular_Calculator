import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faArrowLeft, faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/models/client.model';
import { RegisterService } from 'src/app/services/register.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Usuario } from 'src/app/models/Usuario.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
 

  displayedColumnsHeader: string[] = ["actions","userId", "nombre", "apellidos", "idPerfil", "login", "fecha", "estado", "descripcionPerfil"];//"passwd",
  displayedColumns: string[] = ["edit","delete","userId", "nombre", "apellidos", "idPerfil", "login", "fecha", "estado", "descripcionPerfil"];//"passwd"

  faEdit=faEdit;faTrash=faTrash; faCheck=faCheck;

  dataSource = new MatTableDataSource<Usuario>();

  // userList:User[]=[{userId:1, name:"Juan Miguel", age:32},{userId:2, name:"Pedro Miguel", age:34} ]
  userList: Usuario[] = [];

  userLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userSvc: UserService,
    private dialogSvc:DialogService,
    private router:Router,
    private snackBarSvc:SnackBarService
    
    ) { }

  ngOnInit(): void {

    this.GetUserList();

  }


  GetUserList() {

    this.userSvc.GetUserList().subscribe({
      next:(response) => this.userList = response,
      error:(error) => { console.log(error); this.userLoading=false;},
      complete:() => {this.dataSource.data=this.userList;this.userLoading=false;}
    });

  }

  Edit(user:Usuario){

    //this.userSvc.SetUser(user);
    this.router.navigate(["/admin/user"], {queryParams:{id:user.idUsuario}});

  }

  Delete(user:Usuario){

    var operation=user.estado==="ACTIVO" ? "Deshabilitar":"Activar";   
    
    let matDialogRef = this.dialogSvc.OpenDialog(`Desea ${operation} el Usuario ${user.nombre}`);

    matDialogRef.afterClosed().subscribe(response => {

      if (response === "Accept") {

        this.userLoading=true;

        this.userSvc.RemoveUser(user.idUsuario).subscribe({
          
          next:()=> { },
          error:(error)=> {
            console.log(error);
            this.snackBarSvc.OpenSnackBar({title:'Ha Ocurrido un error al Deshabilitar el Usuario', type:'ERROR'});
          },
          complete:()=> {
            this.GetUserList()
          },
          
        });  

      }

    })

  }



  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

 

}
