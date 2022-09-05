import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceCountryService } from '../../service/service-country.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  myForm = this.fb.group({
    region: ['', [Validators.required]],
  });

  regions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceCountry: ServiceCountryService
  ) {}

  ngOnInit(): void {
    this.regions = this.serviceCountry.regions;
  }

  save() {
    console.log(this.myForm.value);
  }
}
