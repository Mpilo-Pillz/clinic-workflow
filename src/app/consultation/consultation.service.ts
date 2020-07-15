import { Injectable } from '@angular/core';
import { Consultation } from './consultation.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class ConsultationService {
    private consultations: Consultation[];
    private consultationsUpdated = new Subject<Consultation[]>();
    private apiUrl = environment.baseApiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    

    getConsultationsUpdateListener() {
        return this.consultationsUpdated.asObservable();
    }

    getConsultationFile(id: string) {
        return this.http.get<{
            _id: string,
            date: Date,
            diagnosis: string,
        }>(`${this.apiUrl}/api/cfiles/${id}`);
    }

    getPatientConsultations(idnumber: string) {
        return this.http.get<{
        }>(`${this.apiUrl}/api/cfiles/${idnumber}/consultations`, {});
    }

    addConsultation(diagnosis) {
        const cfile: any = {
                consultation: diagnosis
        };
        this.http
        .patch<{message: string; cfileId: string }>(
            `${this.apiUrl}/api/cfiles`,
            cfile
        ).subscribe(responseData => {
            const id = responseData.cfileId;
            cfile.id = id;
            this.consultations.push(cfile);
            this.consultationsUpdated.next([...this.consultations]);
            this.router.navigate(['/']);
        });
    }
//look at the fileservice for this
    updateConsultation(diagnosis) {
        const cfile: any = {
                diagnosis
        };
        this.http
        .patch(`${this.apiUrl}/api/cfiles/${diagnosis}`, cfile)
        .subscribe(response => {
            const updatedConsultations = [...this.consultations];
            const oldConsultationIndex = updatedConsultations.findIndex(f => f.id === diagnosis);
            updatedConsultations[oldConsultationIndex] = cfile;
            this.consultations = updatedConsultations;
            this.consultationsUpdated.next([...this.consultations]);
            this.router.navigate(['/']);
        })
    }

    deletePost(consultationId: string) {
        this.http
          .delete(`${this.apiUrl}/api/cfiles/` + consultationId)
          .subscribe(() => {
            const updatedConsultations = this.consultations.filter(consultation => consultation.id !== consultationId);
            this.consultations = updatedConsultations;
            this.consultationsUpdated.next([...this.consultations]);
          });
      }
}
