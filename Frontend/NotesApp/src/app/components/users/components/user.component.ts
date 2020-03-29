import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { DeleteUserDialogComponent } from "./delete-user-dialog.component";
import { NewNoteDialogComponent } from "./new-note-dialog.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  routeId: number;
  users: Array<{ id: number; name: string }>;
  username: string;
  notes: Array<{ id: number; content: string; userId: number }>;
  newNote: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.routeId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getData();
  }

  getData() {
    let users$ = this.apiService.getUsers();
    let notes$;
    users$.subscribe(r => {
      this.users = r as any;
      this.username = r.find(x => x.id === this.routeId).name;
      notes$ = this.apiService.getNotesByUserName(this.username);
      notes$.subscribe(s => (this.notes = s));
    });
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { username: this.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteUserById(this.routeId);
      }
    });
  }
  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: "250px",
      data: { note: this.newNote }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newNote = result.note;
        this.saveNewNote();
      }
    });
  }

  saveNewNote() {
    this.apiService.addNote(this.newNote);
  }
}
