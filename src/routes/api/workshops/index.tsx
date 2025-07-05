import { type RequestHandler } from '@builder.io/qwik-city';
import { createClient } from '@libsql/client';

console.log('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL);
console.log('TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN);

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error('TURSO_DATABASE_URL is not set. Please check your environment variables.');
}

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

///

export const onGet: RequestHandler = async ({ json, headers }) => {
  headers.set('Cache-Control', 'no-store');
  try {
    const result = await db.execute('SELECT * FROM workshops');
    json(200, result.rows);
  } catch (e: any) {
    json(500, { success: false, error: e.message });
  }
};

export const onPost: RequestHandler = async ({ request, json, headers }) => {
  headers.set('Cache-Control', 'no-store');
  try {
    const {
      id, title, description, date, duration, price, image, instructor, spots, level
    } = await request.json();
    await db.execute({
      sql: `INSERT INTO workshops (id, title, description, date, duration, price, image, instructor, spots, level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      args: [
        String(id), title, description, date, duration, price, image, instructor,
        spots !== undefined ? Number(spots) : null, level
      ],
    });
    const result = await db.execute('SELECT * FROM workshops');
    json(201, result.rows);
  } catch (e: any) {
    json(500, { success: false, error: e.message });
  }
};

export const onPut: RequestHandler = async ({ request, json, headers }) => {
  headers.set('Cache-Control', 'no-store');
  try {
    const {
      id, title, description, date, duration, price, image, instructor, spots, level
    } = await request.json();
    await db.execute({
      sql: `
        UPDATE workshops
        SET title = ?, description = ?, date = ?, duration = ?, price = ?, image = ?, instructor = ?, spots = ?, level = ?
        WHERE id = ?
      `,
      args: [
        title, description, date, duration, price, image, instructor,
        spots !== undefined ? Number(spots) : null, level, String(id)
      ],
    });
    const result = await db.execute('SELECT * FROM workshops');
    json(200, result.rows);
  } catch (e: any) {
    json(500, { success: false, error: e.message });
  }
};

export const onDelete: RequestHandler = async ({ request, json, headers }) => {
  headers.set('Cache-Control', 'no-store');
  try {
    const { id } = await request.json();
    await db.execute({
      sql: 'DELETE FROM workshops WHERE id = ?',
      args: [String(id)],
    });
    const result = await db.execute('SELECT * FROM workshops');
    json(200, result.rows);
  } catch (e: any) {
    json(500, { success: false, error: e.message });
  }
}; 