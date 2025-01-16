import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UiRadioComponent } from '../ui-radio/ui-radio.component';

@Component({
  selector: 'app-ui-radio-group',
  imports: [],
  standalone: true,
  templateUrl: './ui-radio-group.component.html',
  styleUrl: './ui-radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiRadioGroupComponent),
      multi: true,
    },
  ],
})
export class UiRadioGroupComponent
  implements ControlValueAccessor, AfterContentInit
{
  @Input() name: string = '';
  @Input() label: string = '';

  @ContentChildren(UiRadioComponent) radios!: QueryList<UiRadioComponent>;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private _value: any;

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.updateRadioButtons();
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this._value = value;
    this.updateRadioButtons();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (!this.radios?.length) {
      return;
    }
    this.radios.forEach((radio) => {
      radio.disabled = isDisabled;
    });
  }

  ngAfterContentInit(): void {
    this.radios.forEach((radio) => {
      radio.name = this.name;
      radio.registerOnChange((value: any) => {
        this.value = value;
      });
    });
    this.updateRadioButtons();
  }

  private updateRadioButtons(): void {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
      });
    }
  }
}
