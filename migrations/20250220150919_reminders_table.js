/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("reminders", (table) => {
    table.increments("id").primary();
    table
      .integer("medication_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("medications")
      .onDelete("CASCADE");
    table.time("time").notNullable();
    table.string("delivery_method").notNullable();
    table.string("phone_number").notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("reminders");
}
