export function formatDateString(
  dateString: string,
  locale: string = 'en-IN',
): string {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleDateString(locale, {month: 'short'});
  const weekday = dateObject.toLocaleDateString(locale, {weekday: 'short'});

  return `${day} ${month}, ${weekday}`;
}

export function parseDateString(input: string): string {
  // Split the input string (assuming the format is 'DD MMM, DOW')
  const [day, month] = input.split(' ').slice(0, 2);

  // Create a mapping for month abbreviations to their corresponding month numbers (0-based index)
  const monthMap: {[key: string]: number} = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // Ensure day is valid and parsed as an integer
  const dayNumber = parseInt(day, 10);

  // Get the current year
  const year = new Date().getFullYear();

  // Check if month is valid, otherwise return an error or fallback value
  if (!monthMap[month]) {
    throw new Error('Invalid month abbreviation');
  }

  // Create a Date object using the parsed values
  const date = new Date(year, monthMap[month], dayNumber);

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  // Format the date to 'YYYY-MM-DD'
  const formattedDate = date.toISOString().split('T')[0];

  return formattedDate;
}

// Example usage

export function serializeError(error: any) {
  if (error.name === 'AxiosError') {
    return {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return {message: error.message};
}

export function toQueryString(params: any) {
  return Object.keys(params)
    .filter(key => params[key] !== null) // Filter out keys with null values
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}

export enum StatusName {
  upcoming = 'upcoming',
  cancelled = 'cancelled',
  completed = 'completed',
}

export const getCountByStatus = (
  inputArray: Record<string, string>[],
  status: string,
): number => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][status] !== undefined) {
      return parseInt(inputArray[i][status], 10);
    }
  }
  return 0; // Return 0 if the status is not found in the array
};
