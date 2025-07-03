# Workshop CRUD API

This document describes the CRUD API endpoints for managing workshops in the Earth2 pottery application.

## Data Persistence

Workshop data is persisted in a JSON file located at `data/workshops.json`. This ensures that:
- Data survives server restarts
- Changes are immediately saved to disk
- The data file is automatically created with sample data if it doesn't exist
- The data directory is excluded from version control

## Base URL
All API endpoints are prefixed with `/api/workshops`

## Data Models

### Workshop
```typescript
interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  price: string;
  image: string;
  instructor: string;
  spots: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}
```

### Create Workshop Request
```typescript
interface CreateWorkshopRequest {
  title: string;
  description: string;
  date: string;
  duration: string;
  price: string;
  image: string;
  instructor: string;
  spots: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}
```

### Update Workshop Request
```typescript
interface UpdateWorkshopRequest extends Partial<CreateWorkshopRequest> {
  id: number;
}
```

## API Endpoints

### 1. Get All Workshops
**GET** `/api/workshops`

Returns a list of all workshops.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Introduction to Wheel Throwing",
    "description": "Learn the fundamentals of pottery wheel throwing...",
    "date": "March 15, 2024",
    "duration": "3 hours",
    "price": "$85",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "instructor": "Sarah Chen",
    "spots": 8,
    "level": "Beginner"
  }
]
```

### 2. Create Workshop
**POST** `/api/workshops`

Creates a new workshop.

**Request Body:**
```json
{
  "title": "New Workshop",
  "description": "Workshop description",
  "date": "April 20, 2024",
  "duration": "2 hours",
  "price": "$75",
  "image": "https://example.com/image.jpg",
  "instructor": "John Doe",
  "spots": 10,
  "level": "Beginner"
}
```

**Response:** `201 Created`
```json
{
  "id": 6,
  "title": "New Workshop",
  "description": "Workshop description",
  "date": "April 20, 2024",
  "duration": "2 hours",
  "price": "$75",
  "image": "https://example.com/image.jpg",
  "instructor": "John Doe",
  "spots": 10,
  "level": "Beginner"
}
```

### 3. Get Workshop by ID
**GET** `/api/workshops/{id}`

Returns a specific workshop by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Introduction to Wheel Throwing",
  "description": "Learn the fundamentals of pottery wheel throwing...",
  "date": "March 15, 2024",
  "duration": "3 hours",
  "price": "$85",
  "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "instructor": "Sarah Chen",
  "spots": 8,
  "level": "Beginner"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Workshop not found"
}
```

### 4. Update Workshop
**PUT** `/api/workshops/{id}`

Updates an existing workshop. All fields are optional.

**Request Body:**
```json
{
  "title": "Updated Workshop Title",
  "spots": 12
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Workshop Title",
  "description": "Learn the fundamentals of pottery wheel throwing...",
  "date": "March 15, 2024",
  "duration": "3 hours",
  "price": "$85",
  "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "instructor": "Sarah Chen",
  "spots": 12,
  "level": "Beginner"
}
```

### 5. Delete Workshop
**DELETE** `/api/workshops/{id}`

Deletes a workshop by ID.

**Response:** `200 OK`
```json
{
  "success": true
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Workshop not found"
}
```

## Validation Rules

### Required Fields (for creation)
- `title`: string
- `description`: string
- `date`: string
- `duration`: string
- `price`: string
- `image`: string
- `instructor`: string
- `spots`: number (must be > 0)
- `level`: must be one of: 'Beginner', 'Intermediate', 'Advanced'

### Validation Errors
- `400 Bad Request`: Missing required fields, invalid level, or spots <= 0
- `404 Not Found`: Workshop not found
- `405 Method Not Allowed`: Unsupported HTTP method
- `400 Bad Request`: Invalid JSON in request body

## Admin Interface

A web-based admin interface is available at `/admin/workshops` for managing workshops through a user-friendly interface.

## Usage Examples

### Using fetch API
```javascript
// Get all workshops
const response = await fetch('/api/workshops');
const workshops = await response.json();

// Create a workshop
const newWorkshop = await fetch('/api/workshops', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Workshop',
    description: 'Workshop description',
    date: 'April 20, 2024',
    duration: '2 hours',
    price: '$75',
    image: 'https://example.com/image.jpg',
    instructor: 'John Doe',
    spots: 10,
    level: 'Beginner'
  })
});

// Update a workshop
const updatedWorkshop = await fetch('/api/workshops/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    spots: 12
  })
});

// Delete a workshop
const deleteResponse = await fetch('/api/workshops/1', {
  method: 'DELETE'
});
```

## Data File Structure

The workshop data is stored in `data/workshops.json` with the following structure:

```json
[
  {
    "id": 1,
    "title": "Workshop Title",
    "description": "Workshop description",
    "date": "Date string",
    "duration": "Duration string",
    "price": "Price string",
    "image": "Image URL",
    "instructor": "Instructor name",
    "spots": 10,
    "level": "Beginner"
  }
]
```

## Notes

- **Data Persistence**: All workshop data is automatically saved to `data/workshops.json`
- **Auto-initialization**: If the data file doesn't exist, it will be created with sample workshop data
- **Error Handling**: File I/O errors are logged and handled gracefully
- **ID Management**: New workshop IDs are automatically generated based on existing data
- **Data Integrity**: All CRUD operations ensure data consistency
- **Backup**: Consider backing up the `data/workshops.json` file regularly
- **Version Control**: The `data/` directory is excluded from git to prevent committing user data 