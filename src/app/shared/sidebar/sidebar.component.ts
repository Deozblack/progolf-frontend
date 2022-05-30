import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

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

  modal(){
    Swal.fire({
      title: 'SOPORTE TÉCNICO',
      html:
            '<p class="p-modal " style="margin:0;">Si tienes algún incoveniente puedes comunicarte a:</p> ' +
            '<p class="p-modal text-center" style="margin:0;"><i class="zmdi zmdi-email"></i> <strong>soporte@progolfanalysis.com</strong></p>' +
            '<p class="p-modal text-center"><i class="zmdi zmdi-phone"></i> <strong>(442) 277-8801</strong></p>',
      imageUrl: '../../../assets/images/soporte-tecnico.jpg',
      imageWidth: 480,
      imageHeight: 250,
      imageAlt: 'Custom image',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#343a40',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    
  }

}
