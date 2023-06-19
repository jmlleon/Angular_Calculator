import { Component, OnInit } from '@angular/core';
import { TeamMember } from './card/team-card.component';



@Component({
  selector: 'team-page',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

teamMembers:TeamMember[]=[
{name:'Juan M. Lorenzo Leon', email:'jmlorenzooo@gmail.com', avatar:'assets/avatar/1.png', content:'Beginers in World Programing, this boy can reach any target'},
{name:'Pedro Luis Gonzales', email:'pedro@gmail.com', avatar:'assets/avatar/2.png', content:'Beginers in World Programing, this boy can reach any target'},
{name:'Regino Rosa Ramos', email:'regino@gmail.com', avatar:'assets/avatar/3.png', content:'Beginers in World Programing, this boy can reach any target'},
{name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/4.png', content:'Beginers in World Programing, this boy can reach any target'}
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'},
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'},
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'},
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'},
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'},
// {name:'Efren Samper Zamora', email:'samper@gmail.com', avatar:'assets/avatar/juan.jpg', content:'Beginers in World Programing, this boy can reach any target'}

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
