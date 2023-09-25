import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any; // Bootstrap 5

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  private modal: any;

  constructor(
    private router: Router
  ){}

  ngOnInit(){
    var initialModal = document.getElementById('homeModal');
    this.modal = new bootstrap.Modal(initialModal);
    this.modal.show();
    this.navigate('dashboard/home');
  }

  navigate(route: string){
    this.router.navigate([route])
  }

}
