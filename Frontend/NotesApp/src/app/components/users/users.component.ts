import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Array<{ id: number; name: string; notes: Array<string> }>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.users = this.apiService.getUsers();
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(NewQuizDialogComponent, {
    //   width: '250px',
    //   data: { quiz: this.newQuiz }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.newQuiz = {
    //       name: result.name,
    //       maximumTeamSize: result.maximumTeamSize
    //     };
    //     this.saveNewQuiz();
    //   }
    // });
  }
}
