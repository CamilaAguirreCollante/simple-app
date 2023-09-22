import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  constructor(private router: Router, private DBService: DatabaseService){}

  ngOnInit(){
  }
  
  navigate(route: string){
    this.router.navigate([route])
  }
}
