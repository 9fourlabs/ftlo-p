CREATE TABLE "program_family" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"relationship" varchar(100) NOT NULL,
	"is_deceased" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "program_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"url" text NOT NULL,
	"is_primary" integer DEFAULT 0,
	"caption" varchar(255),
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_timeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"time" varchar(20),
	"title" varchar(255) NOT NULL,
	"description" text,
	"participants" varchar(500),
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"middle_name" varchar(100),
	"nickname" varchar(100),
	"birth_date" varchar(20),
	"death_date" varchar(20),
	"birth_place" varchar(255),
	"death_place" varchar(255),
	"obituary" text,
	"favorite_memories" text,
	"service_name" varchar(255),
	"service_date" varchar(20),
	"service_time" varchar(20),
	"venue" varchar(255),
	"venue_address" text,
	"officiant" varchar(255),
	"additional_info" text,
	"selected_template" varchar(50) DEFAULT 'classic-elegance',
	"accent_color" varchar(7),
	"font" varchar(50),
	"is_draft" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "program_family" ADD CONSTRAINT "program_family_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_photos" ADD CONSTRAINT "program_photos_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_timeline" ADD CONSTRAINT "program_timeline_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;