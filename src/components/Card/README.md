# Card Component

A customizable card component for displaying content with optional image, title, and description. Perfect for creating nice "List" features with consistent design.

## Features

- Clean, modern design with rounded corners and subtle shadows
- Optional image background with automatic overlay
- Flexible content structure (title + description + custom children)
- Hover effects when clickable
- Fully customizable styling
- TypeScript support

## Usage

### Basic Card

```tsx
import { Card } from '@ase/shared-components';

function MyComponent() {
  return (
    <Card
      title="My Card Title"
      description="This is a description of the card content."
    />
  );
}
```

### Card with Image

```tsx
import { Card } from '@ase/shared-components';

function MyComponent() {
  return (
    <Card
      title="Featured Article"
      description="Read about the latest developments in our field."
      image="/path/to/image.jpg"
      imageAlt="Article preview image"
    />
  );
}
```

### Card with Only Children (No Title/Description)

```tsx
import { Card } from '@ase/shared-components';
import { Box, Typography, Divider, Chip } from '@mui/joy';

function ExamCard() {
  return (
    <Card
      onClick={() => console.log('Exam card clicked!')}
      cardSX={{
        width: 270,
        cursor: 'pointer',
        transition: 'all ease .3s',
        ':hover': {
          transform: 'scale(1.03)',
          boxShadow: 'lg',
        },
      }}
    >
      <Typography level="h4" fontWeight="bold" lineHeight={1.2}>
        Advanced Programming Exam
      </Typography>
      <Divider inset="none" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ opacity: '50%' }}>Module</Typography>
          <Typography fontWeight="bold">CSE101</Typography>
        </Box>
        <Box>
          <Typography sx={{ opacity: '50%' }}>Date</Typography>
          <Typography>2024-03-15</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Box>
          <Typography sx={{ opacity: '50%' }}>Duration</Typography>
          <Typography>120 min</Typography>
        </Box>
        <Box>
          <Typography sx={{ opacity: '50%' }}>Status</Typography>
          <Chip color="success" variant="soft">
            Graded
          </Chip>
        </Box>
      </Box>
    </Card>
  );
}
```

### Interactive Card with Custom Content

```tsx
import { Card } from '@ase/shared-components';
import { Button, Chip } from '@mui/joy';

function MyComponent() {
  const handleCardClick = () => {
    console.log('Card clicked!');
  };

  return (
    <Card
      title="Interactive Card"
      description="This card has additional content and is clickable."
      onClick={handleCardClick}
    >
      <Chip color="primary" variant="soft">
        New
      </Chip>
      <Button size="sm" sx={{ mt: 1 }}>
        Learn More
      </Button>
    </Card>
  );
}
```

### Card List Example

```tsx
import { Card } from '@ase/shared-components';
import { Box } from '@mui/joy';

const items = [
  {
    id: 1,
    title: "First Item",
    description: "Description for the first item",
    image: "/image1.jpg"
  },
  {
    id: 2,
    title: "Second Item",
    description: "Description for the second item"
  },
];

function CardList() {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
      {items.map(item => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
        />
      ))}
    </Box>
  );
}
```

## API Reference

### CardProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Optional main title of the card |
| `description` | `string` | `undefined` | Optional description text |
| `image` | `string` | `undefined` | Optional image URL to display as background |
| `imageAlt` | `string` | `title` | Alt text for the image |
| `children` | `ReactNode` | `undefined` | Optional additional content to render in the card body |
| `cardSX` | `SxProps` | `undefined` | Additional styles for the card container |
| `contentSX` | `SxProps` | `undefined` | Additional styles for the card content area |
| `titleSX` | `SxProps` | `undefined` | Additional styles for the title |
| `descriptionSX` | `SxProps` | `undefined` | Additional styles for the description |
| `onClick` | `() => void` | `undefined` | Optional click handler for the card |

## Styling

The Card component uses Joy UI's styling system and includes default styles for:

- Rounded corners (10px border radius)
- Subtle shadow with hover enhancement
- Primary color scheme for titles
- Automatic text color adjustment for image overlays
- Smooth transitions for interactive states

### Custom Styling Examples

```tsx
// Custom card styling
<Card
  title="Styled Card"
  cardSX={{
    maxWidth: 300,
    backgroundColor: 'background.level1',
    border: '1px solid',
    borderColor: 'divider'
  }}
  titleSX={{
    color: 'success.500',
    fontSize: 'xl'
  }}
/>

// Custom content layout
<Card
  title="Custom Layout"
  contentSX={{
    textAlign: 'center',
    p: 3
  }}
>
  <CustomComponent />
</Card>
```

## Notes

- When an image is provided, the card automatically applies a gradient overlay to ensure text readability
- The card becomes interactive (with hover effects) only when an `onClick` handler is provided
- All style props accept Joy UI's `SxProps` for consistent theming
