import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UserComponent } from "./components/user.component";
import { NewUserDialogComponent } from "./components/new-user-dialog.component";
import { NewNoteDialogComponent } from "./components/new-note-dialog.component";
import { DeleteUserDialogComponent } from "./components/delete-user-dialog.component";
import { UsersComponent } from "./users.component";
import { MaterialModule } from "src/app/shared/material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    NewUserDialogComponent,
    NewNoteDialogComponent,
    DeleteUserDialogComponent
  ],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, FormsModule],
  entryComponents: [
    NewUserDialogComponent,
    DeleteUserDialogComponent,
    NewNoteDialogComponent
  ]
})
export class UsersModule {}
