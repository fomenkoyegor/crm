import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/servises/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialToastService} from "../../shared/material-toast.service";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;
  image: File;
  @ViewChild('input') inputRef: ElementRef;
  imagePreview = '';
  categoryImgSrc = '';
  categoty: Category;

  constructor(public route: ActivatedRoute, public categoriesService: CategoriesService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });


    // this.route.params.subscribe((params:Params)=>{
    //   if(params['id']){
    //   //  МЫ редактируем форму
    //     this.isNew = false;
    //   }else {
    //
    //   }
    // })
    this.form.disable();
    this.route.params
      .pipe(
        switchMap((parms: Params) => {
          if (parms['id']) {
            this.isNew = false;
            return this.categoriesService.getById(parms['id'])
          }
          return of(null)

        })
      )
      .subscribe(
        (category) => {
          if (category) {
            this.categoty = category;
            this.form.patchValue({
              name: category.name
            });
            this.imagePreview = category.imageSrc;
            this.categoryImgSrc = category.imageSrc;
            MaterialToastService.updateTextInputs();
          }
          this.form.enable();
        },
        (err) => {
          MaterialToastService.toast(err.error.message)
        }
      )


  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.categoty._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      (category) => {
        this.form.enable();
        MaterialToastService.toast('Изменения сщхранены');

      },
      (err) => {
        this.form.enable();
        MaterialToastService.toast(err.error.message)
      }
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(e) {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result
      };
      reader.readAsDataURL(file);
    } else {
      if (this.categoryImgSrc) {
        this.imagePreview = this.categoryImgSrc;
        return;
      }
      this.imagePreview = ''
    }
  }

  deleteCategory() {
    const confirm = window.confirm('delete ' + this.categoty.name);
    if (confirm){
        this.categoriesService.delete(this.categoty._id)
          .subscribe(
            (res)=>{
              MaterialToastService.toast(res.message)
            },
            (err)=>{
              MaterialToastService.toast(err.error.message)
            },
            ()=>{
              this.router.navigate(['/categories'])
            }
          )
    }
  }
}
