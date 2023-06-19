import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/models/client.model';
import { DialogService } from 'src/app/services/dialog.service';
import { RegisterService } from 'src/app/services/register.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumnsHeader: string[] = ["actions","clientId", "firstName", "lastName", "email"];
  displayedColumns: string[] = ["edit","delete","clientId", "firstName", "lastName", "email"];

  faEdit=faEdit;faTrash=faTrash;

  dataSource = new MatTableDataSource<Client>();

  // userList:User[]=[{userId:1, name:"Juan Miguel", age:32},{userId:2, name:"Pedro Miguel", age:34} ]
  clientList: Client[] = [];

  clientLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private registerSvc: RegisterService,
    private dialogSvc:DialogService,
    private snackBarSvc:SnackBarService,
    private router:Router
    
    ) { }

  ngOnInit(): void {

    this.GetClientList();

  }


  GetClientList() {

    this.registerSvc.getClientList().subscribe({
      next:(response) => this.clientList = response,
      error:(error) => { console.log(error); this.clientLoading=false;},
      complete:() => {this.dataSource.data=this.clientList;this.clientLoading=false;}
    });

  }

  Edit(client:Client){

    this.router.navigate(['admin/client'], {queryParams:{id: client.clientId}});


  }

  Delete(client:Client){
    
    let matDialogRef = this.dialogSvc.OpenDialog("Desea Eliminar el Cliente " + client.firstName);

    matDialogRef.afterClosed().subscribe(response => {

      if (response === "Accept") {

        this.clientLoading=true;

        this.registerSvc.removeClient(client.clientId).subscribe({
          
          next:()=> {},
          error:(error)=> {
            console.log(error);
            this.snackBarSvc.OpenSnackBar({title:error.error, type:'ERROR'});
            this.clientLoading=false;
          },
          complete:()=> {
            this.snackBarSvc.OpenSnackBar({title:'Se ha Eliminado Correctamente el Cliente', type:'OK'});
            this.GetClientList()
          },
          
        });  

      }

    })

  }



  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

}
