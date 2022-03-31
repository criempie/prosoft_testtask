import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { CommonModule } from "@angular/common";
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    InputComponent,
    FormComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
