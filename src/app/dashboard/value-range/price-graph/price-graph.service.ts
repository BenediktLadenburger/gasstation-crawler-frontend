import { Injectable } from '@angular/core';

@Injectable()
export class PriceGraphService {
    private start!: Date;
    private end!: Date;
    private data!: any;
    private fueltype!: string;
    private extremes!: any

    private createExtremes() {
        const flatMap = this.data
            .map((d: any) => d.price_history[this.fueltype])
            .flat(1);
        const dates = flatMap.map((obj: any) => new Date(obj.time_created));
        const prices = flatMap.map((obj: any) => obj.price);

        this.extremes = {
            minDate:  new Date(Math.min(...dates)),
            maxDate: new Date(Math.max(...dates)),
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
        }
    }

    public createGraphData(
        data: any,
        fueltype: string,
        start?: Date,
        end?: Date,
    ) {
        this.data = data;
        this.fueltype = fueltype;
        this.createExtremes();

        if (!start)
            this.start = this.extremes.minDate;
        else
            this.start = start;

        if (!end)
            this.end = this.extremes.maxDate;
        else
            this.end = end


        const chartOptions = {
            zoomEnabled: true,
            zoomType: 'xy',
            exportEnabled: false,
            theme: 'dark1',
            title: {
                text: '',
            },
            subtitles: [
                {
                    text: 'Peisverlauf ' + this.fueltype,
                    fontSize: 14,
                },
            ],
            axisX: {
                title: 'Tag',
                minimum: this.start,
                maximum: this.end,
            },
            axisY: {
                minimum: this.extremes.minPrice,
                maximum: this.extremes.maxPrice,
                title: 'Preis',
                lineThickness: 1,
                tickColor: '#6D78AD',
                titleFontColor: '#6D78AD',
                valueFormatString: '#,##0.000',
            },
            toolTip: {
                shared: true,
            },
            legend: {
                cursor: 'pointer',
                itemclick: function (e: any) {
                    if (
                        typeof e.dataSeries.visible === 'undefined' ||
                        e.dataSeries.visible
                    ) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                },
            },
            data: this.createDataPoints(data),
        };
        return chartOptions;
    }

    private createDataPoints(data: any) {
        const final = [];
        for (const obj of data) {
            const i =
                final.push({
                    type: 'line',
                    name: obj.gasstation.name,
                    showInLegend: true,
                    yValueFormatString: '#,##0.000 ' + 'EUR',
                    dataPoints: [] as any[],
                }) - 1;
            for (const p of obj.price_history[this.fueltype]) {
                final[i].dataPoints.push({
                    x: new Date(p.time_created),
                    y: p.price,
                });
            }
        }
        return final;
    }
}
