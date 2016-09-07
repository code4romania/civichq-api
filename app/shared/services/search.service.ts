import { Http } from '@angular/http';
import { BaseService } from './../models/base.service';
import { Injectable } from '@angular/core';
import { ListAppModel } from './../models/list-app.model';

@Injectable()
export class SearchService extends BaseService {

    constructor(private http: Http) {
        super(http);
    }

    getAllApps(): Promise<ListAppModel[]> {
        
        let theApps: ListAppModel[] = [];

        return this.http.get(this.rootAddress + 'approvedapps')
            .toPromise()
            .then(res => {
                theApps = res.json() as ListAppModel[];
                //console.log('Apps in service: ' + theApps.length);
                return theApps;
            })
            .catch(this.handleError);

        
    }

    searchBy(src: string): Promise<ListAppModel[]> {
        if (!src) { return; }
        let theApps: ListAppModel[] = [];

        return this.http.get(this.rootAddress + 'search/' + src)
            .toPromise()
            .then(res => {
                theApps = res.json() as ListAppModel[];
                return theApps;
            })
            .catch(this.handleError);

    }
}