import { SearchService } from './../../shared/services/search.service';
import { CategoryService } from './../../shared/services/category.service';
import { Injectable } from '@angular/core';
import { ListAppModel } from './../../shared/models/list-app.model';


@Injectable()
export class HomeService {

    constructor(private categoryService: CategoryService,
                private searchService: SearchService) {

    }

    getCategories() {

        return this.categoryService.getCategories();
    }

    getTopChildrenForCategories() {

       return this.searchService.getAllApps();        
    }

}