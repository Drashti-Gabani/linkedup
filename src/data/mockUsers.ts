export interface User {
  id: string;
  name: string;
  age: number;
  occupation: string;
  distance: string;
  photos: string[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ashley',
    age: 21,
    occupation: 'Model',
    distance: '3 miles',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    ],
  },
  {
    id: '2',
    name: 'Emma',
    age: 24,
    occupation: 'Designer',
    distance: '5 miles',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    ],
  },
  {
    id: '3',
    name: 'Sophia',
    age: 23,
    occupation: 'Photographer',
    distance: '2 miles',
    photos: [
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    ],
  },
  {
    id: '4',
    name: 'Olivia',
    age: 22,
    occupation: 'Engineer',
    distance: '4 miles',
    photos: [
      'https://images.unsplash.com/photo-1532170579297-281918c8ae72',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    ],
  },
  {
    id: '5',
    name: 'Isabella',
    age: 25,
    occupation: 'Artist',
    distance: '6 miles',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    ],
  },
];
