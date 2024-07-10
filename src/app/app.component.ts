import { Component, Signal } from '@angular/core';
import { Router, Routes, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ApiService } from './services/api.service';
import {
    LocalizationService,
    Locale,
    LocaleListItem,
} from './services/localization.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [ApiService, LocalizationService],
})
export class AppComponent {
    public readonly routes: Routes = routes;
    public readonly currentLocale: Signal<Locale> =
        this.localeService.getLocale();
    public readonly localeList: LocaleListItem[] = this.localeService.list;
    public readonly LocaleEnum = Locale;

    constructor(
        private router: Router,
        private localeService: LocalizationService,
    ) {}

    ngOnDestroy(): void {}

    public reroute(route: string) {
        this.router.navigateByUrl(route).then((result) => {
            // TODO: do something
        });
    }

    public setLocale(localeId: Locale) {
        this.localeService.setLocale(localeId);
    }

    public getCurrentLang(): string {
        const i = this.localeList
            .map((l) => l.id === this.currentLocale())
            .indexOf(true);
        return this.localeList[i].label;
    }
}
