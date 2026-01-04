import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

// Memorial Program tables
export const programs = pgTable('programs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  middleName: varchar('middle_name', { length: 100 }),
  nickname: varchar('nickname', { length: 100 }),
  birthDate: varchar('birth_date', { length: 20 }),
  deathDate: varchar('death_date', { length: 20 }),
  birthPlace: varchar('birth_place', { length: 255 }),
  deathPlace: varchar('death_place', { length: 255 }),
  obituary: text('obituary'),
  favoriteMemories: text('favorite_memories'),
  serviceName: varchar('service_name', { length: 255 }),
  serviceDate: varchar('service_date', { length: 20 }),
  serviceTime: varchar('service_time', { length: 20 }),
  venue: varchar('venue', { length: 255 }),
  venueAddress: text('venue_address'),
  officiant: varchar('officiant', { length: 255 }),
  additionalInfo: text('additional_info'),
  selectedTemplate: varchar('selected_template', { length: 50 }).default('classic-elegance'),
  accentColor: varchar('accent_color', { length: 7 }),
  font: varchar('font', { length: 50 }),
  isDraft: integer('is_draft').default(1), // 0 = false, 1 = true
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const programPhotos = pgTable('program_photos', {
  id: serial('id').primaryKey(),
  programId: integer('program_id')
    .notNull()
    .references(() => programs.id),
  url: text('url').notNull(),
  isPrimary: integer('is_primary').default(0), // 0 = false, 1 = true
  caption: varchar('caption', { length: 255 }),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
});

export const programTimeline = pgTable('program_timeline', {
  id: serial('id').primaryKey(),
  programId: integer('program_id')
    .notNull()
    .references(() => programs.id),
  time: varchar('time', { length: 20 }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  participants: varchar('participants', { length: 500 }),
  sortOrder: integer('sort_order').default(0),
});

export const programFamily = pgTable('program_family', {
  id: serial('id').primaryKey(),
  programId: integer('program_id')
    .notNull()
    .references(() => programs.id),
  name: varchar('name', { length: 255 }).notNull(),
  relationship: varchar('relationship', { length: 100 }).notNull(),
  isDeceased: integer('is_deceased').default(0), // 0 = false, 1 = true
});

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
  programs: many(programs),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

// Relations for memorial program tables
export const programsRelations = relations(programs, ({ one, many }) => ({
  user: one(users, {
    fields: [programs.userId],
    references: [users.id],
  }),
  photos: many(programPhotos),
  timeline: many(programTimeline),
  family: many(programFamily),
}));

export const programPhotosRelations = relations(programPhotos, ({ one }) => ({
  program: one(programs, {
    fields: [programPhotos.programId],
    references: [programs.id],
  }),
}));

export const programTimelineRelations = relations(programTimeline, ({ one }) => ({
  program: one(programs, {
    fields: [programTimeline.programId],
    references: [programs.id],
  }),
}));

export const programFamilyRelations = relations(programFamily, ({ one }) => ({
  program: one(programs, {
    fields: [programFamily.programId],
    references: [programs.id],
  }),
}));

// Type definitions for memorial programs
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type ProgramPhoto = typeof programPhotos.$inferSelect;
export type NewProgramPhoto = typeof programPhotos.$inferInsert;
export type ProgramTimeline = typeof programTimeline.$inferSelect;
export type NewProgramTimeline = typeof programTimeline.$inferInsert;
export type ProgramFamily = typeof programFamily.$inferSelect;
export type NewProgramFamily = typeof programFamily.$inferInsert;

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  CREATE_PROGRAM = 'CREATE_PROGRAM',
  UPDATE_PROGRAM = 'UPDATE_PROGRAM',
  DELETE_PROGRAM = 'DELETE_PROGRAM',
}
