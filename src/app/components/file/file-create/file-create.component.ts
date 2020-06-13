import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  genderValues = ['female','male','other'];

  ethnicityValues = ['african','asian','caucasian','indian','mixed'];

  maritalStatusValues = ['married','single','divorced','partnership'];

  titleDropDownValues = ['mr','mrs','dr','professor','miss'];

  constructor(public route: ActivatedRoute, public fileService: FileService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    
    this.form = new FormGroup({
      initials: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      title: new FormControl(this.titleDropDownValues[0], {
        validators: [Validators.required],
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
      gender: new FormControl(this.genderValues[0], {
        validators: [Validators.required]
      }),
      ethnicity: new FormControl(this.ethnicityValues[0], {
        validators: [Validators.required]
      }),
      maritalStatus: new FormControl(this.maritalStatusValues[0], {
        validators: [Validators.required]
      }),
      citizenship: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      language: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      religion: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),

    });
    this.form.patchValue({
      title: this.titleDropDownValues[0], 
    });
    
    
    // this.form.controls['title'].setValue(this.titleDropDownValues[3] );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('cfileId')) {
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

  jordanFace() {
    console.log('bricks-->', this.form.value.title);
    console.log('bricks-->', this.form.value.gender);
    console.log('bricks-->', this.form.value.ethnicity);
    console.log('real-->', this.form.value.religion);
  }

  changeDropDownValue(e) {
    console.log(e.value)
    this.form['title'].setValue(e.target.value, {
      onlySelf: true
    })
  }

}
