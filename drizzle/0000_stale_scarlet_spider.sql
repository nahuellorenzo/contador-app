CREATE TABLE `contador` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`valor` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contador_id_unique` ON `contador` (`id`);