import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faPerson, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { UserData } from 'src/app/models/Usuario.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  formGroup!: FormGroup;
  userLoading = false;

  profileList: UserProfile[] = [];
  profileLoading = true;

  faUserCircle=faUserCircle;faEye=faEye;faPerson=faUser;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private profileSvc: ProfileService,
    private router: Router,
    private snackBarSvc: SnackBarService
  ) {
    this.formGroup = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.GetProfileList();
  }

  GetProfileList() {
    this.profileSvc.GetProfileList().subscribe({
      next: (response) => {
        this.profileList = response;        
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.profileLoading = false;
        this.formGroup.get('profile')?.setValue(this.profileList[0].idPerfil);
      },
    });
  }

  AddUser() {
    this.userLoading = true;

    const data: UserData = {
      nombre: this.formGroup.get('firstName')?.value,
      apellidos: this.formGroup.get('lastName')?.value,
      idPerfil:this.formGroup.get('profile')?.value,
      login: this.formGroup.get('login')?.value,
      passwd: this.formGroup.get('password')?.value,
      fecha: new Date(),
      estado: 'ACTIVO',
    };

    this.userSvc.AddUser(data).subscribe({
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
