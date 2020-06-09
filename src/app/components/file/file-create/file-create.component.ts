import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-create',
  templateUrl: './file-create.component.html',
  styleUrls: ['./file-create.component.scss']
})
export class FileCreateComponent implements OnInit {
  mode = 'create'; //make this private and use a setter
  isLoading = false;
  form: FormGroup;

  gender = [
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

  ethnicity = [
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

  maritalStatus = [
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
  constructor() { }
  
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

    })
    ;
  }

  onSaveFile() {
    console.log('five hunid');
    
  }

}
