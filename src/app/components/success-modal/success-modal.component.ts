import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { Store } from '@ngrx/store';
import { selectLastAddMultipleExhibitorResponse } from '../../exhibitor/store/exhibitor.selectors';
import { filter, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  imports: [UiButtonComponent, CommonModule],
  standalone: true,
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  @Input() message: string = 'All exhibitors have been successfully added!';
  uniqueId$!: Observable<string>;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.uniqueId$ = this.store
      .select(selectLastAddMultipleExhibitorResponse)
      .pipe(
        filter((x) => x.length > 0),
        map((x) => x[0].exhibitor.S_group_reg_id)
      );
  }
}
