import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/models/Email.model';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.css']
})
export class ResendEmailComponent implements OnInit {

  emailSelected!:Email;


  constructor(private emailSvc:EmailService) {     

    this.emailSvc.emailSelected$.subscribe(response=>{

      this.emailSelected=response;
  
      console.log(`Subscribe to email ${JSON.stringify(this.emailSelected)}`);
  
     })

  }

  ngOnInit(): void {
  }

}
