import { CommonModule } from '@angular/common';
import { Component, inject, Injector, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-ui-select',
  imports: [CommonModule],
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
  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder: string = '';
  @Input() label: string = '';

  private injector = inject(Injector);
  value: any;

  ngControl: NgControl | null = null;

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
  }
}
