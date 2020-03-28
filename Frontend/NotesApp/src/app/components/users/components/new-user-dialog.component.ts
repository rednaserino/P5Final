import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-new-user-dialog",
  templateUrl: "./new-user-dialog.component.html",
  styleUrls: ["./new-user-dialog.component.sass"]
})
export class NewUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
