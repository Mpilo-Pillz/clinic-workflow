import { Injectable } from '@angular/core';
import { CFile } from './file.model';
import { Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Consultation } from '../consultation/consultation.model';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FileService {
  private cfiles: CFile[];
  private cFilesUpdated = new Subject<CFile[]>();
  private apiUrl = environment.baseApiUrl;

  private consultations: Consultation[] = [];

  constructor(
      private location: Location,
      private http: HttpClient,
      private router: Router) {}

  getCFiles() {
    this.http
      .get<{ message: string; cfiles: any }>(`${this.apiUrl}/api/cfiles`)
      .pipe(
        map((cFileData) => {
          return cFileData.cfiles.map((cfile) => {
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
              notes: cfile.notes,
            };
          });
        })
      )
      .subscribe((transformedCFiles) => {
        this.cfiles = transformedCFiles;
        this.cFilesUpdated.next([...this.cfiles]);
      });
  }

  getCFilesUpdateListener() {
    return this.cFilesUpdated.asObservable();
  }

  getCFile(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      initials: string;
      fullNames: string;
      lastName: string;
      idNumber: string;
      citizenship: string;
      gender: string;
      ethnicity: string;
      maritalStatus: string;
      language: string;
      religion: string;
      income: string;
      notes: string;
    }>(`${this.apiUrl}/api/cfiles/${id}`);
  }

  searchCFile(idnumber: string) {
    return this.http.get<{
      _id: string;
      title: string;
      initials: string;
      fullNames: string;
      lastName: string;
      idNumber: string;
      citizenship: string;
      gender: string;
      ethnicity: string;
      maritalStatus: string;
      language: string;
      religion: string;
      income: string;
      notes: string;
    }>(`${this.apiUrl}/api/cfiles/patient`, {
      params: {
        search: idnumber,
      },
    });
  }

  getPatientConsultations(idnumber: string) {
    return this.http.get<{}>(
      `${this.apiUrl}/api/cfiles/${idnumber}/consultations`,
      {}
    );
  }

  getPatientConsultation(id: string) {
    return this.http.get<{
      _id: string;
      date: string;
      diagnosis: string;
      prescription: string;
    }>(`${this.apiUrl}/api/cfiles/${id}`);
  }

  private uploadImageToCloudinary(imagePath, diagnosis) {
    const imageData = new FormData();
    imageData.append('file', imagePath, diagnosis);
    imageData.set('upload_preset', 'ml_default');
    imageData.set(
      'public_id',
      `clinic-workflow/diagnosis${new Date().getTime()}`
    );
    return this.http.post<{ url: string }>(
      `https://api.cloudinary.com/v1_1/mpilopillz/image/upload`,
      imageData
    );
  }

  addConsultation(id, diagnosis, prescription, imagePath) {
    this.uploadImageToCloudinary(imagePath, diagnosis)
      .pipe( //returning a new observable
        map(({ url }) => ({
          //mapping the values creating a new observable
          id,
          diagnosis,
          prescription,
          imagePath: url,
        })),
        switchMap((
          consultation // we switching to the we want switch to
        ) =>
          this.http.patch<Consultation>(
            `${this.apiUrl}/api/cfiles/new/consultation/${id}`,
            consultation
          )
        )
      )
      .subscribe((consultation) => {
        this.consultations.push(consultation);
        this.location.back();
        // this.router.navigateByUrl('/');
      });
  }

  addCFile(
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
  ) {
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
      notes,
    };
    this.http
      .post<{ message: string; cfileId: string }>(
        `${this.apiUrl}/api/cfiles`,
        cfile
      )
      .subscribe((responseData) => {
        const id = responseData.cfileId;
        cfile.id = id;
        this.cfiles.push(cfile);
        this.cFilesUpdated.next([...this.cfiles]);
        this.router.navigate(['/']);
      });
  }

  updateCFile(
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
  ) {
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
      notes,
    };
    this.http
      .patch(`${this.apiUrl}/api/cfiles/${id}`, cfile)
      .subscribe((response) => {
        const updatedCFiles = [...this.cfiles];
        const oldCFileIndex = updatedCFiles.findIndex((f) => f.id === id);
        updatedCFiles[oldCFileIndex] = cfile;
        this.cfiles = updatedCFiles;
        this.cFilesUpdated.next([...this.cfiles]);
        this.router.navigate(['/']);
      });
  }

  deletePost(cfileId: string) {
    this.http.delete(`${this.apiUrl}/api/cfiles/` + cfileId).subscribe(() => {
      const updatedCFiles = this.cfiles.filter((cfile) => cfile.id !== cfileId);
      this.cfiles = updatedCFiles;
      this.cFilesUpdated.next([...this.cfiles]);
    });
  }
}

// addNoUploadConsultation(id, diagnosis, prescription) {
//     const consultation: Consultation = {
//         id,
//         diagnosis,
//         prescription,
//     };
//     this.http
//     .patch<{message: string; consultationId: string }>(
//         `${this.apiUrl}/api/cfiles/new/consultation/${id}`,
//         consultation
//     ).subscribe(responseData => {
//         const id = responseData.consultationId;
//         consultation.id = id;
//         this.consultations.push(consultation);
//         this.consultationsUpdated.next([...this.consultations]);
//         this.router.navigate(['/']);
//     });
// }

// addConsultation(id, diagnosis, prescription, image) {
//     const consultationData = new FormData();
//     consultationData.append('id', id);
//     consultationData.append('diagnosis', diagnosis);
//     consultationData.append('prescription', prescription);
//     consultationData.append('image', image, diagnosis);
//     this.http
//     .patch<{message: string; consultationId: string }>(
//         `${this.apiUrl}/api/cfiles/new/consultation/${id}`,
//         consultationData
//     ).subscribe(responseData => {
//         const consultation: Consultation = {
//             id: responseData.consultationId,
//             diagnosis,
//             prescription,
//             image
//         };
//         this.consultations.push(consultation);
//         this.consultationsUpdated.next([...this.consultations]);
//         this.router.navigate(['/']);
//     });
// }
