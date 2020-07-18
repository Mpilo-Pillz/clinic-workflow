import { Injectable } from '@angular/core';
import { CFile } from './file.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Consultation } from '../consultation/consultation.model';

@Injectable({ providedIn: 'root'})
export class FileService {
    private cfiles: CFile[];
    private cFilesUpdated = new Subject<CFile[]>();
    private apiUrl = environment.baseApiUrl;

    private consultations: Consultation[];
    private consultationsUpdated = new Subject<Consultation[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getCFiles() {
        this.http.get<{message: string; cfiles: any}>(`${this.apiUrl}/api/cfiles`)
        .pipe(
            map(cFileData => {
                return cFileData.cfiles.map(cfile => {
                    return {
                        id: cfile._id,
                        title: cfile.title,
                        initials: cfile.initials,
                        fullNames: cfile.fullNames,
                        lastName: cfile.lastName,
                        idNumber: cfile.idNumber,
                        citizenship: cfile.citizenship,
                        gender: cfile.gender,
                        ethnicity: cfile.ethnicity,
                        maritalStatus: cfile.maritalStatus,
                        language: cfile.language,
                        religion: cfile.religion,
                        income: cfile.income,
                        notes: cfile.notes
                    };
                });
            })
        ). subscribe(transformedCFiles => {
            this.cfiles = transformedCFiles;
            this.cFilesUpdated.next([...this.cfiles]);
        });
    }

    getCFilesUpdateListener() {
        return this.cFilesUpdated.asObservable();
    }

    getCFile(id: string) {
        return this.http.get<{
            _id: string,
            title: string,
            initials: string,
            fullNames: string,
            lastName: string,
            idNumber: string,
            citizenship: string,
            gender: string,
            ethnicity: string,
            maritalStatus: string,
            language: string,
            religion: string,
            income: string,
            notes: string
        }>(`${this.apiUrl}/api/cfiles/${id}`);
    }

    searchCFile(idnumber: string) {
        return this.http.get<{
            _id: string,
            title: string,
            initials: string,
            fullNames: string,
            lastName: string,
            idNumber: string,
            citizenship: string,
            gender: string,
            ethnicity: string,
            maritalStatus: string,
            language: string,
            religion: string,
            income: string,
            notes: string
        }>(`${this.apiUrl}/api/cfiles/patient`, {
            params: {
              search: idnumber
            }
        });
    }

    getPatientConsultations(idnumber: string) {
        return this.http.get<{
        }>(`${this.apiUrl}/api/cfiles/${idnumber}/consultations`, {});
    }

    getPatientConsultation(id: string) {
        return this.http.get<{
            _id: string,
            date: string,
            diagnosis: string,
            prescription: string,
        }>(`${this.apiUrl}/api/cfiles/${id}`);
    }

    addConsultation(id, diagnosis, prescription) {
        const consultation: Consultation = {
            id,
            diagnosis,
            prescription,
        };
        this.http
        .patch<{message: string; consultationId: string }>(
            `${this.apiUrl}/api/cfiles/new/consultation/${id}`,
            consultation
        ).subscribe(responseData => {
            const id = responseData.consultationId;
            consultation.id = id;
            this.consultations.push(consultation);
            this.consultationsUpdated.next([...this.consultations]);
            this.router.navigate(['/']);
        });
    }

    addCFile(
        title, initials, fullNames, lastName, idNumber, 
        citizenship, gender, ethnicity, maritalStatus, language, religion, 
        income, notes) {
        const cfile: CFile = {
            id: null,
                title,
                initials,
                fullNames,
                lastName,
                idNumber,
                citizenship,
                gender,
                ethnicity,
                maritalStatus,
                language,
                religion,
                income,
                notes
        };
        this.http
        .post<{message: string; cfileId: string }>(
            `${this.apiUrl}/api/cfiles`,
            cfile
        ).subscribe(responseData => {
            const id = responseData.cfileId;
            cfile.id = id;
            this.cfiles.push(cfile);
            this.cFilesUpdated.next([...this.cfiles]);
            this.router.navigate(['/']);
        });
    }
    
    updateCFile(id, title, initials, fullNames, lastName, idNumber, 
                citizenship, gender, ethnicity, maritalStatus, language, religion, income, notes) {
        const cfile: CFile = {
                id,
                title,
                initials,
                fullNames,
                lastName,
                idNumber,
                citizenship,
                gender,
                ethnicity,
                maritalStatus,
                language,
                religion,
                income,
                notes
        };
        this.http
        .patch(`${this.apiUrl}/api/cfiles/${id}`, cfile)
        .subscribe(response => {
            const updatedCFiles = [...this.cfiles];
            const oldCFileIndex = updatedCFiles.findIndex(f => f.id === id);
            updatedCFiles[oldCFileIndex] = cfile;
            this.cfiles = updatedCFiles;
            this.cFilesUpdated.next([...this.cfiles]);
            this.router.navigate(['/']);
        })
    }

    deletePost(cfileId: string) {
        this.http
          .delete(`${this.apiUrl}/api/cfiles/` + cfileId)
          .subscribe(() => {
            const updatedCFiles = this.cfiles.filter(cfile => cfile.id !== cfileId);
            this.cfiles = updatedCFiles;
            this.cFilesUpdated.next([...this.cfiles]);
          });
      }
}
