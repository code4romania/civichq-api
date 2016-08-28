import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';


@Injectable()
export class CategoryService {

    getCategories() {

        let categories: CategoryModel[] = [
            { id: 1, catname: 'Social',apps:[], ordinal: 10 },
            { id: 2, catname: 'Educatie',apps:[], ordinal: 20 },
            { id: 3, catname: 'Mediu',apps:[], ordinal: 30 },
            { id: 4, catname: 'Transparenta',apps:[], ordinal: 40 },
            { id: 5, catname: 'Politic',apps:[], ordinal: 50 },
            { id: 6, catname: 'Servicii',apps:[], ordinal: 60 }
        ];

        return Promise.resolve(categories);
    }

}