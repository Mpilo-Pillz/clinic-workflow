import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './components/file/file-list/file-list.component';
import { FileCreateComponent } from './components/file/file-create/file-create.component';


const routes: Routes = [
  { path: '', component: FileListComponent },
  { path: 'create', component: FileCreateComponent },
  { path: 'edit/:cfileId', component: FileCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
