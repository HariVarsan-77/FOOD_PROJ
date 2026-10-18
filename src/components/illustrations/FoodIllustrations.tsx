/**
 * Hand-authored inline SVG food illustrations.
 * Visual identity palette:
 *   #C1440E (deep flame terracotta) #9A3409 (dark rust) #E4762B (warm primary orange)
 *   #E0A458 (golden dough/amber)   #D98324 (deep saffron curry) #F4CDAB (peach cream)
 *   #FBE3CF (soft cream)           #FFF7E8 (warm ivory)         #FDF6EC (pure highlight)
 *   #8C5A3C (brown roast/wood)     #171008 (charcoal stroke)    #4F8A5B (fresh herbs/leaf)
 *   #B23B2E (tomato red/chilli)
 * Proportions: 64x64 viewBox, 1.5–2px outline strokes, rounded joins and caps.
 */

export type IllustrationProps = {
  className?: string;
};

/** Cartoon burger with a sesame bun, lettuce, cheese and a patty. */
export function BurgerIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M12 31C12 17 21 12 32 12C43 12 52 17 52 31Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="24" cy="22" rx="2.4" ry="1.5" fill="#FDF6EC" transform="rotate(-15 24 22)" />
      <ellipse cx="33" cy="18.5" rx="2.4" ry="1.5" fill="#FDF6EC" />
      <ellipse cx="41" cy="24" rx="2.4" ry="1.5" fill="#FDF6EC" transform="rotate(18 41 24)" />
      <ellipse cx="21" cy="28" rx="2.2" ry="1.4" fill="#FDF6EC" transform="rotate(10 21 28)" />
      <ellipse cx="43" cy="29" rx="2.2" ry="1.4" fill="#FDF6EC" transform="rotate(-12 43 29)" />
      <path
        d="M9 32C13 28 19 28 23 32C27 36 33 36 37 32C41 28 47 28 51 32L51 39C47 35 41 35 37 39C33 43 27 43 23 39C19 35 13 35 9 39Z"
        fill="#4F8A5B"
      />
      <rect x="11" y="42" width="42" height="8" rx="4" fill="#8C5A3C" stroke="#171008" strokeWidth="2" />
      <rect x="11" y="37" width="42" height="6" rx="2" fill="#E4762B" />
      <rect x="18" y="41" width="7" height="6" rx="3" fill="#E4762B" />
      <rect x="38" y="41" width="7" height="6" rx="3" fill="#E4762B" />
      <rect x="13" y="49" width="38" height="8" rx="4" fill="#E0A458" stroke="#171008" strokeWidth="2" />
    </svg>
  );
}

/** Pizza slice with a thick crust, melted cheese and pepperoni rounds. */
export function PizzaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M13 26C19 20 26 17 32 17C38 17 45 20 51 26L36 54Q32 58 28 54Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13 26C19 20 26 17 32 17C38 17 45 20 51 26C45 22 38 20 32 20C26 20 19 22 13 26Z"
        fill="#D98324"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="31" r="4.2" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="41" cy="33" r="3.8" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="33" cy="44" r="3.4" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
    </svg>
  );
}

/** Fries carton with a cream band and fries poking out of the top. */
export function FriesIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect
        x="21"
        y="13"
        width="5"
        height="20"
        rx="2.5"
        fill="#D98324"
        transform="rotate(-12 23.5 23)"
      />
      <rect
        x="38"
        y="14"
        width="5"
        height="19"
        rx="2.5"
        fill="#D98324"
        transform="rotate(12 40.5 23.5)"
      />
      <rect
        x="25"
        y="10"
        width="5"
        height="22"
        rx="2.5"
        fill="#E0A458"
        transform="rotate(-5 27.5 21)"
      />
      <rect
        x="32"
        y="8"
        width="5"
        height="24"
        rx="2.5"
        fill="#E0A458"
        transform="rotate(2 34.5 20)"
      />
      <path
        d="M20 28H44C45.1 28 45.9 28.9 45.8 30L42.7 54.2C42.6 55.3 41.7 56 40.7 56H23.3C22.3 56 21.4 55.3 21.3 54.2L18.2 30C18.1 28.9 18.9 28 20 28Z"
        fill="#C1440E"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18.3 29.8H45.7L45 36H19Z" fill="#FDF6EC" />
    </svg>
  );
}

