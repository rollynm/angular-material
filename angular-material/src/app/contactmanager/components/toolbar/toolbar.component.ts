import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

    openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
      return this._snackBar.open(message, action, {
        duration: 5000,
      });
    }

  ngOnInit(): void {
  }

  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed",result);
      if (result) {
        this.openSnackBar("Contact Added","Navigate")
          .onAction().subscribe(()=> {
              this.router.navigate(['/contactmanager',result.id]);
          });
      }
    })
  }

}
