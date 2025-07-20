import { pgTable, serial, varchar, integer, numeric } from "drizzle-orm/pg-core";

// ✅ Budgets table
export const Budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  amount: numeric('amount').notNull(), // changed from varchar to numeric
  icon: varchar('icon', { length: 255 }),
  createdBy: varchar('createdBy', { length: 255 }).notNull()
});

// ✅ Expenses table
export const Expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  amount: numeric('amount').notNull().default('0'), // default expects string
  budgetId: integer('budgetId').references(() => Budgets.id), // ✅ fixed Budgets reference
  createdAt: varchar('createdAt', { length: 255 }).notNull() // optionally use timestamp() if using datetime
});

