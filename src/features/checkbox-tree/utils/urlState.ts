export const parseCsvParam = (value: string | null): string[] => {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const stringifyCsvParam = (values: string[]): string => {
  return values.join(',');
};

export const uniqueValues = (values: string[]): string[] => {
  return Array.from(new Set(values));
};