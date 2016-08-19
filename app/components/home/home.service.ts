import { Injectable } from '@angular/core';
import { CategoryModel } from './category.model';
import { ListAppModel } from './list-app.model';


@Injectable()
export class HomeService {

    getCategories() {

        let categories: CategoryModel[] = [
            { Id: 1, CatName: 'Social', Ordinal: 10 },
            { Id: 2, CatName: 'Educatie', Ordinal: 20 },
            { Id: 3, CatName: 'Mediu', Ordinal: 30 },
            { Id: 4, CatName: 'Transparenta', Ordinal: 40 },
            { Id: 5, CatName: 'Politic', Ordinal: 50 },
            { Id: 6, CatName: 'Servicii', Ordinal: 60 }
        ];

        return Promise.resolve(categories);
    }

    getTopChildrenForCategories() {

        let app: ListAppModel[] = [
            { CategoryId: 1, CategoryName: 'Social', AppName: 'Social App 1', Tags: '#social tag 1', AppLogoName:'sociallogo1.png' },
            { CategoryId: 1, CategoryName: 'Social', AppName: 'Social App 2', Tags: '#social tag 2', AppLogoName:'sociallogo1.png' },
            { CategoryId: 1, CategoryName: 'Social', AppName: 'Social App 3', Tags: '#social tag 2', AppLogoName:'sociallogo1.png' },
            { CategoryId: 1, CategoryName: 'Social', AppName: 'Social App 4', Tags: '#social tag 3', AppLogoName:'sociallogo1.png' },

            { CategoryId: 2, CategoryName: 'Educatie', AppName: 'Educatie App 1', Tags: '#educatie tag 1', AppLogoName:'educatielogo1.png' },
            { CategoryId: 2, CategoryName: 'Educatie', AppName: 'Educatie App 2', Tags: '#educatie tag 2', AppLogoName:'educatielogo2.png' },
            { CategoryId: 2, CategoryName: 'Educatie', AppName: 'Educatie App 3', Tags: '#educatie tag 3', AppLogoName:'educatielogo3.png' },
            { CategoryId: 2, CategoryName: 'Educatie', AppName: 'Educatie App 4', Tags: '#educatie tag 4', AppLogoName:'educatielogo4.png' },

            { CategoryId: 3, CategoryName: 'Mediu', AppName: 'Mediu App 1', Tags: '#mediu tag 1', AppLogoName:'mediulogo1.png' },
            { CategoryId: 3, CategoryName: 'Mediu', AppName: 'Mediu App 2', Tags: '#mediu tag 2', AppLogoName:'mediulogo2.png' },
            { CategoryId: 3, CategoryName: 'Mediu', AppName: 'Mediu App 3', Tags: '#mediu tag 3', AppLogoName:'mediulogo3.png' },
            { CategoryId: 3, CategoryName: 'Mediu', AppName: 'Mediu App 4', Tags: '#mediu tag 4', AppLogoName:'mediulogo4.png' },

            { CategoryId: 4, CategoryName: 'Transparenta', AppName: 'Transparenta App 1', Tags: '#transp tag 1', AppLogoName:'transplogo1.png' },
            { CategoryId: 4, CategoryName: 'Transparenta', AppName: 'Transparenta App 2', Tags: '#transp tag 2', AppLogoName:'transplogo2.png' },
            { CategoryId: 4, CategoryName: 'Transparenta', AppName: 'Transparenta App 3', Tags: '#transp tag 2', AppLogoName:'transplogo3.png' },
            { CategoryId: 4, CategoryName: 'Transparenta', AppName: 'Transparenta App 4', Tags: '#transp tag 3', AppLogoName:'transplogo4.png' }
        ];

        return Promise.resolve(app);
    }

}