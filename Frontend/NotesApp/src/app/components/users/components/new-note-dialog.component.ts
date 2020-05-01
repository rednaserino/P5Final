import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { categories } from "../types/categories";

@Component({
  selector: "app-new-note-dialog",
  templateUrl: "./new-note-dialog.component.html",
  styleUrls: ["./new-note-dialog.component.sass"],
})
export class NewNoteDialogComponent {
  editmode: boolean;
  categories = categories;
  categoryOptions = [
    { display: "Private", value: categories.Private },
    { display: "Work", value: categories.Work },
    { display: "High priority", value: categories.HighPriority },
    { display: "Low priority", value: categories.LowPriority },
  ];

  constructor(
    public dialogRef: MatDialogRef<NewNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { note: string; category: categories }
  ) {}

  ngOnInit() {
    if (this.data.note) {
      this.editmode = true;
    } else {
      this.editmode = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
