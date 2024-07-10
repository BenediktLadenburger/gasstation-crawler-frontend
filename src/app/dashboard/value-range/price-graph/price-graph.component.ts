import { Component, Input, OnInit, Signal, effect } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PriceGraphService } from './price-graph.service';
import { DateSignal } from '../value-range.component';

@Component({
    selector: 'price-graph',
    standalone: true,
    imports: [CanvasJSAngularChartsModule],
    templateUrl: './price-graph.component.html',
    styleUrl: './price-graph.component.scss',
    providers: [PriceGraphService],
})
export class PriceGraphComponent implements OnInit {
    @Input('fuelType') fuelType: string = 'Super E10';
    @Input('startDate') start!: Date;
    @Input('endDate') end!: Date;
    @Input({ alias: 'data', required: true }) data!: any;
    @Input() dateSignal!: Signal<DateSignal | null>;

    public chartOptions!: any;

    // TODO: Implement units
    unit = 'EUR';

    constructor(private graphService: PriceGraphService) {
        effect(() => {
            const dateValues = this.dateSignal()
            if (!dateValues) return;

            this.chartOptions = this.graphService.createGraphData(
                this.data,
                this.fuelType,
                dateValues.startDate,
                dateValues.endDate,
            );
        });
    }

    ngOnInit(): void {
        this.chartOptions = this.graphService.createGraphData(
            this.data,
            this.fuelType,
            this.start,
            this.end,
        );
    }
}
