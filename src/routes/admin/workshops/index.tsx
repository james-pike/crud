import { component$, useSignal, $ } from '@builder.io/qwik';
import { routeLoader$, routeAction$ } from '@builder.io/qwik-city';
import { getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop } from '~/utils/workshops';
import type { Workshop, CreateWorkshopRequest, UpdateWorkshopRequest } from '~/types';

// Define the loaders and actions in this route
export const useGetWorkshops = routeLoader$(async () => {
  const workshops = getWorkshops();
  return workshops;
});

export const useCreateWorkshop = routeAction$(async (form: any) => {
  const data = form as CreateWorkshopRequest;
  
  // Validate required fields
  if (!data.title || !data.description || !data.date || !data.duration || 
      !data.price || !data.image || !data.instructor || !data.spots || !data.level) {
    return { success: false, error: 'Missing required fields' };
  }
  
  // Validate level
  if (!['Beginner', 'Intermediate', 'Advanced'].includes(data.level)) {
    return { success: false, error: 'Invalid level. Must be Beginner, Intermediate, or Advanced' };
  }
  
  // Validate spots
  if (data.spots <= 0) {
    return { success: false, error: 'Spots must be greater than 0' };
  }
  
  const newWorkshop = createWorkshop(data);
  return { success: true, workshop: newWorkshop };
});

export const useUpdateWorkshop = routeAction$(async (form: any) => {
  const data = form as UpdateWorkshopRequest;
  const id = parseInt(data.id as any);
  
  if (isNaN(id)) {
    return { success: false, error: 'Invalid workshop ID' };
  }
  
  // Validate level if provided
  if (data.level && !['Beginner', 'Intermediate', 'Advanced'].includes(data.level)) {
    return { success: false, error: 'Invalid level. Must be Beginner, Intermediate, or Advanced' };
  }
  
  // Validate spots if provided
  if (data.spots !== undefined && data.spots <= 0) {
    return { success: false, error: 'Spots must be greater than 0' };
  }
  
  const updatedWorkshop = updateWorkshop(id, data);
  
  if (!updatedWorkshop) {
    return { success: false, error: 'Workshop not found' };
  }
  
  return { success: true, workshop: updatedWorkshop };
});

export const useDeleteWorkshop = routeAction$(async (form: any) => {
  const id = parseInt(form.id);
  
  if (isNaN(id)) {
    return { success: false, error: 'Invalid workshop ID' };
  }
  
  const deleted = deleteWorkshop(id);
  
  if (!deleted) {
    return { success: false, error: 'Workshop not found' };
  }
  
  return { success: true };
});

export default component$(() => {
  const workshops = useGetWorkshops();
  const createAction = useCreateWorkshop();
  const updateAction = useUpdateWorkshop();
  const deleteAction = useDeleteWorkshop();
  
  const showCreateForm = useSignal(false);
  const editingWorkshop = useSignal<Workshop | null>(null);
  
  const formData = useSignal<CreateWorkshopRequest>({
    title: '',
    description: '',
    date: '',
    duration: '',
    price: '',
    image: '',
    instructor: '',
    spots: 0,
    level: 'Beginner'
  });
  
  const resetForm = $(() => {
    formData.value = {
      title: '',
      description: '',
      date: '',
      duration: '',
      price: '',
      image: '',
      instructor: '',
      spots: 0,
      level: 'Beginner'
    };
    showCreateForm.value = false;
    editingWorkshop.value = null;
  });
  
  const handleCreate = $(async () => {
    await createAction.submit(formData.value as any);
    if (createAction.value?.success) {
      resetForm();
      // Refresh the workshops list
      window.location.reload();
    }
  });
  
  const handleUpdate = $(async () => {
    if (editingWorkshop.value) {
      await updateAction.submit({
        id: editingWorkshop.value.id,
        ...formData.value
      } as any);
      if (updateAction.value?.success) {
        resetForm();
        window.location.reload();
      }
    }
  });
  
  const handleDelete = $(async (id: number) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      await deleteAction.submit({ id } as any);
      if (deleteAction.value?.success) {
        window.location.reload();
      }
    }
  });
  
  const editWorkshop = $((workshop: Workshop) => {
    editingWorkshop.value = workshop;
    formData.value = { ...workshop };
    showCreateForm.value = true;
  });
  
  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-clay-900 mb-4">Workshop Management</h1>
        <button
          onClick$={() => {
            resetForm();
            showCreateForm.value = true;
          }}
          class="bg-clay-600 text-white px-4 py-2 rounded-lg hover:bg-clay-700 transition-colors"
        >
          Add New Workshop
        </button>
      </div>
      
      {/* Create/Edit Form */}
      {showCreateForm.value && (
        <div class="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 class="text-xl font-semibold mb-4">
            {editingWorkshop.value ? 'Edit Workshop' : 'Create New Workshop'}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.value.title}
                onInput$={(ev) => formData.value.title = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="text"
                value={formData.value.date}
                onInput$={(ev) => formData.value.date = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={formData.value.duration}
                onInput$={(ev) => formData.value.duration = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="text"
                value={formData.value.price}
                onInput$={(ev) => formData.value.price = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
              <input
                type="text"
                value={formData.value.instructor}
                onInput$={(ev) => formData.value.instructor = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Spots</label>
              <input
                type="number"
                value={formData.value.spots}
                onInput$={(ev) => formData.value.spots = parseInt((ev.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                value={formData.value.level}
                onChange$={(ev) => formData.value.level = (ev.target as HTMLSelectElement).value as any}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={formData.value.image}
                onInput$={(ev) => formData.value.image = (ev.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.value.description}
                onInput$={(ev) => formData.value.description = (ev.target as HTMLTextAreaElement).value}
                rows={3}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clay-500"
              />
            </div>
          </div>
          
          <div class="flex gap-4 mt-6">
            <button
              onClick$={editingWorkshop.value ? handleUpdate : handleCreate}
              class="bg-clay-600 text-white px-6 py-2 rounded-lg hover:bg-clay-700 transition-colors"
            >
              {editingWorkshop.value ? 'Update' : 'Create'}
            </button>
            <button
              onClick$={resetForm}
              class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
          
          {/* Error Messages */}
          {(createAction.value?.error || updateAction.value?.error) && (
            <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {createAction.value?.error || updateAction.value?.error}
            </div>
          )}
        </div>
      )}
      
      {/* Workshops List */}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">All Workshops</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
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
                    <div class="text-sm font-medium text-gray-900">{workshop.title}</div>
                    <div class="text-sm text-gray-500">{workshop.description.substring(0, 50)}...</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.date}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.instructor}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`px-2 py-1 text-xs font-semibold rounded-full ${
                      workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workshop.level}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.spots}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.price}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick$={() => editWorkshop(workshop)}
                      class="text-clay-600 hover:text-clay-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick$={() => handleDelete(workshop.id)}
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Error Message */}
      {deleteAction.value?.error && (
        <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {deleteAction.value.error}
        </div>
      )}
    </div>
  );
}); 