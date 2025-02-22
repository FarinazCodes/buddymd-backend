/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("adherence_logs", (table) => {
    table.increments("id").primary();
    table
      .integer("medication_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("medications")
      .onDelete("CASCADE");
    table.date("date").notNullable();
    table
      .enum("status", ["Taken", "Missed", "Skipped"])
      .notNullable()
      .defaultTo("Missed");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("adherence_logs");
}
