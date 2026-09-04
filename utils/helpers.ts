// General helper utilities

/**
 * Format a number as currency (INR)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

/**
 * Truncate a string to a given length
 */
export const truncate = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Convert a string to a URL-friendly slug
 */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "");
