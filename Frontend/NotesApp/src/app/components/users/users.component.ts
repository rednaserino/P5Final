import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { MatDialog } from "@angular/material";
import { NewUserDialogComponent } from "./components/new-user-dialog.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Array<{ id: number; name: string }>;
  newUser: { name: string };

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    let users$ = this.apiService.getUsers();
    users$.subscribe(r => (this.users = r as any));
  }

  saveNewUser() {
    let newUser$ = this.apiService.addUser(this.newUser.name);
    newUser$.subscribe(() => this.getData());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: "250px",
      data: { quiz: this.newUser }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newUser = {
          name: result.name
        };
        this.saveNewUser();
      }
    });
  }
}
