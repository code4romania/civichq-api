import { Http, Response } from '@angular/http';
import { BaseService } from './../models/base.service';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

class DbCategory{
    Id: number;
    CatName: string;
    Ordinal: number;
}

@Injectable()
export class CategoryService extends BaseService {

    constructor(private http: Http){
        super(http);
    }
    
    getCategories(): Promise<CategoryModel[]> {

        let categories: CategoryModel[] = [];

        return this.http.get(this.rootAddress + 'categories')
        .toPromise()
        .then(res => {
            var dbCategories = res.json() as DbCategory[];
            
            dbCategories.forEach(c => categories.push(
                {id: c.Id, catname: c.CatName, apps:[], ordinal: c.Ordinal }
            ));
            //console.log('Categories in category service: ' + dbCategories.length);
            return categories;
        })
        .catch(this.handleError);       

    }

}