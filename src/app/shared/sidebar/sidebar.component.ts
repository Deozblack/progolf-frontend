import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router:Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.auth.logout();
  }

}
