import { routeLoader$, routeAction$ } from '@builder.io/qwik-city';
import { getWorkshops, createWorkshop } from '~/utils/workshops';
import type { CreateWorkshopRequest } from '~/types';

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

// HTTP method handlers for direct API calls
export const onRequest = async ({ method, request, send }: any) => {
  if (method === 'GET') {
    const workshops = getWorkshops();
    return send(200, workshops);
  }
  
  if (method === 'POST') {
    try {
      const body = await request.json() as CreateWorkshopRequest;
      
      // Validate required fields
      if (!body.title || !body.description || !body.date || !body.duration || 
          !body.price || !body.image || !body.instructor || !body.spots || !body.level) {
        return send(400, { error: 'Missing required fields' });
      }
      
      // Validate level
      if (!['Beginner', 'Intermediate', 'Advanced'].includes(body.level)) {
        return send(400, { error: 'Invalid level. Must be Beginner, Intermediate, or Advanced' });
      }
      
      // Validate spots
      if (body.spots <= 0) {
        return send(400, { error: 'Spots must be greater than 0' });
      }
      
      const newWorkshop = createWorkshop(body);
      return send(201, newWorkshop);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }
  
  return send(405, { error: 'Method not allowed' });
}; 