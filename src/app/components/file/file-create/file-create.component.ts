import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CFile } from '../file.model';

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
  private fileId: string;
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
  constructor(public route: ActivatedRoute) { }
  
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
        this.fileId = paramMap.get("fileId");
        this.isLoading = true;
        this.
      }
    })
  }

  onSaveFile() {
    console.log('five hunid');
    
  }

}
