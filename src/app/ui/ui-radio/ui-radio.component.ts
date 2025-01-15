import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-radio',
  imports: [],
  standalone: true,
  templateUrl: './ui-radio.component.html',
  styleUrl: './ui-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRadioComponent {
  @Input() value: any;
  @Input() name: string = '';
  @Input() disabled: boolean = false;

  checked: boolean = false;

  private onChange: (value: any) => void = () => {};

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onChange(inputValue);
  }
}
