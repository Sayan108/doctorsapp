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

export function serializeError(error: any) {
  if (error.name ==="AxiosError") {
    return {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return {message: error.message};
}
