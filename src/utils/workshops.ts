// Intentionally left empty for static build compatibility.

// This file should only contain client-side or static data logic for workshops.
// Remove all Node.js/file system code for static build compatibility.

// Example: export a static array or client-side functions here if needed.

// ...rest of your client-side workshops logic...

// Path to the data file
const DATA_FILE_PATH = join(process.cwd(), 'data', 'workshops.json');

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    const fs = require('fs');
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read workshops from file
const readWorkshopsFromFile = (): Workshop[] => {
  try {
    ensureDataDirectory();
    if (!existsSync(DATA_FILE_PATH)) {
      // Initialize with default data if file doesn't exist
      const defaultWorkshops: Workshop[] = [
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
      writeWorkshopsToFile(defaultWorkshops);
      return defaultWorkshops;
    }
    
    const data = readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading workshops from file:', error);
    return [];
  }
};

// Write workshops to file
const writeWorkshopsToFile = (workshops: Workshop[]): void => {
  try {
    ensureDataDirectory();
    writeFileSync(DATA_FILE_PATH, JSON.stringify(workshops, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing workshops to file:', error);
    throw new Error('Failed to save workshop data');
  }
};

// Get next available ID
const getNextId = (workshops: Workshop[]): number => {
  if (workshops.length === 0) return 1;
  return Math.max(...workshops.map(w => w.id)) + 1;
};

export const getWorkshops = (): Workshop[] => {
  return readWorkshopsFromFile();
};

export const getWorkshopById = (id: number): Workshop | null => {
  const workshops = readWorkshopsFromFile();
  const workshop = workshops.find(w => w.id === id);
  return workshop ? { ...workshop } : null;
};

export const createWorkshop = (workshopData: CreateWorkshopRequest): Workshop => {
  const workshops = readWorkshopsFromFile();
  const newWorkshop: Workshop = {
    id: getNextId(workshops),
    ...workshopData
  };
  
  workshops.push(newWorkshop);
  writeWorkshopsToFile(workshops);
  return { ...newWorkshop };
};

export const updateWorkshop = (id: number, workshopData: Partial<CreateWorkshopRequest>): Workshop | null => {
  const workshops = readWorkshopsFromFile();
  const index = workshops.findIndex(w => w.id === id);
  
  if (index === -1) {
    return null;
  }
  
  workshops[index] = {
    ...workshops[index],
    ...workshopData
  };
  
  writeWorkshopsToFile(workshops);
  return { ...workshops[index] };
};

export const deleteWorkshop = (id: number): boolean => {
  const workshops = readWorkshopsFromFile();
  const index = workshops.findIndex(w => w.id === id);
  
  if (index === -1) {
    return false;
  }
  
  workshops.splice(index, 1);
  writeWorkshopsToFile(workshops);
  return true;
}; 