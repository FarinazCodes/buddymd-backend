/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("medications").del();

  await knex("medications").insert([
    {
      user_id: "some-firebase-uid",
      name: "Vitamin D",
      dosage: "2000",
      dosage_unit: "mg",
      start_date: "2025-02-11",
      end_date: "2025-03-01",
    },
  ]);
}
