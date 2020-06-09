import { Injectable } from '@angular/core';
import { CFile } from './file.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class FileService {
    private cfiles: CFile[];
    private cFilesUpdated = new Subject<CFile[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getCFiles() {
        this.http.get<{message: string; cfiles: any}>('http://localhost:3000/api/cfiles')
        .pipe(
            map(cFileData => {
                return cFileData.cfiles.map(cfile => {
                    return {
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
                        religion: cfile.religion
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
        return this.http.get(`http://localhost:3000/api/cfiles/${id}`);
    }

    addCFile() {
        const cfileData = {};
        this.http
        .post<{message: string; cfile: CFile }>(
            'http://localhost:3000/api/cfiles',
            cfileData
        ).subscribe(responseData => {
            const cfile: CFile = {
                // id: responseData.cfile.id,
                title: responseData.cfile.title
            };
            this.cfiles.push(cfile);
            this.cFilesUpdated.next([...this.cfiles]);
            this.router.navigate(['/']);
        });
    }
}