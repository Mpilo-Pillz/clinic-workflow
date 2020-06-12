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
        }>(`http://localhost:3000/api/cfiles/${id}`);
    }

    addCFile(title, initials, fullNames, lastName, idNumber, citizenship, gender, ethnicity, maritalStatus, language, religion) {
        const cfile: CFile = {
            id: null,
                title: title,
                initials: initials,
                fullNames: fullNames,
                lastName: lastName,
                idNumber: idNumber,
                citizenship: citizenship,
                gender: gender,
                ethnicity: ethnicity,
                maritalStatus: maritalStatus,
                language: language,
                religion: religion,
        };
        this.http
        .post<{message: string; cfileId: string }>(
            'http://localhost:3000/api/cfiles',
            cfile
        ).subscribe(responseData => {
            const id = responseData.cfileId;
            cfile.id = id;
            this.cfiles.push(cfile);
            this.cFilesUpdated.next([...this.cfiles]);
            this.router.navigate(['/']);
        });
    }
    
    updateCFile(id, title, initials, fullNames, lastName, idNumber, citizenship, gender, ethnicity, maritalStatus, language, religion) {
        const cfile: CFile = {
                id: id,
                title: title,
                initials: initials,
                fullNames: fullNames,
                lastName: lastName,
                idNumber: idNumber,
                citizenship: citizenship,
                gender: gender,
                ethnicity: ethnicity,
                maritalStatus: maritalStatus,
                language: language,
                religion: religion,
        };
        this.http
        .put(`http://localhost:3000/api/cfiles/${id}`, cfile)
        .subscribe(response => {
            const updatedCFiles = [...this.cfiles];
            const oldCFileIndex = updatedCFiles.findIndex(f => f.id === id);
            const cfile: CFile = {
                id: id,
                title:title,
                initials: initials,
                fullNames: fullNames,
                lastName: lastName,
                idNumber: idNumber,
                citizenship: citizenship,
                gender: gender,
                ethnicity: ethnicity,
                maritalStatus: maritalStatus,
                language: language,
                religion: religion,
            };
        })
    }

    deletePost(cfileId: string) {
        this.http
          .delete("http://localhost:3000/api/posts/" + cfileId)
          .subscribe(() => {
            const updatedPosts = this.cfiles.filter(post => post.id !== cfileId);
            this.cfiles = updatedPosts;
            this.cFilesUpdated.next([...this.cfiles]);
          });
      }
}
