import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceCountryService } from '../../service/service-country.service';
import { SmallCountry } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  regions: string[] = [];
  countries: SmallCountry[] = [];
  borders: string[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceCountry: ServiceCountryService
  ) {}

  ngOnInit(): void {
    this.regions = this.serviceCountry.regions;

    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('country')?.reset('');
        }),
        switchMap((region) => {
          return this.serviceCountry.getCountriesByRegion(region!);
        })
      )
      .subscribe((countries) => {
        this.countries = countries;
        //console.log(countries);
      });

    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.borders = [];
          this.myForm.get('border')?.reset('');
        }),
        switchMap((code) => {
          return this.serviceCountry.getCountriesByCode(code as string);
        })
      )
      .subscribe((country) => {
        this.borders = country?.borders || [];
        console.log(country);
      });

    // this.myForm.get('region')?.valueChanges.subscribe((region) => {
    //   this.serviceCountry
    //     .getCountriesByRegion(region!)
    //     .subscribe((countries) => {
    //       this.countries = countries;
    //       console.log(countries);
    //     });
    // });
  }

  save() {
    console.log(this.myForm.value);
  }
}
