import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { DeleteUserDialogComponent } from "./delete-user-dialog.component";
import { NewNoteDialogComponent } from "./new-note-dialog.component";
import { categories } from "../types/categories";
import { Category } from "../types/category";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  routeId: number;
  users: Array<{ id: number; name: string }>;
  username: string;
  notes: Array<{
    id: number;
    content: string;
    userId: number;
    category: categories;
  }>;
  newNote: string;
  newNoteCategory: categories;

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
    users$.subscribe((r) => {
      this.users = r as any;
      this.username = r.find((x) => x.id === this.routeId).name;
      notes$ = this.apiService.getNotesByUserName(this.username);
      notes$.subscribe((s) => (this.notes = s));
    });
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { username: this.username },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let delete$ = this.apiService.deleteUser(this.routeId);
        delete$.subscribe((r) => {
          this.router.navigateByUrl("/users");
        });
      }
    });
  }
  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: "250px",
      data: { note: this.newNote },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newNote = result.note;
        this.newNoteCategory = result.category;
        this.saveNewNote();
      }
    });
  }
  openEditNoteDialog(note: string, noteId: number, userId: number): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: "250px",
      data: { note: note },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let content = result.note;
        let result$ = this.apiService.editNote(
          content,
          userId,
          noteId,
          result.category
        );
        result$.subscribe(() => this.getData());
      }
    });
  }

  saveNewNote() {
    let newNote$ = this.apiService.addNote(
      this.routeId,
      this.newNote,
      this.newNoteCategory
    );
    newNote$.subscribe(() => {
      this.getData();
      this.newNote = null;
    });
  }

  deleteNote(noteId: number, userId: number) {
    let result$ = this.apiService.deleteNote(userId, noteId);
    result$.subscribe(() => this.getData());
  }

  getCategoryType(category: categories): Category {
    let c: Category;
    switch (category) {
      case categories.Private: {
        c = { display: "Private", value: categories.Private };
        break;
      }
      case categories.Work: {
        c = { display: "Work", value: categories.Work };
        break;
      }
      case categories.HighPriority: {
        c = { display: "High priority", value: categories.HighPriority };
        break;
      }
      case categories.LowPriority: {
        c = { display: "Low priority", value: categories.LowPriority };
        break;
      }
    }

    return c;
  }
}
