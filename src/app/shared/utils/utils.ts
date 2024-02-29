import { Sort } from '@angular/material/sort';

export function sortData<T>(
  sortParameters: Sort,
  entities: T[] = [],
): T[] | any {
  const keyName = sortParameters.active;
  if (sortParameters.direction === 'asc') {
    return (entities = entities.sort((a: T, b: T) =>
      a[keyName].localeCompare(b[keyName]),
    ));
  } else if (sortParameters.direction === 'desc') {
    return (entities = entities.sort((a: T, b: T) =>
      b[keyName].localeCompare(a[keyName]),
    ));
  } else {
    return entities;
  }
}
