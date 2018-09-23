import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/servises/categories.service';
import {Observable} from 'rxjs';
import {Category} from '../../shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(public categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

}
