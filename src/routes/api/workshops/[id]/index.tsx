import { routeLoader$, routeAction$ } from '@builder.io/qwik-city';
import { getWorkshopById, updateWorkshop, deleteWorkshop } from '~/utils/workshops';
import type { UpdateWorkshopRequest } from '~/types';

export const useGetWorkshop = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    return status(400);
  }
  
  const workshop = getWorkshopById(id);
  
  if (!workshop) {
    return status(404);
  }
  
  return workshop;
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

// HTTP method handlers for direct API calls
export const onRequest = async ({ params, method, request, send }) => {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    return send(400, { error: 'Invalid workshop ID' });
  }
  
  if (method === 'GET') {
    const workshop = getWorkshopById(id);
    if (!workshop) {
      return send(404, { error: 'Workshop not found' });
    }
    return send(200, workshop);
  }
  
  if (method === 'PUT') {
    try {
      const body = await request.json();
      const updatedWorkshop = updateWorkshop(id, body);
      if (!updatedWorkshop) {
        return send(404, { error: 'Workshop not found' });
      }
      return send(200, updatedWorkshop);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }
  
  if (method === 'DELETE') {
    const deleted = deleteWorkshop(id);
    if (!deleted) {
      return send(404, { error: 'Workshop not found' });
    }
    return send(200, { success: true });
  }
  
  return send(405, { error: 'Method not allowed' });
}; 