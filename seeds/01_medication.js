/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("medications").del();

  await knex("medications").insert([
    {
      user_id: 1,
      name: "Vitamin D",
      dosage: "2000",
      frequency: "1",
      start_date: "2025-02-11",
      end_date: "2025-03-01",
    },
  ]);
}
