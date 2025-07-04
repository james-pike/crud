import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import type { Workshop } from '~/types';

export default component$(() => {
  const workshops = useSignal<Workshop[]>([]);
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Workshop>>({});

  // Fetch workshops from API
  useVisibleTask$(async () => {
    loading.value = true;
    try {
      const res = await fetch('/api/workshops');
      workshops.value = await res.json();
      error.value = null;
    } catch (e: any) {
      error.value = 'Failed to load workshops.';
    } finally {
      loading.value = false;
    }
  });

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Create or update workshop
  const handleSubmit = $(async (e: any) => {
    e.preventDefault();
    if (editingId.value) {
      // Update
      await fetch('/api/workshops', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form.value, id: editingId.value }),
      });
    } else {
      // Create
      await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form.value, id: crypto.randomUUID() }),
      });
    }
    editingId.value = null;
    form.value = {};
    // Refresh list
    const res = await fetch('/api/workshops');
    workshops.value = await res.json();
  });

  // Edit workshop
  const handleEdit = $((workshop: Workshop) => {
    editingId.value = String(workshop.id);
    form.value = { ...workshop };
  });

  // Delete workshop
  const handleDelete = $(async (id: string) => {
    await fetch('/api/workshops', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    // Refresh list
    const res = await fetch('/api/workshops');
    workshops.value = await res.json();
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-clay-900 mb-4">Workshop Management</h1>
      </div>
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{editingId.value ? 'Edit Workshop' : 'Add Workshop'}</h3>
        </div>
        <form class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit$={handleSubmit}>
          <input name="title" value={form.value.title || ''} onInput$={handleInput} placeholder="Title" class="border p-2 rounded" required />
          <input name="date" value={form.value.date || ''} onInput$={handleInput} placeholder="Date" class="border p-2 rounded" required />
          <input name="duration" value={form.value.duration || ''} onInput$={handleInput} placeholder="Duration" class="border p-2 rounded" />
          <input name="price" value={form.value.price || ''} onInput$={handleInput} placeholder="Price" class="border p-2 rounded" />
          <input name="image" value={form.value.image || ''} onInput$={handleInput} placeholder="Image URL" class="border p-2 rounded" />
          <input name="instructor" value={form.value.instructor || ''} onInput$={handleInput} placeholder="Instructor" class="border p-2 rounded" />
          <input name="spots" type="number" value={form.value.spots || ''} onInput$={handleInput} placeholder="Spots" class="border p-2 rounded" />
          <select name="level" value={form.value.level || ''} onInput$={handleInput} class="border p-2 rounded">
            <option value="">Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <textarea name="description" value={form.value.description || ''} onInput$={handleInput} placeholder="Description" class="border p-2 rounded md:col-span-2" />
          <div class="md:col-span-2 flex gap-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">{editingId.value ? 'Update' : 'Add'}</button>
            {editingId.value && (
              <button type="button" class="bg-gray-400 text-white px-4 py-2 rounded" onClick$={$(() => { editingId.value = null; form.value = {}; })}>Cancel</button>
            )}
          </div>
        </form>
      </div>
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Current Workshops</h3>
        </div>
        {loading.value ? (
          <div class="p-8 text-center text-gray-500">Loading...</div>
        ) : error.value ? (
          <div class="p-8 text-center text-red-500">{error.value}</div>
        ) : workshops.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">
            <p>No workshops found.</p>
          </div>
        ) : (
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workshop</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spots</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {workshops.value.map((workshop) => (
                  <tr key={workshop.id} class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img width="40" height="40" class="h-10 w-10 rounded-lg object-cover" src={workshop.image} alt={workshop.title} />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{workshop.title}</div>
                          <div class="text-sm text-gray-500">{workshop.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.instructor}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workshop.level}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.spots}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.price}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-2">
                      <button class="text-blue-600 hover:underline" onClick$={() => handleEdit(workshop)}>Edit</button>
                      <button class="text-red-600 hover:underline" onClick$={() => handleDelete(String(workshop.id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}); 