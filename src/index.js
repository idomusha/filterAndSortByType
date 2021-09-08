const DEFAULT_TYPES = ["pegasus", "unicorn", "alicorn "];

const ponies = [
  { id: 1, type: "pegasus" },
  { id: 2, type: "unicorn" },
  { id: 3, type: "alicorn " }
];

const getPriorities = (priority) => {
  switch (priority) {
    case "pegasus":
    default:
      return {
        pegasus: 1,
        unicorn: 2,
        alicorn: 3
      };
    case "unicorn":
      return {
        pegasus: 2,
        unicorn: 1,
        alicorn: 3
      };
    case "alicorn ":
      return {
        pegasus: 2,
        unicorn: 3,
        alicorn: 1
      };
  }
};

const compareTypes = (priority, property) => {
  return function innerSort(a, b) {
    if (typeof property === "string") {
      if (
        !Object.prototype.hasOwnProperty.call(a, property) ||
        !Object.prototype.hasOwnProperty.call(b, property)
      ) {
        return 0;
      }
      a = a[property];
      b = b[property];
    }

    let comparison = 0;

    if (getPriorities(priority)[a] > getPriorities(priority)[b]) {
      comparison = 1;
    } else if (getPriorities(priority)[a] < getPriorities(priority)[b]) {
      comparison = -1;
    }

    return comparison;
  };
};

/**
 * gets types from an array or a string
 *
 * @param {(Object[]|string)} types
 */
const getTypes = (types = DEFAULT_TYPES) => {
  return Array.isArray(types) ? types : [types];
};

/**
 * sort types from a type priority
 *
 * @param {(Object[]|string)} types
 * @param {string} priority
 */
const sortTypes = (types = DEFAULT_TYPES, priority = "pegasus") => {
  const displayedTypes = getTypes(types);

  console.log(displayedTypes.sort(compareTypes(priority)));
  return displayedTypes.sort(compareTypes(priority));
};

/**
 * filters ponies by specific type(s) from a list of ponies and types
 *
 * @param {Object[]} ponies
 * @param {(Object[]|string)} types
 */
const filterByType = (ponies = [], types = DEFAULT_TYPES) => {
  const displayedTypes = getTypes(types);
  console.log(ponies);
  console.log(ponies.filter((horse) => displayedTypes.includes(horse.type)));
  return ponies.filter((horse) => displayedTypes.includes(horse.type));
};

/**
 * sorts ponies by specific type(s) from a list of ponies, types and a type priority
 *
 * @param {Object[]} ponies
 * @param {string} priority
 */
const sortByType = (ponies = [], priority = "pegasus", property = "type") => {
  console.log(
    ponies
      .sort(compareTypes(priority, property))
      .map((horse) => `${horse.id}: ${horse.type}`)
  );

  return ponies.sort(compareTypes(priority, property));
};

/**
 * filters and sorts ponies by specific type(s) from a list of ponies, types and a type priority
 *
 * @param {Object[]} ponies
 * @param {(Object[]|string)} types
 * @param {string} priority
 */
const filterAndSortByType = (
  ponies = [],
  types = DEFAULT_TYPES,
  priority = "pegasus"
) => {
  const displayedTypes = getTypes(types);
  const filteredPonies =
    displayedTypes.length < DEFAULT_TYPES.length
      ? filterByType(ponies, displayedTypes)
      : ponies;
  return sortByType(filteredPonies, priority);
};

// If all 3 of the options are checked and Unicorn or Pegasus is selected to show first,
// Alicorn will always be the last one in order.

// If all 3 of the options are checked and Alicorn is selected to show first,
// then show Pegasus in second place.

filterAndSortByType(ponies, ["pegasus", "unicorn", "alicorn "], "alicorn ");
sortTypes(["pegasus", "unicorn", "alicorn "], "alicorn ");

export { sortTypes, filterByType, sortByType, filterAndSortByType };
