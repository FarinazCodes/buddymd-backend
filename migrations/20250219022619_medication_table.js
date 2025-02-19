/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ export function up(knex) {
  return knex.schema.createTable("medications", (table) => {
    table.increments("id").primary();
    table
      .string("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("dosage").notNullable();
    table.string("frequency").notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("medications");
}
