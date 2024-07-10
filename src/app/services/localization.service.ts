import { Injectable, WritableSignal, Signal, signal } from '@angular/core';

export enum Locale {
    en = 'en-EN',
    de = 'de-DE',
}

export interface LocaleListItem {
    label: string;
    id: Locale;
}

@Injectable({
    providedIn: 'root',
})
export class LocalizationService {
    constructor() {}

    public readonly list = [
        { id: Locale.en, label: 'English' },
        { id: Locale.de, label: 'Deutsch' },
    ];

    private currentLocale: WritableSignal<Locale> = signal(Locale.en);

    setLocale(newLocale: Locale): void {
        this.currentLocale.set(newLocale);
    }

    getLocale(): Signal<Locale> {
        return this.currentLocale.asReadonly();
    }
}
