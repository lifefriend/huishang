CREATE TABLE "public"."animal" (
"id" SERIAL primary key,
"name" varchar(50) COLLATE "default" NOT NULL,
"weight" numeric NOT NULL
)