/** Noodle bowl with wavy noodle strands and a pair of chopsticks. */
export function NoodlesIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M17 31C17 23 25 23 25 31"
        stroke="#E0A458"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M28 31C28 21 38 21 38 31"
        stroke="#E0A458"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M41 31C41 24 47 24 47 31"
        stroke="#E0A458"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M10 33H54C54 44 45.3 53 32 53C18.7 53 10 44 10 33Z" fill="#F4CDAB" stroke="#171008" strokeWidth="2" />
      <rect x="8" y="27" width="48" height="7" rx="3.5" fill="#C1440E" stroke="#171008" strokeWidth="2" />
      <path d="M40 10L51 31" stroke="#8C5A3C" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 9L55 27" stroke="#8C5A3C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Takeaway drink cup with a lid, straw and an orange stripe. */
export function DrinkIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect
        x="31"
        y="5"
        width="4.5"
        height="21"
        rx="2.25"
        fill="#B23B2E"
        transform="rotate(14 33.25 15.5)"
      />
      <rect x="20" y="12" width="24" height="6" rx="3" fill="#E4762B" stroke="#171008" strokeWidth="2" />
      <rect x="17" y="18" width="30" height="6.5" rx="3.25" fill="#C1440E" stroke="#171008" strokeWidth="2" />
      <path
        d="M23 24H41L39 54.5C38.9 55.9 37.7 57 36.3 57H27.7C26.3 57 25.1 55.9 25 54.5L23 24Z"
        fill="#FBE3CF"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M23.6 33H40.4L39.8 42H24.2Z" fill="#E4762B" />
    </svg>
  );
}

/** Paper delivery bag with a carry handle, a logo dot and speed marks. */
export function DeliveryBagIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M24 22C24 13 40 13 40 22"
        stroke="#8C5A3C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17 25H47L44.9 53.6C44.8 54.9 43.8 55.8 42.5 55.8H21.5C20.2 55.8 19.2 54.9 19.1 53.6L17 25Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="13.5" y="20" width="37" height="8" rx="3" fill="#D98324" stroke="#171008" strokeWidth="2" />
      <circle cx="32" cy="38" r="4.5" fill="#C1440E" />
      <circle cx="32" cy="38" r="1.6" fill="#FDF6EC" />
      <path d="M5 23H11" stroke="#E4762B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 32H11" stroke="#E4762B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6.5 41H11" stroke="#E4762B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Frosted cupcake with sprinkles and a cherry on top. */
export function DessertIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M32 9C33.5 5.5 36.5 4 39 5.5" stroke="#4F8A5B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="12" r="3.5" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <path
        d="M32 14C38.5 14 42.5 18.5 43 22.5C47 22.5 48.5 27.5 45 29.5C46 33.5 42 36.5 38 35.7L26 35.7C22 36.5 18 33.5 19 29.5C15.5 27.5 17 22.5 21 22.5C21.5 18.5 25.5 14 32 14Z"
        fill="#F4CDAB"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="26" y="20" width="4" height="2" rx="1" fill="#B23B2E" transform="rotate(-20 28 21)" />
      <rect x="34" y="26" width="4" height="2" rx="1" fill="#4F8A5B" transform="rotate(15 36 27)" />
      <rect x="24" y="29" width="4" height="2" rx="1" fill="#E4762B" transform="rotate(30 26 30)" />
      <path
        d="M20 36H44L40.4 54.4C40.2 55.7 39.1 56.6 37.8 56.6H26.2C24.9 56.6 23.8 55.7 23.6 54.4L20 36Z"
        fill="#E4762B"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M27 37.5L25.5 54.5" stroke="#C1440E" strokeWidth="2" strokeLinecap="round" />
      <path d="M37 37.5L38.5 54.5" stroke="#C1440E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Salad bowl filled with leaves and tomato slices. */
