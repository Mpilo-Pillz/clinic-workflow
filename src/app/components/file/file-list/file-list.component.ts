import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { CFile } from '../file.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  cfiles: CFile[] = [];
  isLoading = false;
  private cfilesSub: Subscription;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.fileService.getCFiles();
    this.cfilesSub = this.fileService.getCFilesUpdateListener()
      .subscribe((cfiles: CFile[]) => {
        this.isLoading = false;
        this.cfiles = cfiles;
      });
  }

  onDelete(postId: string) {
    this.fileService.deletePost(postId);
  }

}
