import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Country } from '@features/countries/models/countries.types';
import { CountriesService } from '@features/countries/services/countries.service';
import { TableColumn } from '@shared/components/table/table-column.types';
import { TableComponent } from '@shared/components/table/table.component';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmationService } from '@core/services/confirmation';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { Sort } from '@angular/material/sort';
import { sortData } from '@shared/utils/utils';
import { BreadcrumbComponent } from '@features/countries/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    TableComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    BreadcrumbComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CountryListComponent implements OnInit {
  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private snankBarService: SnackBarService,
  ) {}

  private unsubscribeAll: Subject<any> = new Subject<any>();

  countries: Country[];

  ordersTableColumns: TableColumn[] = [];

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'Name',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Population',
        dataKey: 'population',
        position: 'left',
        isSortable: false,
      },
      {
        name: 'Capital',
        dataKey: 'capital',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'Region',
        dataKey: 'region',
        position: 'left',
        isSortable: false,
      },
      {
        name: 'Currencies',
        dataKey: 'currencies',
        position: 'left',
        isSortable: false,
      },
    ];
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getEntities();
  }

  getEntities() {
    this.countriesService.entities$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        this.countries = data;
        console.log(data);
      });
  }

  sortData(sortParameters: Sort) {
    return sortData(sortParameters, this.countries);
  }

  deleteCountry(country: Country): void {
    const countryDeleteData = {
      message: 'Are you sure you want to delete country',
      title: 'Delete Country',
      confirmText: 'Yes',
      cancelText: 'No',
    };

    const dialogRef = this.confirmationService.open(
      countryDeleteData,
      `"${country.name}"?`,
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(country.id);
      }
    });
  }

  onDelete(id: string): void {
    this.countriesService
      .delete(id)
      .pipe(
        takeUntil(this.unsubscribeAll),
        switchMap(() => {
          return this.countriesService.findAll();
        }),
      )
      .subscribe((_countries) => {
        this.snankBarService.openSanckBar('Country deleted successfully');
      });
  }

  editCountry(country: Country) {
    this.router.navigate(['./edit/', country.id], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
