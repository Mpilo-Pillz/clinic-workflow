import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.scss']
})
export class FileSearchComponent implements OnInit {
  isLoading = false;
  cFile;
  patientInfo = [];
  form: FormGroup;
  idNumberValue;
  searchError;
  constructor(private fileService: FileService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      idnumber: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
    })
  }

  onSearch(value: string) {
    this.idNumberValue = value;
  }
  searchFile() {
  
    this.isLoading = true;
    this.fileService.searchCFile(this.idNumberValue).subscribe(cfileData => {
      this.isLoading = false;
      this.cFile = {
            id: cfileData._id,
            title: cfileData.title,
            initials: cfileData.initials,
            fullNames: cfileData.fullNames,
            lastName: cfileData.lastName,
            idNumber: cfileData.idNumber,
            citizenship: cfileData.citizenship,
            gender: cfileData.gender,
            ethnicity: cfileData.ethnicity,
            maritalStatus: cfileData.maritalStatus,
            language: cfileData.language,
            religion: cfileData.religion,
          };
      this.patientInfo.push(this.cFile);
      this.router.navigate(['/edit', this.cFile.id])
        },
        ({ error }) => {
          this.searchError = error.message;
        });
        console.log('mub--<',this.patientInfo);
        
  }
  // toggleAccordion() {
  //   console.log('');
    
  // }
}