export function SaladIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M10 31H54C54 44.5 45.5 53 32 53C18.5 53 10 44.5 10 31Z" fill="#FFF7E8" stroke="#171008" strokeWidth="2" />
      <ellipse cx="21" cy="27" rx="9" ry="8" fill="#4F8A5B" stroke="#171008" strokeWidth="2" />
      <ellipse cx="32" cy="22" rx="10" ry="8.5" fill="#4F8A5B" stroke="#171008" strokeWidth="2" />
      <ellipse cx="43" cy="27" rx="9" ry="8" fill="#4F8A5B" stroke="#171008" strokeWidth="2" />
      <circle cx="24" cy="26" r="4.5" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="1.8" fill="#F4CDAB" />
      <circle cx="40" cy="24" r="4" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="40" cy="24" r="1.6" fill="#F4CDAB" />
      <rect x="9" y="29" width="46" height="6.5" rx="3.25" fill="#C1440E" stroke="#171008" strokeWidth="2" />
    </svg>
  );
}

/** Compact round logo mark: a plate with a fork and a spoon. */
export function FoodLogoMark({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle cx="32" cy="32" r="21" fill="#FDF6EC" stroke="#C1440E" strokeWidth="2.5" />
      <rect x="20" y="17" width="2.5" height="11" rx="1.25" fill="#171008" />
      <rect x="23.75" y="17" width="2.5" height="11" rx="1.25" fill="#171008" />
      <rect x="27.5" y="17" width="2.5" height="11" rx="1.25" fill="#171008" />
      <rect x="23.25" y="25" width="3.5" height="19" rx="1.75" fill="#171008" />
      <ellipse cx="39.5" cy="21" rx="4.5" ry="5.5" fill="#171008" />
      <rect x="37.75" y="25" width="3.5" height="19" rx="1.75" fill="#171008" />
    </svg>
  );
}

/* ==================================================================
 * NEW COMPLETE COLLECTION: AUTHENTIC INDIAN & REGIONAL SPECIALTIES
 * ================================================================== */

/** Authentic Indian Thali with steaming basmati rice, warm roti, katori curries and herbs. */
export function IndianMealIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Outer brass / stainless thali plate */}
      <circle cx="32" cy="34" r="25" fill="#FBE3CF" stroke="#171008" strokeWidth="2" />
      <circle cx="32" cy="34" r="22.5" stroke="#D98324" strokeWidth="1" strokeDasharray="3 2" />

      {/* Folded warm roti / chapati on the left */}
      <path
        d="M13 32C13 22 22 19 26 25C28 29 25 38 18 38C15 38 13 35 13 32Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="1.5"
      />
      <circle cx="19" cy="28" r="1" fill="#8C5A3C" />
      <circle cx="23" cy="26" r="0.8" fill="#8C5A3C" />

      {/* Katori 1: Rich Butter Paneer / Masala Curry (top right) */}
      <circle cx="43" cy="22" r="7.5" fill="#D98324" stroke="#171008" strokeWidth="1.5" />
      <path d="M40 22C42 20 44 24 46 22" stroke="#FFF7E8" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="41" y="20" width="3" height="3" rx="0.5" fill="#FDF6EC" stroke="#171008" strokeWidth="0.8" />

      {/* Katori 2: Dal Tadka / Crimson Curry (bottom right) */}
      <circle cx="43" cy="42" r="7.5" fill="#C1440E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="43" cy="42" r="2" fill="#E4762B" />
      <circle cx="44" cy="41" r="0.8" fill="#4F8A5B" />

      {/* Katori 3: Creamy Raita / Chutney (top left) */}
      <circle cx="24" cy="18" r="6" fill="#FDF6EC" stroke="#171008" strokeWidth="1.5" />
      <circle cx="23" cy="17" r="0.8" fill="#4F8A5B" />
      <circle cx="25" cy="19" r="0.8" fill="#B23B2E" />

      {/* Central fragrant basmati rice mound */}
      <ellipse cx="31" cy="35" rx="9.5" ry="7" fill="#FDF6EC" stroke="#171008" strokeWidth="1.5" />
      <ellipse cx="31" cy="33" rx="6" ry="3.5" fill="#FFF7E8" />
      {/* Coriander leaf garnish */}
      <path d="M30 33C29 30 33 30 32 33" stroke="#4F8A5B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="31" cy="32" r="1.2" fill="#4F8A5B" />

      {/* Aromatic steam curls */}
      <path d="M29 11C28 8 32 7 31 4" stroke="#D98324" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 12C34 9 38 8 37 5" stroke="#D98324" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Steaming royal clay handi biryani with basmati rice, spiced cuts, boiled egg and mint. */
