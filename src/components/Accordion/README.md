# Accordion Component

A customizable accordion component with collapsible sections, built on top of Material-UI Joy.

## Usage

```tsx
import { Accordion } from "@agile-software/shared-components";
import { useState } from "react";

function MyComponent() {
  const accordionItems = [
    {
      id: "section1",
      header: "General Information",
      children: (
        <div>
          <p>This is the content for the first section.</p>
          <p>It can contain any React elements.</p>
        </div>
      )
    },
    {
      id: "section2",
      header: "Technical Details",
      children: (
        <div>
          <h4>Configuration Options</h4>
          <ul>
            <li>Option 1: Description</li>
            <li>Option 2: Description</li>
          </ul>
        </div>
      )
    },
    {
      id: "section3",
      header: "Advanced Settings",
      children: <p>Advanced configuration content goes here.</p>
    }
  ];

  return (
    <Accordion
      items={accordionItems}
      multiple={true}
      defaultExpanded={["section1"]}
    />
  );
}
```

## Props

- `items`: AccordionItem[] - Array of accordion items with id, header, and children
- `multiple`: boolean (optional, default: false) - Whether multiple sections can be open simultaneously
- `defaultExpanded`: string | string[] (optional) - Default expanded section(s) by id
- `accordionSX`: SxProps (optional) - Additional styles for individual accordion items
- `accordionGroupSX`: SxProps (optional) - Additional styles for the accordion group
- `headerSX`: SxProps (optional) - Additional styles for accordion headers

## AccordionItem Interface

- `id`: string - Unique identifier for the accordion item
- `header`: string - The title displayed in the accordion header
- `children`: ReactNode - The content to be rendered when the section is expanded
