import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionService} from '../../../shared/servises/position.service';
import {Position} from '../../../shared/interfaces';
import {MaterialInstance, MaterialToastService} from '../../../shared/material-toast.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId;
  public positions: Position[] = [];
  loading = false;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  form: FormGroup;
  positionId = null;

  constructor(
    private positionService: PositionService
  ) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    });

    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      console.log(positions);
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialToastService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }


  onSelectPosition(position: Position) {
    this.positionId = position._id;
    this.modal.open();
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    MaterialToastService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.modal.open();
    this.form.patchValue({
      name: null,
      cost: 1
    });
    MaterialToastService.updateTextInputs();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    const new_position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };
    if (this.positionId) {
      //  update
      new_position._id = this.positionId;
      this.positionService.update(new_position).subscribe(position => {
        MaterialToastService.toast('Изменения сохранены');
        console.log(position);

        const idx = this.positions.findIndex(p => p._id === position._id);
        this.positions[idx] = position;

        this.modal.close();
        this.modal.destroy();
      }, error1 => {
        MaterialToastService.toast(error1.error.message);
      }, () => {
        this.modal.close();
        this.form.reset({name: '', cost: 1});
        this.modal.destroy();
      });
    } else {
      this.positionService.create(new_position).subscribe(position => {
        MaterialToastService.toast('Позиция создана');
        this.positions.push(position);
        console.log(position);
        this.modal.close();
        this.modal.destroy();
      }, error1 => {
        MaterialToastService.toast(error1.error.message);
      }, () => {
        this.modal.close();
        this.form.reset({name: '', cost: 1});
        this.modal.destroy();
      });
    }


  }

  onDeletePosition(position: Position, e) {
    e.stopPropagation();
    const decition = window.confirm('удалить ' + position.name);
    if (decition) {
      this.positionService.delete(position).subscribe(res => {
        this.positions = this.positions.filter((pos) => pos._id !== position._id);
        MaterialToastService.toast(res.message);
      }, error1 => MaterialToastService.toast(error1.error.message));
    }
  }
}