export function BiryaniIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Handi clay pot body */}
      <path
        d="M15 36C15 50 22 57 32 57C42 57 49 50 49 36C49 33 15 33 15 36Z"
        fill="#8C5A3C"
        stroke="#171008"
        strokeWidth="2"
      />
      {/* Handi rim */}
      <ellipse cx="32" cy="33" rx="17.5" ry="5.5" fill="#C1440E" stroke="#171008" strokeWidth="2" />
      {/* Golden earthen neck band */}
      <path d="M17 38C22 41 42 41 47 38" stroke="#E0A458" strokeWidth="2" strokeLinecap="round" />

      {/* Steaming mound of saffron-infused basmati rice */}
      <path
        d="M17 32C18 20 25 15 32 15C39 15 46 20 47 32Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Basmati rice grain highlights */}
      <ellipse cx="27" cy="26" rx="2.5" ry="1.2" fill="#FDF6EC" transform="rotate(-15 27 26)" />
      <ellipse cx="36" cy="22" rx="2.5" ry="1.2" fill="#FDF6EC" transform="rotate(20 36 22)" />
      <ellipse cx="23" cy="30" rx="2.2" ry="1" fill="#D98324" transform="rotate(10 23 30)" />
      <ellipse cx="40" cy="29" rx="2.2" ry="1" fill="#D98324" transform="rotate(-15 40 29)" />

      {/* Tender spiced meat piece */}
      <path
        d="M24 22C24 18 30 18 31 22C31 25 25 26 24 22Z"
        fill="#9A3409"
        stroke="#171008"
        strokeWidth="1.4"
      />

      {/* Boiled egg wedge */}
      <ellipse cx="37" cy="24" rx="4.5" ry="3.5" fill="#FDF6EC" stroke="#171008" strokeWidth="1.4" />
      <ellipse cx="37" cy="24" rx="2.2" ry="1.8" fill="#D98324" />

      {/* Fresh mint and coriander sprigs */}
      <path d="M30 16C29 13 33 13 32 16Z" fill="#4F8A5B" stroke="#171008" strokeWidth="1" />
      <path d="M34 16C35 13 31 13 32 16Z" fill="#4F8A5B" stroke="#171008" strokeWidth="1" />

      {/* Rising spicy aromatic steam */}
      <path d="M26 11C25 8 28 6 27 3" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M37 11C36 8 39 6 38 3" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Crispy South Indian Masala Dosa on banana leaf with sambar and coconut chutney. */
export function DosaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Banana leaf platter */}
      <path
        d="M8 44C10 56 42 58 56 46C58 38 46 34 30 34C16 34 8 38 8 44Z"
        fill="#4F8A5B"
        stroke="#171008"
        strokeWidth="2"
      />
      <path d="M12 45C26 44 42 43 54 45" stroke="#FBE3CF" strokeWidth="1" opacity="0.4" />

      {/* Golden crispy rolled dosa cylinder */}
      <path
        d="M13 36L48 20C52 18 55 22 52 26L17 42C13 44 10 40 13 36Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Crisp golden roast bands */}
      <path d="M22 34L25 39" stroke="#D98324" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 30L34 35" stroke="#D98324" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 26L43 31" stroke="#D98324" strokeWidth="2" strokeLinecap="round" />
      {/* Rolled cylinder end showing potato masala filling */}
      <ellipse cx="15.5" cy="38.5" rx="3.5" ry="2.5" fill="#D98324" stroke="#171008" strokeWidth="1.4" />

      {/* Coconut chutney bowl */}
      <circle cx="21" cy="47" r="5.5" fill="#FDF6EC" stroke="#171008" strokeWidth="1.5" />
      <circle cx="20" cy="46" r="0.8" fill="#171008" />
      <circle cx="22" cy="48" r="0.8" fill="#4F8A5B" />

      {/* Sambar bowl */}
      <circle cx="34" cy="48" r="6" fill="#C1440E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="34" cy="48" r="2.5" fill="#E4762B" />
      <circle cx="34" cy="47" r="0.8" fill="#4F8A5B" />

      {/* Spicy red tomato chutney bowl */}
      <circle cx="47" cy="45" r="5" fill="#B23B2E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="47" cy="45" r="1.5" fill="#C1440E" />
    </svg>
  );
}

