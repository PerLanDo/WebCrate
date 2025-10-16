import { Link } from './types';

export const SAMPLE_LINKS: Link[] = [
    {
        id: 1,
        url: 'https://react.dev/',
        title: 'React Official Website',
        description: 'The library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.',
        notes: 'The new docs are great for learning!',
        category: 'Knowledge/Learning',
        created_at: new Date('2023-10-26T10:00:00Z').toISOString(),
        color: '#38bdf8',
    },
    {
        id: 2,
        url: 'https://tailwindcss.com/',
        title: 'Tailwind CSS',
        description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
        notes: 'My go-to for styling modern web apps. Very productive.',
        category: 'Dev Tool',
        created_at: new Date('2023-10-25T14:30:00Z').toISOString(),
        color: '#4ade80',
    },
    {
        id: 3,
        url: 'https://www.figma.com/',
        title: 'Figma',
        description: 'The collaborative interface design tool. Build, test, and ship better products from start to finish.',
        notes: 'Essential for UI/UX design and prototyping.',
        category: 'Design Resource',
        created_at: new Date('2023-10-24T09:15:00Z').toISOString(),
        color: '#c084fc',
    },
    {
        id: 4,
        url: 'https://www.notion.so/',
        title: 'Notion',
        description: 'The all-in-one workspace for your notes, tasks, wikis, and databases. A versatile tool for personal and professional organization.',
        notes: '',
        category: 'Website/App',
        created_at: new Date('2023-10-23T18:00:00Z').toISOString(),
        color: '#fb923c',
    },
];
