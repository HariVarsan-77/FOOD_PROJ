# Food Delivery Data Analysis

A food-themed data analysis website that turns food delivery order data into
business insights. It presents the same four analyses as the Pandas notebook in
this repository, recalculated live in TypeScript in the browser:

1. **Revenue Analysis** - total revenue, revenue per category, average order value, top category
2. **Popular Food Categories** - orders per category, most ordered category, percentage share
3. **Delivery Efficiency** - average delivery time per category compared with the overall average
4. **Customer Satisfaction** - average rating of "faster than average" orders vs "average or slower" orders

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Recharts** and **Lucide React**.

---

## 1. Installation

Requires **Node.js 20 or newer**.

```bash
npm install
```

## 2. Running the site

```bash
npm run dev      # development server -> http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # run the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no output files
```

Pages:

| Route | What it shows |
| --- | --- |
| `/` | Home: hero, scrollable analysis row, four insight cards, dataset summary |
| `/food-data` | Add-record form and the records table (search, filter, sort, paginate, refresh) |
| `/final-analysis` | Final Analysis: all four results summarised with plots, illustrations and the conclusions |
| `/analyses/revenue` | Revenue Analysis |
| `/analyses/popular-categories` | Popular Food Categories |
| `/analyses/delivery-efficiency` | Delivery Efficiency Analysis |
| `/analyses/customer-satisfaction` | Customer Satisfaction Analysis |

---

## 3. Record schema

Every record in the app - sample, user-added or database - uses one shape,
defined in [`src/types/records.ts`](src/types/records.ts):

```ts
interface FoodRecord {
  id: string;             // "sample-012" | "user-1729099123456"
  foodItem: string;       // "Chicken Biryani"
  category: string;       // one of FOOD_CATEGORIES
  orderValue: number;     // bill amount, > 0
  deliveryTime: number;   // minutes, > 0
  customerRating: number; // 1 - 5
  createdAt: string;      // ISO date string
  source?: "sample" | "user" | "database";
}
```

Valid categories live in [`src/data/categories.ts`](src/data/categories.ts):
_Fast Food, Pizza, Burgers, Indian Food, Chinese Food, Desserts, Beverages, Other_.

The same field names can be used directly as a database table/collection
schema, so no mapping layer is needed.

---

## 4. How the data works (demo mode)

The app runs in **demo mode** by default: the built-in sample dataset plus the
records you add in your own browser.

**Demo mode**
- The built-in sample dataset lives in [`src/data/sampleRecords.ts`](src/data/sampleRecords.ts) and is **read-only**.
- Records you add are stored in `localStorage` under the key
  `food-delivery-analysis:user-records:v1`.
- Saving **only appends**. `appendUserRecord()` reads the existing records and
  writes them back together with the new one, so nothing that was saved earlier
  can be lost. There is no "delete all" action anywhere in the app.
- Your records survive refreshes, navigation and recalculation, and are always
  kept separate from the sample rows (the **Source** column shows which is which).
- A **Demo Data** badge is shown on every page so demo results are never
  mistaken for real ones.

**Demo vs live database**
In demo mode records are stored **in this browser only** - they are not sent to a
server. Clearing your browser storage would remove them. Connect Firebase or
Supabase (section 6) when you need records shared between devices.

---

## 5. Project structure

```
src/
├── app/                    # pages (App Router)
│   ├── layout.tsx          # fonts, navigation, footer
│   ├── page.tsx            # home page
│   ├── food-data/          # add-record form + records table
│   ├── final-analysis/     # closing summary of all four analyses
│   └── analyses/           # one folder per analysis page
├── components/
│   ├── analysis/           # shared analysis page frame
│   ├── charts/             # the one bar chart + mini previews
│   ├── food-data/          # RecordForm, RecordsTable
│   ├── home/               # Hero, category row, insights dashboard
│   ├── illustrations/      # cartoon SVG food illustrations
│   ├── layout/             # NavBar, SiteFooter
│   └── ui/                 # buttons/states/badges/tiles
├── data/                   # categories, sample dataset, analysis metadata
├── hooks/                  # useFoodRecords - the single data hook
├── services/               # data source layer (see below)
├── types/                  # FoodRecord + analysis result types
└── utils/                  # analysis calculations, validation, formatting
```

UI, calculations and data access are kept apart on purpose:
pages and components never read storage or query a database directly; they call
the `useFoodRecords()` hook, which calls the active data source.

### The data source interface

[`src/services/dataSource.types.ts`](src/services/dataSource.types.ts) defines
the only contract the app depends on:

```ts
interface DataSource {
  getDataSourceStatus(): DataSourceStatus;
  getRecords(): Promise<FoodRecord[]>;
  refreshRecords(): Promise<FoodRecord[]>;
  addRecord(record: NewFoodRecord): Promise<FoodRecord>;
}
```

[`src/services/index.ts`](src/services/index.ts) returns the active adapter:
`demoDataSource` or `databaseDataSource`.

### Where the calculations are

All four analyses are plain functions in
[`src/utils/analysis.ts`](src/utils/analysis.ts). They are the JavaScript
equivalent of the Pandas code in `food_delivery_analysis.ipynb`
(`groupby(...).sum()`, `value_counts()`, `groupby(...).mean()`), and each one
returns a typed result object so the charts and tables stay independent of the
maths. They are recalculated with `useMemo` whenever the dataset changes.

---

## 6. Connecting Firebase or Supabase

Everything is already wired up: **only two files need real code and one
constant needs flipping.**

**Step 1 - install the client and add your keys**

```bash
npm install @supabase/supabase-js   # or: npm install firebase
```

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Step 2 - create the table/collection**

Use the schema from section 3. For Supabase:

```sql
create table food_records (
  id uuid primary key default gen_random_uuid(),
  food_item text not null,
  category text not null,
  order_value numeric not null,
  delivery_time numeric not null,
  customer_rating numeric not null,
  created_at timestamptz not null default now()
);
```

**Step 3 - implement the adapter**

[`src/services/databaseDataSource.ts`](src/services/databaseDataSource.ts) - the
three methods marked `TODO` (`getRecords`, `refreshRecords`, `addRecord`).
Worked Supabase examples are in the comment block at the top of that file.
If your column names differ from the `FoodRecord` field names (for example
`food_item` instead of `foodItem`), convert the rows inside those methods so
each one still returns a `FoodRecord`.

**Step 4 - switch the mode**

[`src/services/config.ts`](src/services/config.ts) - the single switch:

```ts
export const DATA_SOURCE_MODE: DataSourceMode = "database";
export const DATABASE_CONFIGURED = true;
```

That is all. The pages, charts and tables follow automatically because they only
use the `DataSource` interface. If the database is selected but not configured,
the app shows an error instead of silently falling back to sample data.

**Sample data and a real database**
The sample dataset is never inserted into your table, and user records are never
mixed into the sample array. If you no longer want the sample rows once the
database is connected, edit [`src/data/sampleRecords.ts`](src/data/sampleRecords.ts);
nothing you or your users saved is affected.

---

## 7. The Python notebook (same project, Pandas version)

This repository also contains the original analysis as a Jupyter notebook:

- [`food_delivery_analysis.ipynb`](food_delivery_analysis.ipynb) - dataset prep, the four analyses, Matplotlib charts and the written conclusion
- [`food_delivery.csv`](food_delivery.csv) - the CSV dataset used by the notebook

To run it:

```bash
python -m pip install pandas matplotlib numpy jupyter
jupyter notebook food_delivery_analysis.ipynb
```