/** Soft pillowy steamed white idlis on banana leaf with hot sambar and chutney. */
export function IdliIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Banana leaf */}
      <path
        d="M8 42C12 56 46 56 56 44C58 35 44 32 30 32C16 32 8 35 8 42Z"
        fill="#4F8A5B"
        stroke="#171008"
        strokeWidth="2"
      />

      {/* Idli 1 (back left) */}
      <ellipse cx="23" cy="27" rx="12" ry="8.5" fill="#FDF6EC" stroke="#171008" strokeWidth="2" />
      <circle cx="20" cy="25" r="0.8" fill="#E0A458" />
      <circle cx="25" cy="28" r="0.8" fill="#E0A458" />

      {/* Idli 2 (front right, overlapping) */}
      <ellipse cx="38" cy="29" rx="12.5" ry="9" fill="#FFF7E8" stroke="#171008" strokeWidth="2" />
      <circle cx="35" cy="27" r="0.9" fill="#E0A458" />
      <circle cx="41" cy="31" r="0.9" fill="#E0A458" />

      {/* Sambar bowl */}
      <circle cx="25" cy="44" r="6.5" fill="#C1440E" stroke="#171008" strokeWidth="1.5" />
      <circle cx="25" cy="44" r="2.5" fill="#E4762B" />
      <circle cx="24" cy="43" r="0.9" fill="#4F8A5B" />

      {/* White coconut chutney bowl */}
      <circle cx="41" cy="44" r="6" fill="#FDF6EC" stroke="#171008" strokeWidth="1.5" />
      <circle cx="40" cy="43" r="0.8" fill="#171008" />
      <circle cx="42" cy="45" r="0.8" fill="#4F8A5B" />

      {/* Rising steam */}
      <path d="M28 14C27 10 31 9 30 5" stroke="#E0A458" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M35 15C34 11 38 10 37 6" stroke="#E0A458" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Simmering copper kadai of rich Butter Chicken / Paneer Makhani with cream swirl. */
export function CurryIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Kadai brass handles */}
      <path d="M8 32C8 26 14 26 14 32" stroke="#171008" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M56 32C56 26 50 26 50 32" stroke="#171008" strokeWidth="2.2" strokeLinecap="round" />

      {/* Kadai copper/cast-iron body */}
      <path
        d="M12 32C12 47 21 55 32 55C43 55 52 47 52 32Z"
        fill="#8C5A3C"
        stroke="#171008"
        strokeWidth="2"
      />
      {/* Kadai rim */}
      <ellipse cx="32" cy="32" rx="20" ry="6.5" fill="#C1440E" stroke="#171008" strokeWidth="2" />

      {/* Rich simmering butter masala gravy */}
      <ellipse cx="32" cy="32" rx="18" ry="5.5" fill="#E4762B" />

      {/* Paneer / tender chicken chunks */}
      <rect x="22" y="29" width="6" height="5" rx="1.5" fill="#FDF6EC" stroke="#171008" strokeWidth="1.2" />
      <rect x="36" y="28" width="6" height="5" rx="1.5" fill="#D98324" stroke="#171008" strokeWidth="1.2" />
      <rect x="29" y="32" width="6" height="4.5" rx="1.5" fill="#FDF6EC" stroke="#171008" strokeWidth="1.2" />

      {/* Cream swirl */}
      <path
        d="M26 31C29 27 35 27 37 31C35 34 30 33 28 32"
        stroke="#FFF7E8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Fresh coriander leaf sprig */}
      <circle cx="32" cy="27" r="1.5" fill="#4F8A5B" />
      <path d="M31 29C32 26 34 26 33 29" stroke="#4F8A5B" strokeWidth="1.4" strokeLinecap="round" />

      {/* Steam curls */}
      <path d="M25 18C24 13 28 12 27 8" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M38 18C37 13 41 12 40 8" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Golden crispy triangular Samosas with mint and tamarind chutney. */
