"use client";

import { useState } from "react";
import { CheckCircle2, Plus, RotateCcw, Save } from "lucide-react";
import { FOOD_CATEGORIES } from "@/data/categories";
import type { NewFoodRecord } from "@/types/records";
import {
  DELIVERY_TIME_MAX,
  EMPTY_FORM_VALUES,
  ORDER_VALUE_MAX,
  RATING_MAX,
  RATING_MIN,
  isFormValid,
  toNewFoodRecord,
  validateRecordForm,
  type RecordFormErrors,
  type RecordFormValues,
} from "@/utils/validation";

/**
 * The form used to add one food record.
 *
 * It validates every field before saving, shows a helpful message under each
 * problem field, and never clears or replaces the records that are already
 * stored — saving only ever adds one row.
 */
export function RecordForm({ onAdd }: { onAdd: (record: NewFoodRecord) => Promise<unknown> }) {
  const [values, setValues] = useState<RecordFormValues>(EMPTY_FORM_VALUES);
  const [errors, setErrors] = useState<RecordFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateField = (field: keyof RecordFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Remove the message for this field as soon as the user starts fixing it.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSavedMessage(null);
    setSaveError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedMessage(null);
    setSaveError(null);

    const nextErrors = validateRecordForm(values);
    setErrors(nextErrors);
    if (!isFormValid(nextErrors)) {
      setSaveError("Please fix the highlighted fields and try saving again.");
      return;
    }

    setIsSaving(true);
    try {
      const record = toNewFoodRecord(values);
      await onAdd(record);
      // The saved record stays in storage; only the form itself is reset.
      setValues(EMPTY_FORM_VALUES);
      setErrors({});
      setSavedMessage(`"${record.foodItem}" was saved. Your other records are unchanged.`);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "The record could not be saved. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setValues(EMPTY_FORM_VALUES);
    setErrors({});
    setSavedMessage(null);
    setSaveError(null);
  };

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h2 className="font-display text-xl font-extrabold text-brown">Add a food record</h2>
      <p className="mt-1 text-sm text-brown-soft">
        Every field is required. The new record is added to the dataset and used by all four
        analyses straight away.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Food item name */}
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="foodItem">
            Food item name
          </label>
          <input
            id="foodItem"
            name="foodItem"
            type="text"
            className={`input ${errors.foodItem ? "input-error" : ""}`}
            placeholder="e.g. Chicken Biryani"
            value={values.foodItem}
            onChange={(event) => updateField("foodItem", event.target.value)}
            aria-invalid={Boolean(errors.foodItem)}
            aria-describedby={errors.foodItem ? "foodItem-error" : undefined}
            maxLength={60}
          />
          {errors.foodItem ? (
            <p id="foodItem-error" className="mt-1.5 text-xs font-bold text-danger">
              {errors.foodItem}
            </p>
          ) : null}
        </div>

        {/* Category */}
        <div>
          <label className="field-label" htmlFor="category">
            Food category
          </label>
          <select
            id="category"
            name="category"
            className={`input ${errors.category ? "input-error" : ""}`}
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">Select a category</option>
            {FOOD_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p id="category-error" className="mt-1.5 text-xs font-bold text-danger">
              {errors.category}
            </p>
          ) : null}
        </div>

        {/* Order value */}
        <div>
          <label className="field-label" htmlFor="orderValue">
            Order value (₹)
          </label>
          <input
            id="orderValue"
            name="orderValue"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max={ORDER_VALUE_MAX}
            className={`input ${errors.orderValue ? "input-error" : ""}`}
            placeholder="e.g. 349.50"
            value={values.orderValue}
            onChange={(event) => updateField("orderValue", event.target.value)}
            aria-invalid={Boolean(errors.orderValue)}
            aria-describedby={errors.orderValue ? "orderValue-error" : undefined}
          />
          {errors.orderValue ? (
            <p id="orderValue-error" className="mt-1.5 text-xs font-bold text-danger">
              {errors.orderValue}
            </p>
          ) : null}
        </div>

        {/* Delivery time */}
        <div>
          <label className="field-label" htmlFor="deliveryTime">
            Delivery time (minutes)
          </label>
          <input
            id="deliveryTime"
            name="deliveryTime"
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            max={DELIVERY_TIME_MAX}
            className={`input ${errors.deliveryTime ? "input-error" : ""}`}
            placeholder="e.g. 32"
            value={values.deliveryTime}
            onChange={(event) => updateField("deliveryTime", event.target.value)}
            aria-invalid={Boolean(errors.deliveryTime)}
            aria-describedby={errors.deliveryTime ? "deliveryTime-error" : undefined}
          />
          {errors.deliveryTime ? (
            <p id="deliveryTime-error" className="mt-1.5 text-xs font-bold text-danger">
              {errors.deliveryTime}
            </p>
          ) : null}
        </div>

        {/* Customer rating */}
        <div>
          <label className="field-label" htmlFor="customerRating">
            Customer rating ({RATING_MIN}–{RATING_MAX})
          </label>
          <input
            id="customerRating"
            name="customerRating"
            type="number"
            inputMode="decimal"
            step="0.1"
            min={RATING_MIN}
            max={RATING_MAX}
            className={`input ${errors.customerRating ? "input-error" : ""}`}
            placeholder="e.g. 4.5"
            value={values.customerRating}
            onChange={(event) => updateField("customerRating", event.target.value)}
            aria-invalid={Boolean(errors.customerRating)}
            aria-describedby={errors.customerRating ? "customerRating-error" : undefined}
          />
          {errors.customerRating ? (
            <p id="customerRating-error" className="mt-1.5 text-xs font-bold text-danger">
              {errors.customerRating}
            </p>
          ) : null}
        </div>
      </div>

      {saveError ? (
        <p role="alert" className="mt-4 rounded-2xl border border-danger/40 bg-danger-soft px-4 py-3 text-sm font-bold text-danger">
          {saveError}
        </p>
      ) : null}

      {savedMessage ? (
        <p
          role="status"
          className="mt-4 flex items-center gap-2 rounded-2xl border border-success/40 bg-success-soft px-4 py-3 text-sm font-bold text-success"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          {savedMessage}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isSaving ? (
            <>
              <Save className="h-4 w-4" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Save record
            </>
          )}
        </button>
        <button type="button" className="btn-secondary" onClick={handleClear} disabled={isSaving}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Clear form
        </button>
      </div>

      <p className="mt-3 text-xs text-brown-soft">
        &quot;Clear form&quot; only empties the fields above. It never deletes saved records.
      </p>
    </form>
  );
}
