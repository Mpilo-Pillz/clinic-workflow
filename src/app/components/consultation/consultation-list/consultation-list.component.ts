import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Consultation } from '../consultation.model';
import { ConsultationService } from '../consultation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileService } from 'src/app/components/file/file.service';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent implements OnInit, AfterViewInit {
  consultations: Consultation[] = [];
  consultation;
  clinicVisitations;
  isLoading = false;
  isActive = false;
  private patientId: string;
  constructor(private consultationService: ConsultationService,
              public route: ActivatedRoute,
              private fileService: FileService,
              private renderer: Renderer2
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
                  title: consultationData[0].title,
                  initials: consultationData[0].initials,
                  lastName: consultationData[0].lastName
            };
          console.log('consult details =-->', this.consultation.id);
          // }
        });
    });
  }

  ngAfterViewInit() {
    const acc = document.getElementsByClassName('accordion');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle('active');

    /* Toggle between hiding and showing the active panel */
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}
  }

  // toggleAccordion(event, index) {
  //   // let element = event.target;
  //   // element.classList.toggle("active");
    
  // }

}
