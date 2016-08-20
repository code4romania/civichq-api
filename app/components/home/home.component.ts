import { CategoryService } from './../../shared/services/category.service';
import { CategoryModel } from './../../shared/models/category.model';
import { Component, OnInit } from '@angular/core';
import { HomeService  } from './home.service';
import { ListAppModel } from './list-app.model';

@Component({
  selector: 'home-component',
  templateUrl: 'app/components/home/home.component.html',
  providers: [HomeService, CategoryService]
})

export class HomeComponent implements OnInit {

  categories: CategoryModel[];
  categoriesForApps: CategoryModel[];

  apps: ListAppModel[];


  private selectedCategory: CategoryModel;


  constructor(private homeService: HomeService)
  { }

  ngOnInit() {
    this.homeService.getCategories()
      .then(c => { this.categories = c; this.categoriesForApps = c; })
      .catch(err => console.log(err));

    this.homeService.getTopChildrenForCategories()
      .then(a => this.apps = a)
      .catch(err => console.log(err));


  }

  onSelectCategory(cat) {
    this.selectedCategory = cat;

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
}