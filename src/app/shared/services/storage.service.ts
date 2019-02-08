import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() {
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    getItem(key: string): Observable<any> {
        let item = localStorage.getItem(key);

        if (item && item !== 'undefined') {
            return Observable.of(item);
        } else {
            return Observable.throw('Item does not exist');
        }
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
