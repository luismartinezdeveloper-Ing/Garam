import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  referenceId: text('reference_id').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  clientIp: text('client_ip'),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  service: text('service').notNull(),
  area: text('area').notNull(),
  location: text('location').notNull(),
  timeline: text('timeline').notNull(),
  comments: text('comments'),
  status: text('status').notNull().default('new'),
  consentAt: timestamp('consent_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;

export const leadExportColumns = [
  'referenceId',
  'createdAt',
  'name',
  'email',
  'phone',
  'service',
  'area',
  'location',
  'timeline',
  'comments',
] as const;

export type LeadExportColumn = (typeof leadExportColumns)[number];
