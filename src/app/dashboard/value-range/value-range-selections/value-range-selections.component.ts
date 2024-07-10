import { Component, Input, effect, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { LocalizationService } from '../../../services/localization.service';
import { ValueRangeSelLocales } from './value-range-sel-locales';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'value-range-selections',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './value-range-selections.component.html',
    styleUrl: './value-range-selections.component.scss',
    providers: [provideNativeDateAdapter()],
})
export class ValueRangeSelectionsComponent {
    @Input({
        alias: 'dateSignal',
        required: true,
    }) dateChange!: WritableSignal<{startDate: Date, endDate: Date} | null>;

    dateForm = new FormGroup({
        startDate: new FormControl<Date | null>(null),
        endDate: new FormControl<Date | null>(null),
    });
    public readonly locale = this.localeService.getLocale();
    public readonly labels = ValueRangeSelLocales;

    constructor(
        private dateAdapter: DateAdapter<any>,
        private localeService: LocalizationService,
    ) {
        effect(() => {
            // TODO: set monday first day (German)
            this.dateAdapter.setLocale(this.locale());
        });
        this.dateForm.valueChanges.subscribe(() => {
            if (this.dateForm.controls.startDate.value === null) return;
            if (this.dateForm.controls.endDate.value === null) return;

            const signal = {
                startDate: this.dateForm.controls.startDate.value,
                endDate: this.dateForm.controls.endDate.value,
            }

            console.log('im here');
            this.dateChange.set(signal);
        });
    }
}
