import { CategoryService } from './../../shared/services/category.service';
import { CategoryModel } from './../../shared/models/category.model';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { CAROUSEL_DIRECTIVES }  from 'ng2-bootstrap/components/carousel'
import {CategoryPipe} from './category-pipe';
import { HomeService  } from './home.service';
import { ListAppModel } from './list-app.model';

@Component({
    selector: 'home-component',
    templateUrl: 'app/components/home/home.component.html',
    providers: [CategoryService, HomeService],
    directives: [CORE_DIRECTIVES, CAROUSEL_DIRECTIVES],
    pipes: [CategoryPipe]
})

export class HomeComponent implements OnInit {

    categories:CategoryModel[];
    categoriesForApps:CategoryModel[];

    apps:ListAppModel[];


    private selectedCategory:CategoryModel;
    selected:number;


    constructor(private homeService:HomeService) {
    }

    ngOnInit() {
        this.homeService.getCategories()
            .then(c => {
                this.categories = c;
                this.categoriesForApps = c;
                this.selected = 0;
            })
            .catch(err => console.log(err));

        this.homeService.getTopChildrenForCategories()
            .then(a => {
                this.apps = a;
                this.FilterAppsByCategory();
            })
            .catch(err => console.log(err));


    }

    onSelectCategory(cat) {
        this.selectedCategory = cat;
        this.selected = cat.id - 1;

        this.sortCategoriesForApps();
    }

    private sortCategoriesForApps() {
        if (this.selectedCategory) {

            let firstCategory = this.GetSelectedCategoryAsArray();

            let restOfItems = this.GetCategoriesExceptSelected();

            this.categoriesForApps = firstCategory.concat(restOfItems);

        }

    }

    private GetSelectedCategoryAsArray() {
        let arr:CategoryModel[] = [];
        arr[0] = this.selectedCategory;

        return arr;
    }


    private GetCategoriesExceptSelected() {

        let restOfItems:CategoryModel[];
        this.categoriesForApps = this.categories;
        restOfItems = this.categoriesForApps.filter(x => x.id != this.selectedCategory.id);

        return restOfItems;

    }

    private FilterAppsByCategory() {
        for (let i = 0; i < this.categoriesForApps.length; i++) {
            for (let j = 0; j < this.apps.length; j++) {
                if (this.apps[j].CategoryId == this.categoriesForApps[i].id) {
                    this.categoriesForApps[i].apps.push(this.apps[j])
                }
            }
            (<any>this.categoriesForApps[i]).slides = this.ChunkSlides(this.categoriesForApps[i].apps,3);

        }


    }

    private ChunkSlides(array, size) {
        let slidesArray:Array<any> = [];
        let arrayLength: number = array.length;
        for(let i = 0; i < arrayLength; i += size  ){
            slidesArray.push(array.slice(i, i + 3))
        }
        return slidesArray;
    }
}
