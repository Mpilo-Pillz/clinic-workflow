import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { FileCreateComponent } from './components/file/file-create/file-create.component';
import { FileSearchComponent } from './components/file/file-search/file-search.component';
import { ConsultationListComponent } from './consultation/consultation-list/consultation-list.component';


const routes: Routes = [
  { path: '', component: FileSearchComponent },
  { path: 'list', component: FileListComponent },
  { path: 'create', component: FileCreateComponent },
  { path: 'edit/:cfileId', component: FileCreateComponent },
  { path: 'list/:idNumber', component: ConsultationListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
