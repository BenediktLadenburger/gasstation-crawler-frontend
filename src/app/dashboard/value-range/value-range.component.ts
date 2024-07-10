import { Component, WritableSignal, signal, effect, Signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { firstValueFrom } from 'rxjs';
import { LocalizationService } from '../../services/localization.service';
import { ValueRangeLocales } from './value-range-locales';
import { MatDividerModule } from '@angular/material/divider';
import { ValueRangeSelectionsComponent } from './value-range-selections/value-range-selections.component';
import { PriceGraphComponent } from './price-graph/price-graph.component';

export interface DateSignal {
    startDate: Date
    endDate: Date
}

@Component({
    selector: 'value-range-viewer',
    standalone: true,
    imports: [MatDividerModule, ValueRangeSelectionsComponent, PriceGraphComponent,],
    templateUrl: './value-range.component.html',
    styleUrl: './value-range.component.scss',
})
export class ValueRangeComponent {

    public requestData: any;
    public readonly labels = ValueRangeLocales;
    public mutDateSignal: WritableSignal<DateSignal | null> = signal(null);

    constructor(
        private apiService: ApiService,
        private localeService: LocalizationService,
    ) {}

    public getSignal() {
        return this.mutDateSignal.asReadonly();
    }


    async ngOnInit() {
        this.requestData = await firstValueFrom(
            this.apiService.getValueRange([1,2,3,4,5], new Date(), new Date()),
        );
    }
}
