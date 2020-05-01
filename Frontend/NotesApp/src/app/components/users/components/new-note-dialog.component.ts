import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-new-note-dialog",
  templateUrl: "./new-note-dialog.component.html",
  styleUrls: ["./new-note-dialog.component.sass"],
})
export class NewNoteDialogComponent {
  editmode: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { note: string }
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
