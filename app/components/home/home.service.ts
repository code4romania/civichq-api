import { SearchService } from './../../shared/services/search.service';
import { Injectable } from '@angular/core';
import { ListAppModel } from './../../shared/models/list-app.model';


@Injectable()
export class HomeService {

    constructor(private searchService: SearchService) {

    }

    getAllApps(): Promise<ListAppModel[]> {
        var theApps: ListAppModel[];

       return this.searchService.getAllApps()
       .then(res => {theApps = res; 
           //console.log('Apps in service: ' + theApps.length);
           return theApps;    
    });

       //return Promise.resolve(theApps);
    }

}