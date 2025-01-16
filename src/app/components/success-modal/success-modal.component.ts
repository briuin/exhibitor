import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { Store } from '@ngrx/store';
import { selectLastAddMultipleExhibitorResponse } from '../../exhibitor/store/exhibitor.selectors';
import { filter, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { UiButtonLinkComponent } from "../../ui/ui-button-link/ui-button-link.component";

@Component({
  selector: 'app-success-modal',
  imports: [UiButtonComponent, CommonModule, UiButtonLinkComponent],
  standalone: true,
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss',
})
export class SuccessModalComponent {
  @ViewChild('uniqueCode') uniqueCodeRef!: ElementRef;
  @Input() message: string = 'All exhibitors have been successfully added!';
  uniqueId: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.select(selectLastAddMultipleExhibitorResponse).pipe(
      filter((x) => x.length > 0),
      tap((x) => (this.uniqueId = x[0].exhibitor.S_group_reg_id))
    ).subscribe();
  }

  downloadImage(): void {
    const element = this.uniqueCodeRef.nativeElement;

    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = `registration-code-${this.uniqueId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  closeModal() {
    this.activeModal.dismiss('close click');
    location.reload();
  }
}
