import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  public isSmallScreen: boolean;


  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private breakPointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.breakPointObserver.
      observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState)=> {
        this.isSmallScreen = state.matches;
      })

      this.users = this.userService.users;
      this.userService.loadAll();

      // this.users.subscribe(data => {
      //  if (data.length > 0) {
      //    this.router.navigate(['/contactmanager',data[0].id]);
      //  }
      // });

      this.router.events.subscribe(() => {
          if (this.isSmallScreen) {
              this.sidenav.close();
          }
      });

  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

  }

}
