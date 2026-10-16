import { FOOD_CATEGORIES } from "@/data/categories";
import type { NewFoodRecord } from "@/types/records";

/**
 * Form validation for the "Food Data" page.
 * Invalid records are never accepted silently: every problem gets a short,
 * helpful message that the form can show next to the field.
 */

export type RecordFormValues = {
  foodItem: string;
  category: string;
  orderValue: string;
  deliveryTime: string;
  customerRating: string;
};

/** Errors keyed by form field name. */
export type RecordFormErrors = Partial<Record<keyof RecordFormValues, string>>;

export const EMPTY_FORM_VALUES: RecordFormValues = {
  foodItem: "",
  category: "",
  orderValue: "",
  deliveryTime: "",
  customerRating: "",
};

/** Limits used by both the validation and the HTML inputs. */
export const ORDER_VALUE_MAX = 100000;
export const DELIVERY_TIME_MAX = 300;
export const RATING_MIN = 1;
export const RATING_MAX = 5;

/** Turns "  12.5 " into 12.5 and returns null when the text is not a number. */
function parseNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Validates the whole form and returns an object with one message per problem. */
export function validateRecordForm(values: RecordFormValues): RecordFormErrors {
  const errors: RecordFormErrors = {};

  // Food item
  const foodItem = values.foodItem.trim();
  if (foodItem === "") {
    errors.foodItem = "Please enter the food item name.";
  } else if (foodItem.length < 2) {
    errors.foodItem = "The food item name needs at least 2 characters.";
  } else if (foodItem.length > 60) {
    errors.foodItem = "Please keep the food item name under 60 characters.";
  }

  // Category
  if (values.category.trim() === "") {
    errors.category = "Please choose a food category.";
  } else if (!FOOD_CATEGORIES.includes(values.category as (typeof FOOD_CATEGORIES)[number])) {
    errors.category = "Please choose one of the listed categories.";
  }

  // Order value
  const orderValue = parseNumber(values.orderValue);
  if (orderValue === null) {
    errors.orderValue = "Please enter the order value as a number.";
  } else if (orderValue <= 0) {
    errors.orderValue = "The order value must be greater than 0.";
  } else if (orderValue > ORDER_VALUE_MAX) {
    errors.orderValue = `The order value must be ${ORDER_VALUE_MAX} or less.`;
  }

  // Delivery time
  const deliveryTime = parseNumber(values.deliveryTime);
  if (deliveryTime === null) {
    errors.deliveryTime = "Please enter the delivery time in minutes.";
  } else if (deliveryTime <= 0) {
    errors.deliveryTime = "The delivery time must be greater than 0 minutes.";
  } else if (deliveryTime > DELIVERY_TIME_MAX) {
    errors.deliveryTime = `The delivery time must be ${DELIVERY_TIME_MAX} minutes or less.`;
  }

  // Customer rating
  const rating = parseNumber(values.customerRating);
  if (rating === null) {
    errors.customerRating = `Please enter a rating between ${RATING_MIN} and ${RATING_MAX}.`;
  } else if (rating < RATING_MIN || rating > RATING_MAX) {
    errors.customerRating = `The rating must be between ${RATING_MIN} and ${RATING_MAX}.`;
  }

  return errors;
}

/** true when the form has no validation errors. */
export function isFormValid(errors: RecordFormErrors): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Converts valid form text into a record object.
 * Call this only after `validateRecordForm` returned no errors.
 */
export function toNewFoodRecord(values: RecordFormValues): NewFoodRecord {
  return {
    foodItem: values.foodItem.trim(),
    category: values.category,
    orderValue: Number(values.orderValue.trim()),
    deliveryTime: Number(values.deliveryTime.trim()),
    customerRating: Number(values.customerRating.trim()),
  };
}
