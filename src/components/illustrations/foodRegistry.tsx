import type { ComponentType } from "react";
import {
  BiryaniIllustration,
  BurgerIllustration,
  ChaiIllustration,
  ChineseFoodIllustration,
  CurryIllustration,
  DefaultFoodIllustration,
  DeliveryBagIllustration,
  DessertIllustration,
  DosaIllustration,
  DrinkIllustration,
  FoodLogoMark,
  FriesIllustration,
  IdliIllustration,
  IndianMealIllustration,
  MealBoxIllustration,
  NoodlesIllustration,
  PizzaIllustration,
  SaladIllustration,
  SamosaIllustration,
  SoupIllustration,
  SweetIllustration,
  VadaPavIllustration,
  type IllustrationProps,
} from "./FoodIllustrations";

/**
 * Normalizes an arbitrary food item or category string:
 * - Trims whitespace
 * - Converts to lower case
 * - Strips extra punctuation and parentheses (e.g., "Samosa (2 pcs)" -> "samosa")
 */
export function normalizeFoodIdentifier(input?: string | null): string {
  if (!input) return "";
  return input
    .toLowerCase()
    .replace(/\([^)]*\)/g, "") // remove parenthesized info
    .replace(/[^a-z0-9\s]/g, " ") // replace punctuation with space
    .replace(/\s+/g, " ")
    .trim();
}

export type FoodIllustrationKey =
  | "biryani"
  | "dosa"
  | "idli"
  | "indianMeal"
  | "curry"
  | "pizza"
  | "burger"
  | "fries"
  | "noodles"
  | "chineseFood"
  | "samosa"
  | "vadaPav"
  | "dessert"
  | "sweet"
  | "drink"
  | "chai"
  | "mealBox"
  | "salad"
  | "soup"
  | "deliveryBag"
  | "foodLogo"
  | "default";

/**
 * Registry of canonical illustration components.
 */
export const ILLUSTRATION_REGISTRY: Record<FoodIllustrationKey, ComponentType<IllustrationProps>> = {
  biryani: BiryaniIllustration,
  dosa: DosaIllustration,
  idli: IdliIllustration,
  indianMeal: IndianMealIllustration,
  curry: CurryIllustration,
  pizza: PizzaIllustration,
  burger: BurgerIllustration,
  fries: FriesIllustration,
  noodles: NoodlesIllustration,
  chineseFood: ChineseFoodIllustration,
  samosa: SamosaIllustration,
  vadaPav: VadaPavIllustration,
  dessert: DessertIllustration,
  sweet: SweetIllustration,
  drink: DrinkIllustration,
  chai: ChaiIllustration,
  mealBox: MealBoxIllustration,
  salad: SaladIllustration,
  soup: SoupIllustration,
  deliveryBag: DeliveryBagIllustration,
  foodLogo: FoodLogoMark,
  default: DefaultFoodIllustration,
};

/**
 * Resolves a food item or category name to its canonical illustration key.
 * Evaluates specific food-item keywords first, then category-level terms.
 */
