import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { BarService } from 'src/app/services/bar.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, AfterViewInit {

  //@ViewChild("sidenav",{static:false}) sidenavContainer:MatSidenavContainer;

  opened:boolean=false;

  faHome=faHome;  faUser=faUser;

  bgModeValue:string="";

  constructor(private barService:BarService) { }


 

  ngOnInit(): void {

    this.togglebar();

    this.bgModeLoad();
    
  }


  togglebar(){

    this.barService.toggle$.subscribe(response=>{

      // this.sidenav.toggle(response);
      this.opened=response;

    })

  }


  bgModeLoad() {

    this.barService.bgMode$.subscribe(mode => {
      this.bgModeValue = mode;      

    })

  }


  ngAfterViewInit(): void {
    
  }

 
}
