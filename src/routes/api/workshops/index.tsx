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

export const onGet: RequestHandler = async ({ json }) => {
  console.log('GET /api/workshops called');
  const result = await db.execute('SELECT * FROM workshops');
  json(200, result.rows);
};

export const onPost: RequestHandler = async ({ request, json }) => {
  const { id, title, description, date } = await request.json();
  await db.execute({
    sql: 'INSERT INTO workshops (id, title, description, date) VALUES (?, ?, ?, ?)',
    args: [id, title, description, date],
  });
  json(201, { success: true });
};

export const onPut: RequestHandler = async ({ request, json }) => {
  try {
    const {
      id, title, description, date, duration, price, image, instructor, spots, level
    } = await request.json();
    console.log('PUT /api/workshops id:', id, typeof id);
    const result = await db.execute({
      sql: `
        UPDATE workshops
        SET title = ?, description = ?, date = ?, duration = ?, price = ?, image = ?, instructor = ?, spots = ?, level = ?
        WHERE id = ?
      `,
      args: [title, description, date, duration, price, image, instructor, spots, level, id],
    });
    console.log('PUT /api/workshops result:', result);
    json(200, { success: true });
  } catch (e: any) {
    console.error('PUT /api/workshops error:', e);
    json(500, { success: false, error: e.message });
  }
};

export const onDelete: RequestHandler = async ({ request, json }) => {
  const { id } = await request.json();
  await db.execute({
    sql: 'DELETE FROM workshops WHERE id = ?',
    args: [id],
  });
  json(200, { success: true });
}; 