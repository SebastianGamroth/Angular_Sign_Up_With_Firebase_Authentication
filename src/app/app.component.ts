import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_Sign_Up_With_Firebase_Authentication';

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
