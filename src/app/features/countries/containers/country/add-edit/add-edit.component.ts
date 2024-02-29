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
import { first } from 'rxjs/operators';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { Country } from '@features/countries/models/countries.types';
import { BreadcrumbComponent } from '@features/countries/components/breadcrumb/breadcrumb.component';

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
  countryForm: FormGroup;
  id!: string;
  country: Country;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private route: ActivatedRoute,
    private snankBarService: SnackBarService,
    private router: Router,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

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
          // Get the country
          this.country = country;
          // Clear the languages
          (this.countryForm.get('languages') as FormArray).clear();

          // Patch values to the form
          this.countryForm.patchValue(country);

          // Setup the languages form array
          const languagesFormGroups = [];

          if (country.languages.length > 0) {
            // Iterate through them
            country.languages.forEach((language) => {
              // Create an language form group
              languagesFormGroups.push(
                this.fb.group({
                  name: [language.name],
                  code: [language.code],
                }),
              );
            });
          } else {
            // Create an language form group
            languagesFormGroups.push(
              this.fb.group({
                email: [''],
                label: [''],
              }),
            );
          }

          // Add the language form groups to the languages form array
          languagesFormGroups.forEach((languageFormGroup) => {
            (this.countryForm.get('languages') as FormArray).push(
              languageFormGroup,
            );
          });
        });
    }
  }

  buildForm(): void {
    // Create the form
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

  /**
   * Add the language field
   */
  addEmailField(): void {
    // Create an empty email form group
    const languageFormGroup = this.fb.group({
      name: [''],
      code: [''],
    });

    // Add the language form group to the languages form array
    (this.countryForm.get('languages') as FormArray).push(languageFormGroup);
  }

  /**
   * Remove the email field
   *
   * @param index
   */
  removeEmailField(index: number): void {
    // Get form array for languages
    const languagesFormArray = this.countryForm.get('languages') as FormArray;

    // Remove the language field
    languagesFormArray.removeAt(index);
  }

  save() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.countryForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.countriesService
      .save(this.countryForm.value)
      .pipe(first())
      .subscribe(() => {
        this.snankBarService.openSanckBar('New country created successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  private updateUser() {
    this.countriesService
      .update(this.id, this.countryForm.value)
      .pipe(first())
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
}