export function SamosaIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Samosa 2 (in background) */}
      <path
        d="M36 18L49 44C50 47 46 50 43 49L27 43L36 18Z"
        fill="#D98324"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Samosa 1 (front main) */}
      <path
        d="M24 16L39 45C40 48 37 51 33 50L13 44C9 43 9 39 11 36L24 16Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Crispy crimped pastry base */}
      <path d="M12 42C18 45 28 47 35 48" stroke="#D98324" strokeWidth="2.5" strokeLinecap="round" />
      {/* Crust blister specks */}
      <circle cx="21" cy="30" r="1" fill="#D98324" />
      <circle cx="25" cy="36" r="0.9" fill="#D98324" />
      <circle cx="28" cy="27" r="1" fill="#D98324" />

      {/* Mint green chutney bowl */}
      <circle cx="48" cy="44" r="6.5" fill="#4F8A5B" stroke="#171008" strokeWidth="1.5" />
      <circle cx="48" cy="44" r="2" fill="#D98324" opacity="0.6" />

      {/* Fried green chilli */}
      <path
        d="M38 52C42 54 48 53 52 48"
        stroke="#4F8A5B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M52 48L54 45" stroke="#171008" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Mumbai Vada Pav with spiced batata vada inside a warm pav bun. */
export function VadaPavIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Top golden pav bun */}
      <path
        d="M13 29C13 17 22 13 32 13C42 13 51 17 51 29Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Butter shine on bun */}
      <ellipse cx="25" cy="20" rx="3" ry="1.5" fill="#FDF6EC" transform="rotate(-15 25 20)" />

      {/* Fiery red garlic chutney powder */}
      <rect x="15" y="29" width="34" height="4" rx="1.5" fill="#B23B2E" />

      {/* Golden fried spiced potato batata vada patty */}
      <ellipse cx="32" cy="36" rx="17" ry="9" fill="#D98324" stroke="#171008" strokeWidth="2" />
      <circle cx="26" cy="35" r="1.2" fill="#8C5A3C" />
      <circle cx="36" cy="37" r="1.2" fill="#8C5A3C" />
      <circle cx="31" cy="38" r="1" fill="#4F8A5B" />

      {/* Bottom pav bun */}
      <rect x="14" y="42" width="36" height="9" rx="4.5" fill="#E0A458" stroke="#171008" strokeWidth="2" />

      {/* Fried green chilli tucked on top */}
      <path
        d="M20 22C26 23 38 21 44 18"
        stroke="#4F8A5B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M44 18L47 16" stroke="#171008" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Chinese takeaway box with chopsticks, steaming noodles and fried rice. */
export function ChineseFoodIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Pair of wooden chopsticks sticking up */}
      <path d="M26 7L42 34" stroke="#8C5A3C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 6L46 32" stroke="#8C5A3C" strokeWidth="2.5" strokeLinecap="round" />

      {/* Takeaway box wire handle */}
      <path d="M19 28C19 20 45 20 45 28" stroke="#171008" strokeWidth="1.6" fill="none" />

      {/* Folded paper takeaway box */}
      <path
        d="M17 28L47 28L43 54C42.8 55.2 41.8 56 40.5 56L23.5 56C22.2 56 21.2 55.2 21 54L17 28Z"
        fill="#FDF6EC"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Pagoda red brand stamp */}
      <rect x="25" y="37" width="14" height="10" rx="2" fill="#B23B2E" stroke="#171008" strokeWidth="1.2" />
      <path d="M28 42H36" stroke="#FDF6EC" strokeWidth="1.5" strokeLinecap="round" />

      {/* Open flaps with savory noodles & fried rice */}
      <path d="M15 28L23 23L41 23L49 28Z" fill="#E0A458" stroke="#171008" strokeWidth="1.8" />
      <circle cx="27" cy="25" r="1.2" fill="#4F8A5B" />
      <circle cx="34" cy="25" r="1.2" fill="#B23B2E" />
      <circle cx="38" cy="26" r="1" fill="#D98324" />

      {/* Rising steam */}
      <path d="M22 17C21 13 25 12 24 8" stroke="#E4762B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M38 15C37 11 41 10 40 6" stroke="#E4762B" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Rich bowl of glossy Gulab Jamuns soaked in rose saffron syrup. */
