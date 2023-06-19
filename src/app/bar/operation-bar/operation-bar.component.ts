import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faArrowLeft, faArrowRight, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'operation-bar',
  templateUrl: './operation-bar.component.html',
  styleUrls: ['./operation-bar.component.css']
})
export class OperationBarComponent implements OnInit {

  @Input() disableAdd=false;
  @Input() disableBack=false;
  @Input() disableFoward=false;

  @Input() addUrl:string="";
  @Input() backUrl:string="";
  @Input() goUrl:string="";

  faAdd=faAdd;faBackward=faBackward;faForward=faForward;faArrowLeft=faArrowLeft;
  faArrowRight=faArrowRight;

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }


  goAdd(){

    this.router.navigate([this.addUrl]);

  }

  goBack(){

    this.router.navigate([this.backUrl]);
  }

  goFoward(){

    this.router.navigate([this.goUrl]);

  }


}
