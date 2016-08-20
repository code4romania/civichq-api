import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';


@Injectable()
export class CategoryService {

    getCategories() {

        let categories: CategoryModel[] = [
            { id: 1, catname: 'Social', ordinal: 10 },
            { id: 2, catname: 'Educatie', ordinal: 20 },
            { id: 3, catname: 'Mediu', ordinal: 30 },
            { id: 4, catname: 'Transparenta', ordinal: 40 },
            { id: 5, catname: 'Politic', ordinal: 50 },
            { id: 6, catname: 'Servicii', ordinal: 60 }
        ];

        return Promise.resolve(categories);
    }

}