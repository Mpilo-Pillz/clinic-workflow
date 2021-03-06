import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileCreateComponent } from './components/file/file-create/file-create.component';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { LoadingSpinnerComponent } from './components/utilities/loading-spinner/loading-spinner.component';
import { FileSearchComponent } from './components/file/file-search/file-search.component';
import { ConsultationListComponent } from './components/consultation/consultation-list/consultation-list.component';
import { ConsultationCreateComponent } from './components/consultation/consultation-create/consultation-create.component';
import { AccordionComponent } from './components/utilities/accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    FileCreateComponent,
    FileListComponent,
    LoadingSpinnerComponent,
    FileSearchComponent,
    ConsultationListComponent,
    ConsultationCreateComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
