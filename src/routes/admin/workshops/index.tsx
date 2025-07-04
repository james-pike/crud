import { component$, useSignal } from '@builder.io/qwik';
import type { Workshop } from '~/types';

const workshopsData: Workshop[] = [
  {
    id: 1,
    title: "Introduction to Wheel Throwing",
    description: "Learn the fundamentals of pottery wheel throwing in this hands-on workshop. Perfect for beginners who want to experience the magic of creating with clay.",
    date: "March 15, 2024",
    duration: "3 hours",
    price: "$85",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Sarah Chen",
    spots: 8,
    level: "Beginner"
  },
  {
    id: 2,
    title: "Advanced Glazing Techniques",
    description: "Master the art of glazing with advanced techniques including layering, wax resist, and creating unique surface textures.",
    date: "March 22, 2024",
    duration: "4 hours",
    price: "$120",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Michael Rodriguez",
    spots: 6,
    level: "Advanced"
  },
  {
    id: 3,
    title: "Hand-Building Fundamentals",
    description: "Discover the versatility of hand-building techniques including pinch pots, coil building, and slab construction.",
    date: "March 29, 2024",
    duration: "3.5 hours",
    price: "$95",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Emma Thompson",
    spots: 10,
    level: "Beginner"
  },
  {
    id: 4,
    title: "Raku Firing Workshop",
    description: "Experience the excitement of raku firing, a traditional Japanese technique that creates unique, unpredictable glaze effects.",
    date: "April 5, 2024",
    duration: "5 hours",
    price: "$150",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "David Kim",
    spots: 4,
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Pottery for Kids",
    description: "A fun, creative workshop designed specifically for children ages 8-12. Kids will learn basic hand-building techniques and create their own pottery masterpieces.",
    date: "April 12, 2024",
    duration: "2 hours",
    price: "$65",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    instructor: "Lisa Park",
    spots: 12,
    level: "Beginner"
  }
];

export default component$(() => {
  const workshops = useSignal<Workshop[]>(workshopsData);

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-clay-900 mb-4">Workshop Management</h1>
      </div>
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Current Workshops</h3>
        </div>
        {workshops.value.length === 0 ? (
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