export function SweetIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Decorative dessert glass bowl */}
      <path
        d="M14 36C14 49 22 55 32 55C42 55 50 49 50 36Z"
        fill="#FBE3CF"
        stroke="#171008"
        strokeWidth="2"
      />
      {/* Bowl rim */}
      <ellipse cx="32" cy="36" rx="18.5" ry="5.5" fill="#E0A458" stroke="#171008" strokeWidth="2" />

      {/* Golden saffron sugar syrup */}
      <ellipse cx="32" cy="36" rx="16.5" ry="4.5" fill="#D98324" />

      {/* Gulab Jamun 1 (left) */}
      <circle cx="26" cy="33" r="6" fill="#8C5A3C" stroke="#171008" strokeWidth="1.5" />
      <ellipse cx="24" cy="31" rx="1.5" ry="0.8" fill="#FDF6EC" />

      {/* Gulab Jamun 2 (right) */}
      <circle cx="38" cy="33" r="6" fill="#8C5A3C" stroke="#171008" strokeWidth="1.5" />
      <ellipse cx="36" cy="31" rx="1.5" ry="0.8" fill="#FDF6EC" />

      {/* Gulab Jamun 3 (top center) */}
      <circle cx="32" cy="26" r="5.8" fill="#9A3409" stroke="#171008" strokeWidth="1.5" />
      <ellipse cx="30.5" cy="24" rx="1.5" ry="0.8" fill="#FDF6EC" />

      {/* Saffron threads and slivered pistachios */}
      <path d="M30 25C32 23 34 26 35 24" stroke="#C1440E" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="31" y="27" width="2" height="1.2" rx="0.5" fill="#4F8A5B" />
      <rect x="25" y="34" width="2" height="1.2" rx="0.5" fill="#4F8A5B" />
      <rect x="39" y="34" width="2" height="1.2" rx="0.5" fill="#4F8A5B" />
    </svg>
  );
}

/** Steaming cutting chai glass with spiced caramel milk tea and foam. */
export function ChaiIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Fluted cutting chai glass */}
      <path
        d="M21 21L24 53C24.2 54.7 25.5 56 27.2 56H36.8C38.5 56 39.8 54.7 40 53L43 21Z"
        fill="#FBE3CF"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Glass rim */}
      <ellipse cx="32" cy="21" rx="11" ry="3.5" fill="#FDF6EC" stroke="#171008" strokeWidth="2" />

      {/* Spiced caramel tea liquid */}
      <path
        d="M22 25L24.5 52C24.6 53.2 25.6 54 26.8 54H37.2C38.4 54 39.4 53.2 39.5 52L42 25Z"
        fill="#D98324"
      />
      {/* Glass vertical fluting grooves */}
      <path d="M26 27L28 50" stroke="#FDF6EC" strokeWidth="1.2" opacity="0.7" />
      <path d="M32 27L32 50" stroke="#FDF6EC" strokeWidth="1.2" opacity="0.7" />
      <path d="M38 27L36 50" stroke="#FDF6EC" strokeWidth="1.2" opacity="0.7" />

      {/* Frothy tea layer on top */}
      <ellipse cx="32" cy="25" rx="9.5" ry="2.8" fill="#FFF7E8" stroke="#171008" strokeWidth="1" />
      <circle cx="30" cy="25" r="0.8" fill="#8C5A3C" />
      <circle cx="34" cy="25" r="0.8" fill="#8C5A3C" />

      {/* Aromatic rising steam swirls */}
      <path d="M28 15C27 11 31 10 30 5" stroke="#D98324" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36 14C35 10 39 9 38 4" stroke="#D98324" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Multi-compartment kraft meal box with feast assortment. */
export function MealBoxIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Main kraft container */}
      <rect
        x="12"
        y="18"
        width="40"
        height="36"
        rx="5"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
      />
      {/* Compartment 1: Rice (top left) */}
      <rect x="16" y="22" width="14" height="13" rx="2" fill="#FDF6EC" stroke="#171008" strokeWidth="1.2" />
      <circle cx="23" cy="28.5" r="1.2" fill="#4F8A5B" />

      {/* Compartment 2: Curry / Gravy (top right) */}
      <rect x="34" y="22" width="14" height="13" rx="2" fill="#C1440E" stroke="#171008" strokeWidth="1.2" />
      <circle cx="41" cy="28.5" r="2.5" fill="#E4762B" />

      {/* Compartment 3: Salad / Greens (bottom left) */}
      <rect x="16" y="38" width="14" height="12" rx="2" fill="#4F8A5B" stroke="#171008" strokeWidth="1.2" />
      <circle cx="21" cy="44" r="1.5" fill="#B23B2E" />
      <circle cx="25" cy="44" r="1.5" fill="#FDF6EC" />

      {/* Compartment 4: Sweet / Dessert (bottom right) */}
      <rect x="34" y="38" width="14" height="12" rx="2" fill="#9A3409" stroke="#171008" strokeWidth="1.2" />
      <circle cx="41" cy="44" r="2.2" fill="#D98324" />

      {/* Festive top ribbon */}
      <path d="M12 28H52" stroke="#B23B2E" strokeWidth="2.5" />
    </svg>
  );
}

