import { Component, OnInit } from '@angular/core';
import { Consultation } from '../consultation.model';
import { ConsultationService } from '../consultation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileService } from 'src/app/components/file/file.service';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent implements OnInit {
  consultations: Consultation[] = [];
  consultation;
  clinicVisitations;
  isLoading = false;
  private patientId: string;
  constructor(private consultationService: ConsultationService,
              public route: ActivatedRoute,
              private fileService: FileService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isLoading = false;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('para-->', paramMap);
      this.patientId = paramMap.get('idNumber');
      this.isLoading = true;
      this.fileService.getPatientConsultations(this.patientId).subscribe(consultationData => {
          this.isLoading = false;

          // if (consultationData[0].notes !== undefined) {
          this.clinicVisitations = consultationData[0].notes.map(notes => {
              console.log('notes-->', notes);

              return  notes;
            } );
          console.log('clicnicVisiFilt-->', this.clinicVisitations);

          this.consultation = {
                  id: consultationData[0].idNumber,
                  date: consultationData[0].notes.date,
                  diagnosis: consultationData[0].notes.diagnosis,
            };
          console.log('consult details =-->', this.consultation.id);
          // }
        });
    });
  }

}
