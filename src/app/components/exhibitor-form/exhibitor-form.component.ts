import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../models/select-option.model';
import { UiCardComponent } from '../../ui/ui-card/ui-card.component';
import { UiInputComponent } from '../../ui/ui-input/ui-input.component';
import { UiSelectComponent } from '../../ui/ui-select/ui-select.component';

@Component({
  selector: 'app-exhibitor-form',
  imports: [
    UiCardComponent,
    ReactiveFormsModule,
    UiInputComponent,
    UiSelectComponent,
  ],
  standalone: true,
  templateUrl: './exhibitor-form.component.html',
  styleUrl: './exhibitor-form.component.scss',
})
export class ExhibitorFormComponent {
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Input() provincesOptions: SelectOption[] = [];
  @Input() error = '';
  @Output() remove = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onRemoveClick(): void {
    this.remove.emit();
  }
}
