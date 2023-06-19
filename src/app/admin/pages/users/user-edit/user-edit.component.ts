import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faPerson, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { UserData, Usuario } from 'src/app/models/Usuario.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formGroup!: FormGroup;
  userLoading = false;

  profileList: UserProfile[] = [];
  profileLoading = true;

  userSelected!:Usuario;
  userId:number=-1;

  faUserCircle=faUserCircle;faEye=faEye;faPerson=faUser;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private profileSvc: ProfileService,
    private router: Router,
    private snackBarSvc: SnackBarService,
    private activedRoute:ActivatedRoute
  ) {
    
    this.formGroup = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

this.activedRoute.queryParams.subscribe(params=>{

  this.userId=params['id'];

})


  }

  ngOnInit(): void {

    this.GetProfileList();

    this.GetUserSelected();
  }

  GetProfileList() {
    this.profileSvc.GetProfileList().subscribe({
      next: (response) => {
        this.profileList = response;        
      },
      error: (error) => {
        console.log(error);
        this.profileLoading=false;
      },
      complete: () => {
        this.profileLoading = false;
        this.formGroup.get('profile')?.setValue(this.profileList[0].idPerfil);
      },
    });
  }

  GetUserSelected(){

    // this.userSvc.user$.subscribe(response=>{

    //   this.userSelected=response;

    // })

    this.userSvc.GetUserById(this.userId).subscribe({

      next:(response)=>{this.userSelected=response;},
      error:(error)=>{console.log(error);
      this.snackBarSvc.OpenSnackBar({title:'Ha Ocurrido un error al Obtener el Usuario', type:'ERROR'});
      },
      complete:()=>{

    this.formGroup.get('login')?.setValue(this.userSelected.login),
    this.formGroup.get("firstName")?.setValue(this.userSelected.nombre);
    this.formGroup.get("lastName")?.setValue(this.userSelected.apellidos);

      }

    })

    


  }

  EditUser() {

    this.userLoading = true;

    const data: Usuario = {
      idUsuario:this.userSelected.idUsuario,
      nombre: this.formGroup.get('firstName')?.value,
      apellidos: this.formGroup.get('lastName')?.value,
      idPerfil:this.formGroup.get('profile')?.value,
      login: this.formGroup.get('login')?.value,
      passwd: this.formGroup.get('password')?.value,
      fecha: new Date(),
      estado: 'ACTIVO',
    };

    this.userSvc.EditUser(data).subscribe({
      next: (response) => {},
      error: (error) => {
        this.userLoading = false;      
        this.snackBarSvc.OpenSnackBar({
          title: `${error.error}`,
          type: 'ERROR',
        });
      },
      complete: () => {
        this.userLoading = false;
        this.snackBarSvc.OpenSnackBar({
          title: `Usuario Agregado`,
          type: 'OK',
        });
        this.router.navigate(['/admin/users']);
      },
    });
  }

}
