import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatIconRegistry } from "@angular/material";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/mdi.svg")
    );
  }
}
