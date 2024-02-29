import { CountriesService } from '@features/countries/services/countries.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { Country } from '@features/countries/models/countries.types';
import { BreadcrumbComponent } from '@features/countries/components/breadcrumb/breadcrumb.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-country-add-edit',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    BreadcrumbComponent,
  ],
  templateUrl: './add-edit.component.html',
})
export class CountryAddEditComponent {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  countryForm: FormGroup;
  id!: string;
  country: Country;
  isAddMode!: boolean;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private snankBarService: SnackBarService,
    private router: Router,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.buildForm();
    if (!this.isAddMode) {
      this.countriesService
        .findOne(this.id)
        .pipe(first())
        .subscribe((country: Country) => {
          this.country = country;
          (this.countryForm.get('languages') as FormArray).clear();
          this.countryForm.patchValue(country);
          const languagesFormGroups = [];
          if (country.languages.length > 0) {
            country.languages.forEach((language) => {
              languagesFormGroups.push(
                this.fb.group({
                  name: [language.name],
                  code: [language.code],
                }),
              );
            });
          } else {
            languagesFormGroups.push(
              this.fb.group({
                email: [''],
                label: [''],
              }),
            );
          }
          languagesFormGroups.forEach((languageFormGroup) => {
            (this.countryForm.get('languages') as FormArray).push(
              languageFormGroup,
            );
          });
        });
    }
  }

  buildForm(): void {
    this.countryForm = this.fb.group({
      name: ['', [Validators.required]],
      population: ['', Validators.required],
      capital: ['', Validators.required],
      flag: ['', Validators.required],
      currencies: ['', Validators.required],
      languages: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          code: ['', Validators.required],
        }),
      ]),
      region: ['', Validators.required],
    });
  }

  
  addEmailField(): void {
    const languageFormGroup = this.fb.group({
      name: [''],
      code: [''],
    });
    (this.countryForm.get('languages') as FormArray).push(languageFormGroup);
  }

  removeEmailField(index: number): void {
    const languagesFormArray = this.countryForm.get('languages') as FormArray;
    languagesFormArray.removeAt(index);
  }

  save(): void {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createCountry();
    } else {
      this.updateCountry();
    }
  }

  private createCountry(): void{
    this.countriesService
      .save(this.countryForm.value)
      .pipe(takeUntil(this.unsubscribeAll), first())
      .subscribe(() => {
        this.snankBarService.openSanckBar('New country created successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  private updateCountry(): void {
    this.countriesService
      .update(this.id, this.countryForm.value)
      .pipe(takeUntil(this.unsubscribeAll), first())
      .subscribe(() => {
        this.snankBarService.openSanckBar('Country updated successfully');
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
