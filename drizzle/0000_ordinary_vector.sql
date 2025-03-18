CREATE TABLE `contador` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`valor` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contador_id_unique` ON `contador` (`id`);--> statement-breakpoint
CREATE TABLE `contador_historial` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`accion` text NOT NULL,
	`timestamp` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contador_historial_id_unique` ON `contador_historial` (`id`);