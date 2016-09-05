import { CategoryService } from './../services/category.service';
import { CAROUSEL_DIRECTIVES } from 'ng2-bootstrap/components/carousel';
import { CORE_DIRECTIVES } from '@angular/common';
import { ListAppModel } from './../models/list-app.model';
import { CategoryModel } from './../models/category.model';
import { Component, OnInit, Input,Inject } from '@angular/core';
import { CategoryPipe } from './../../shared/pipes/category-pipe';
import {ChunkSizeService} from './../../shared/services/windowSize.service';

@Component({
    moduleId: module.id,
    selector: 'app-list',
    templateUrl: 'app-list.component.html',
    providers: [CategoryService,ChunkSizeService],
    directives: [CORE_DIRECTIVES, CAROUSEL_DIRECTIVES],
    pipes: [CategoryPipe]
})
export class AppListComponent implements OnInit {

    categories: CategoryModel[];
    categoriesForApps: CategoryModel[];
    
    @Input() apps:ListAppModel[];


    private selectedCategory: CategoryModel;
    selected: number;

    constructor(private catService: CategoryService, private cSize: ChunkSizeService) {
    }

    ngOnInit() {
        this.catService.getCategories()
            .then(c => {
                this.categories = c;
                this.categoriesForApps = c;
                this.selected = 0;
                let size = this.cSize.getChunkSize();
                this.FilterAppsByCategory();
                this.ChunkSlides(size);
            });
            
           
    }

    onSelectCategory(cat) {
        this.selectedCategory = cat;
        this.selected = cat.id - 1;

        this.sortCategoriesForApps();
    }
    onResize(event) {
        let size = this.cSize.getChunkSize();
        this.ChunkSlides(size);
    }

    private sortCategoriesForApps() {
        if (this.selectedCategory) {

            let firstCategory = this.GetSelectedCategoryAsArray();

            let restOfItems = this.GetCategoriesExceptSelected();

            this.categoriesForApps = firstCategory.concat(restOfItems);

        }

    }

    private GetSelectedCategoryAsArray() {
        let arr: CategoryModel[] = [];
        arr[0] = this.selectedCategory;

        return arr;
    }


    private GetCategoriesExceptSelected() {

        let restOfItems: CategoryModel[];
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
        }
    }

    private ChunkSlides(size) {
        for (let i = 0; i < this.categoriesForApps.length; i++) {
            let slidesArray: Array<any> = [];
            let arrayLength: number = this.categoriesForApps[i].apps.length;
            for (let j = 0; j < arrayLength; j += size) {
                slidesArray.push(this.categoriesForApps[i].apps.slice(j, j + size))
            }
            (<any>this.categoriesForApps[i]).slides  = slidesArray
        }

    }
}