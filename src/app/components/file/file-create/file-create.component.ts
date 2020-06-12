import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CFile } from '../file.model';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-create',
  templateUrl: './file-create.component.html',
  styleUrls: ['./file-create.component.scss']
})
export class FileCreateComponent implements OnInit {
  title;
  initials;
  fullNames;
  lastName;
  idNumber;
  citizenship;
  gender;
  ethnicity;
  maritalStatus;
  language;
  religion;
  
  cFile: CFile;
  isLoading = false;
  form: FormGroup;
  mode = 'create'; //make this private and use a setter
  private cfileId: string;
  genderValues = [
    {
      sex: 'female',
    },
    {
      sex: 'male'
    },
    {
      sex: 'other'
    }
  ];

  ethnicityValues = [
    {
      race: 'african'
    },
    {
      race: 'asian'
    },
    {
      race: 'caucasian'
    },
    {
      race: 'indian'
    },
    {
      race: 'mixed'
    }
  ];

  maritalStatusValues = [
    {
      status: 'married'
    },
    {
      status: 'single'
    },
    {
      status: 'divorced'
    },
    {
      status: 'partnership'
    }
  ];

  titleDropDownValues = [
    {
      title: 'mr',
    },
    {
      title: 'mrs',

    },
    {
      title: 'dr',

    }, {
      title: 'professor',

    },
     {
      title: 'miss'
    }
  ];
  constructor(public route: ActivatedRoute, public fileService: FileService) { }
  
  ngOnInit(): void {
    
    this.form = new FormGroup({
      initials: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      fullNames: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      idNumber: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      citizenship: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      religion: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),

    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fileId')) {
        this.mode = 'edit';
        this.cfileId = paramMap.get('cfileId');
        this.isLoading = true;
        this.fileService.getCFile(this.cfileId).subscribe(cfileData => {
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
          this.form.setValue({
            title: this.cFile.title,
                initials: this.cFile.initials,
                fullNames: this.cFile.fullNames,
                lastName: this.cFile.lastName,
                idNumber: this.cFile.idNumber,
                citizenship: this.cFile.citizenship,
                gender: this.cFile.gender,
                ethnicity: this.cFile.ethnicity,
                maritalStatus: this.cFile.maritalStatus,
                language: this.cFile.language,
                religion: this.cFile.religion,
          })
        })
      }
    })
  }

  onSaveFile() {
    if (this.form.invalid) {
      return;
    }
    console.log('-->clicked');
    
    this.isLoading = true;
    if (this.mode === 'create') {
      this.fileService.addCFile(
        this.form.value.title,
                this.form.value.initials,
                this.form.value.fullNames,
                this.form.value.lastName,
                this.form.value.idNumber,
                this.form.value.citizenship,
                this.form.value.gender,
                this.form.value.ethnicity,
                this.form.value.maritalStatus,
                this.form.value.language,
                this.form.value.religion,
      );
    } else {
      this.fileService.updateCFile(
        this.cfileId,
        this.form.value.title,
        this.form.value.initials,
                this.form.value.fullNames,
                this.form.value.lastName,
                this.form.value.idNumber,
                this.form.value.citizenship,
                this.form.value.gender,
                this.form.value.ethnicity,
                this.form.value.maritalStatus,
                this.form.value.language,
                this.form.value.religion,
      );
    }
    this.isLoading = false;
    this.form.reset();
  }

}