/** Comforting warm soup bowl with herbs and ceramic spoon. */
export function SoupIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Soup ceramic bowl */}
      <path
        d="M11 31H53C53 45 44 54 32 54C20 54 11 45 11 31Z"
        fill="#FBE3CF"
        stroke="#171008"
        strokeWidth="2"
      />
      {/* Bowl rim */}
      <rect x="9" y="27" width="46" height="7" rx="3.5" fill="#E0A458" stroke="#171008" strokeWidth="2" />

      {/* Golden aromatic broth */}
      <ellipse cx="32" cy="31" rx="19" ry="3" fill="#D98324" />

      {/* Cream swirl */}
      <path d="M24 31C27 28 35 28 38 31" stroke="#FFF7E8" strokeWidth="1.8" strokeLinecap="round" />
      {/* Herb garnish */}
      <circle cx="28" cy="30" r="1.2" fill="#4F8A5B" />
      <circle cx="34" cy="30" r="1.2" fill="#4F8A5B" />

      {/* Soup spoon resting */}
      <path d="M42 16L48 30" stroke="#8C5A3C" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="48" cy="32" rx="3" ry="2" fill="#FDF6EC" stroke="#171008" strokeWidth="1.2" />

      {/* Steam curls */}
      <path d="M26 21C25 16 29 15 28 10" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M35 20C34 15 38 14 37 9" stroke="#E4762B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Universal fallback: Elegant golden cloche (covered dome platter). */
export function DefaultFoodIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Top ring handle */}
      <circle cx="32" cy="15" r="3.5" fill="#D98324" stroke="#171008" strokeWidth="2" />

      {/* Golden domed cloche lid */}
      <path
        d="M16 41C16 24 23 18 32 18C41 18 48 24 48 41Z"
        fill="#E0A458"
        stroke="#171008"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Lid specular shine highlight */}
      <path
        d="M22 38C22 28 26 23 31 22"
        stroke="#FDF6EC"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Platter middle band */}
      <rect x="13" y="41" width="38" height="6" rx="3" fill="#D98324" stroke="#171008" strokeWidth="2" />

      {/* Elegant bottom serving plate */}
      <path
        d="M9 47C9 52 55 52 55 47Z"
        fill="#FDF6EC"
        stroke="#171008"
        strokeWidth="2"
      />

      {/* Decorative star sparkles */}
      <circle cx="48" cy="20" r="1.5" fill="#C1440E" />
      <circle cx="15" cy="25" r="1.2" fill="#4F8A5B" />
    </svg>
  );
}

/**
 * Complete directory mapping of all food illustrations for direct indexing.
 */
export const FOOD_ILLUSTRATION_COMPONENTS = {
  burger: BurgerIllustration,
  pizza: PizzaIllustration,
  fries: FriesIllustration,
  noodles: NoodlesIllustration,
  drink: DrinkIllustration,
  deliveryBag: DeliveryBagIllustration,
  dessert: DessertIllustration,
  salad: SaladIllustration,
  foodLogo: FoodLogoMark,
  indianMeal: IndianMealIllustration,
  biryani: BiryaniIllustration,
  dosa: DosaIllustration,
  idli: IdliIllustration,
  curry: CurryIllustration,
  samosa: SamosaIllustration,
  vadaPav: VadaPavIllustration,
  chineseFood: ChineseFoodIllustration,
  sweet: SweetIllustration,
  chai: ChaiIllustration,
  mealBox: MealBoxIllustration,
  soup: SoupIllustration,
  default: DefaultFoodIllustration,
} as const;
