import { type RequestHandler } from '@builder.io/qwik-city';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const onGet: RequestHandler = async ({ json }) => {
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
  const { id, title, description, date } = await request.json();
  await db.execute({
    sql: 'UPDATE workshops SET title = ?, description = ?, date = ? WHERE id = ?',
    args: [title, description, date, id],
  });
  json(200, { success: true });
};

export const onDelete: RequestHandler = async ({ request, json }) => {
  const { id } = await request.json();
  await db.execute({
    sql: 'DELETE FROM workshops WHERE id = ?',
    args: [id],
  });
  json(200, { success: true });
}; 