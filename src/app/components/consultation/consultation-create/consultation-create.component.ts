import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../../file/file.service';

@Component({
  selector: 'app-consultation-create',
  templateUrl: './consultation-create.component.html',
  styleUrls: ['./consultation-create.component.scss']
})
export class ConsultationCreateComponent implements OnInit {
  consultation;
  form: FormGroup;
  idNumber;
  imagePreview;
  imageName = 'uploadedImg';
  isLoading;
  mode;
  constructor(public route: ActivatedRoute, public fileService: FileService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      diagnosis: new FormControl(null, {
        validators: [Validators.minLength(1)]
      }),
      prescription: new FormControl(null, {
        validators: [Validators.minLength(1)]
      }),
      image: new FormControl(null, {validators: [Validators.required]})

    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idNumber')) {
        this.mode = 'Add';
        this.idNumber = paramMap.get('idNumber');
        this.isLoading = true;
        this.fileService.getPatientConsultation(this.idNumber).subscribe(consaltationData => {
          this.isLoading = false;
          this.consultation = {
                // id: cfileData._id,
                date: consaltationData.date,
                diagnosis: consaltationData.diagnosis,
                prescription: consaltationData.prescription,
          };
          this.form.setValue({
                date: this.consultation.date,
                diagnosis: this.consultation.diagnosis,
                prescription: this.consultation.prescription,
          });
        });
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file);
    
  }

  browserBack() {
    window.history.go(-1);
  }
  onSaveConsultation() {
    if (this.form.invalid) {
      return;
    }
    console.log('-->clicked');
    
    this.isLoading = true;
    // if (this.mode === 'create') {
    this.fileService.addConsultation(
          this.idNumber,
          this.form.value.diagnosis,
          this.form.value.prescription
      );
    // }
    // else {
    //   this.fileService.updateConsultation (
    //     this.form.value.diagnosis,
    //     this.form.value.prescription,
    //   );
    // }
    this.isLoading = false;
    this.form.reset();
  }

}


// this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('idNumber')) {
    //     this.mode = 'edit';
    //     this.idNumber = paramMap.get('idNumber');
    //     this.isLoading = true;
    //     this.fileService.getPatientConsultations(this.idNumber).subscribe(consaltationData => {
    //       this.isLoading = false;
    //       this.consultation = {
    //             // id: cfileData._id,
    //             date: consaltationData.date,
    //             diagnosis: consaltationData.diagnosis,
    //             prescription: consaltationData.prescription,
    //       };
    //       this.form.setValue({
    //             date: this.consultation.date,
    //             diagnosis: this.consultation.diagnosis,
    //             prescription: this.consultation.prescription,
    //       });
    //     });
    //   }
    // });