export function resolveFoodIllustrationKey(
  nameOrCategory?: string | null,
  secondaryCategory?: string | null,
): FoodIllustrationKey {
  const primary = normalizeFoodIdentifier(nameOrCategory);
  const secondary = normalizeFoodIdentifier(secondaryCategory);
  const combined = `${primary} ${secondary}`.trim();

  if (!combined) return "default";

  // Specific beverage keywords
  if (
    combined.includes("chai") ||
    combined.includes("tea") ||
    combined.includes("cutting chai")
  ) {
    return "chai";
  }
  if (
    combined.includes("coffee") ||
    combined.includes("shake") ||
    combined.includes("soda") ||
    combined.includes("lime") ||
    combined.includes("buttermilk") ||
    combined.includes("lassi") ||
    combined.includes("juice")
  ) {
    return "drink";
  }

  // Specific side & finger food keywords
  if (
    combined.includes("fries") ||
    combined.includes("french fries")
  ) {
    return "fries";
  }

  // Specific regional dish keywords
  if (combined.includes("biryani") || combined.includes("briyani") || combined.includes("biriyani")) {
    return "biryani";
  }
  if (combined.includes("dosa") || combined.includes("dosai") || combined.includes("dhosa")) {
    return "dosa";
  }
  if (combined.includes("idli") || combined.includes("idly") || combined.includes("vada sambar")) {
    return "idli";
  }
  if (
    combined.includes("vada pav") ||
    combined.includes("vadapav") ||
    combined.includes("batata vada")
  ) {
    return "vadaPav";
  }
  if (
    combined.includes("samosa") ||
    combined.includes("kachori") ||
    combined.includes("wrap") ||
    combined.includes("roll") ||
    combined.includes("sandwich")
  ) {
    return "samosa";
  }
  if (
    combined.includes("paneer butter") ||
    combined.includes("butter chicken") ||
    combined.includes("curry") ||
    combined.includes("kadai") ||
    combined.includes("makhani") ||
    combined.includes("korma")
  ) {
    return "curry";
  }
  if (
    combined.includes("thali") ||
    combined.includes("meals") ||
    combined.includes("pongal") ||
    combined.includes("roti") ||
    combined.includes("chappathi") ||
    combined.includes("chapati") ||
    combined.includes("naan") ||
    combined.includes("paratha")
  ) {
    return "indianMeal";
  }
  if (
    combined.includes("gulab jamun") ||
    combined.includes("rasmalai") ||
    combined.includes("mysore pak") ||
    combined.includes("payasam") ||
    combined.includes("halwa") ||
    combined.includes("kheer") ||
    combined.includes("sweet") ||
    combined.includes("milky bar")
  ) {
    return "sweet";
  }
  if (
    combined.includes("pizza") ||
    combined.includes("garlic bread") ||
    combined.includes("calzone") ||
    combined.includes("pasta")
  ) {
    return "pizza";
  }
  if (
    combined.includes("burger") ||
    combined.includes("wings") ||
    combined.includes("patty") ||
    combined.includes("crispy chicken")
  ) {
    return "burger";
  }
  if (combined.includes("masala")) {
    return "curry";
  }
  if (
    combined.includes("fries") ||
    combined.includes("french fries") ||
    combined.includes("masala fries")
  ) {
    return "fries";
  }
  if (
    combined.includes("noodles") ||
    combined.includes("hakka") ||
    combined.includes("schezwan") ||
    combined.includes("chowmein") ||
    combined.includes("ramen") ||
    combined.includes("wai wai")
  ) {
    return "noodles";
  }
  if (
    combined.includes("fried rice") ||
    combined.includes("manchurian") ||
    combined.includes("spring roll") ||
    combined.includes("chilli paneer")
  ) {
    return "chineseFood";
  }
  if (
    combined.includes("brownie") ||
    combined.includes("cake") ||
    combined.includes("sundae") ||
    combined.includes("pastry") ||
    combined.includes("ice cream") ||
    combined.includes("choco") ||
    combined.includes("lava")
  ) {
    return "dessert";
  }
  if (combined.includes("soup")) {
    return "soup";
  }
  if (combined.includes("salad")) {
    return "salad";
  }
  if (
    combined.includes("combo") ||
    combined.includes("feast") ||
    combined.includes("platter") ||
    combined.includes("snack box")
  ) {
    return "mealBox";
  }

  // Category level fallbacks
  if (combined.includes("indian")) {
    // "South Indian" leans toward dosa, general "Indian Food" leans toward Indian Meal/Thali
    if (combined.includes("south")) return "dosa";
    return "indianMeal";
  }
  if (combined.includes("chinese")) {
    return "chineseFood";
  }
  if (combined.includes("fast food") || combined.includes("snack")) {
    return "samosa";
  }
  if (combined.includes("dessert")) {
    return "dessert";
  }
  if (combined.includes("beverage") || combined.includes("drink")) {
    return "drink";
  }
  if (combined.includes("other")) {
    return "mealBox";
  }

  return "default";
}

/**
 * Returns the matching React illustration component for any given category or food item name.
 */
export function getFoodIllustration(
  nameOrCategory?: string | null,
  secondaryCategory?: string | null,
): ComponentType<IllustrationProps> {
  const key = resolveFoodIllustrationKey(nameOrCategory, secondaryCategory);
  return ILLUSTRATION_REGISTRY[key] ?? DefaultFoodIllustration;
}

/**
 * Dynamic Food Illustration Component.
 * Automatically resolves and renders the correct illustration based on category or item name.
 */
export function FoodIllustration({
  name,
  category,
  className,
  fallback,
}: {
  name?: string | null;
  category?: string | null;
  className?: string;
  fallback?: ComponentType<IllustrationProps>;
}) {
  const key = resolveFoodIllustrationKey(name, category);
  const Component = ILLUSTRATION_REGISTRY[key] ?? fallback ?? DefaultFoodIllustration;
  return <Component className={className} />;
}
