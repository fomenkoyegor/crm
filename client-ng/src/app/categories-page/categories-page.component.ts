import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../shared/servises/categories.service";
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(public categoriesService: CategoriesService) {
  }

  ngOnInit() {
    // this.categoriesService.fetch().subscribe(categories => console.log(categories))
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoriesService.fetch();
  }

}
