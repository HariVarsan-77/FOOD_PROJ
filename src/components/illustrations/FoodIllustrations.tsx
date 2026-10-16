/**
 * Hand-authored inline SVG food illustrations.
 * Palette: #C1440E #9A3409 #E4762B #E0A458 #D98324 #F4CDAB #FBE3CF #FFF7E8
 *          #8C5A3C #171008 #4F8A5B #B23B2E #FDF6EC
 */

type IllustrationProps = {
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
