import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, from, map, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationGetterService {
    private http = inject(HttpClient);

    getLocale(lng: number, lat: number) {
        const regex = /\bpremise\b/gi;
        return from(fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.MapKey}`))
            .pipe(
                filter(x => x.status === 200),
                switchMap(x => from(x.json())),
                map(x => x as unknown as GeoReverseResponse),
                map(x => x.results[0].formatted_address),
            )
    }
}

export interface GeoReverseResponse {
    plus_code: {
        compound_code: string;
        global_code: string;
    },
    results: Results[],
    status: 'OK' | 'Empty'
}

export interface Results {
    address_components: Results[];
    formatted_address: string;
    geometry: {
        bounds: {}
        location: {},
        location_type: string;
        viewport: {}
    };
    place_id: string;
    types: string[];
}

// export interface AddressComponent {
//     long_name: string;
//     short_name: string;
//     types: string[];
// }