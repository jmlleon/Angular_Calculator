import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { BarService } from '../services/bar.service';
import { BgModType } from '../models/Enum.model';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  bgModeValue:string=BgModType.blue;

  faTwitter=faTwitter;faFacebook=faFacebook;faYoutube=faYoutube;

  constructor(private barService:BarService) { }

  ngOnInit(): void {

    this.bgModeLoad();
  }
  
  bgModeLoad() {

    this.barService.bgMode$.subscribe(mode => {
      this.bgModeValue = mode;      

    })

  }
}
