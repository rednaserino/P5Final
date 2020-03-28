import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-new-note-dialog",
  templateUrl: "./new-note-dialog.component.html",
  styleUrls: ["./new-note-dialog.component.sass"]
})
export class NewNoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { note: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
