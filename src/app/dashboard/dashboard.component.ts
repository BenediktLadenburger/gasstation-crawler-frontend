import { Component } from '@angular/core';
import { ValueRangeComponent } from './value-range/value-range.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LocalizationService } from '../services/localization.service';
import { DashboardLocales } from './dashboard-locales';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        ValueRangeComponent,
        MatTabsModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    constructor(private localeService: LocalizationService) {}

    public readonly labels = DashboardLocales;
    public readonly locale = this.localeService.getLocale();
}
