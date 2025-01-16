import { CommonModule } from '@angular/common';
import { Component, inject, Injector, Input, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrowUpIconComponent } from '../icons/arrow-up-icon/arrow-up-icon.component';
import { ArrowDownIconComponent } from '../icons/arrow-down-icon/arrow-down-icon.component';

@Component({
  selector: 'app-ui-select',
  imports: [
    CommonModule,
    NgbDropdownModule,
    ArrowUpIconComponent,
    ArrowDownIconComponent,
  ],
  standalone: true,
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UiSelectComponent,
      multi: true,
    },
  ],
})
export class UiSelectComponent implements ControlValueAccessor {
  @ViewChild('dropdown') dropdown!: NgbDropdown;

  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() hint: string = '';

  selectedOption?: { label: string; value: any };
  private injector = inject(Injector);

  ngControl: NgControl | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  get isOpened() {
    if (!this.dropdown) {
      return false;
    }
    return this.dropdown.isOpen();
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;

      if (this.ngControl?.value) {
        this.selectedOption = this.options.find(
          (opt) => opt.value === this.ngControl?.value
        );
      }
    }
  }

  selectOption(option: { label: string; value: any }): void {
    this.selectedOption = option;
    this.onChange(option.value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.selectedOption = this.options.find((opt) => opt.value === value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
