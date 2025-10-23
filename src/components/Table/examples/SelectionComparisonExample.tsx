import React, { useState } from "react";
import { Box } from "@mui/joy";
import { Table, createTableBuilder, type DataItem } from "../";

// Sample data type
interface Task extends DataItem {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assignee: string;
}

// Sample data
const tasks: Task[] = [
  {
    id: 1,
    title: "Fix bug in authentication",
    status: "in-progress",
    priority: "high",
    assignee: "John Doe",
  },
  {
    id: 2,
    title: "Update documentation",
    status: "todo",
    priority: "medium",
    assignee: "Jane Smith",
  },
  {
    id: 3,
    title: "Review pull request #42",
    status: "todo",
    priority: "low",
    assignee: "Bob Johnson",
  },
  {
    id: 4,
    title: "Deploy to production",
    status: "done",
    priority: "high",
    assignee: "Alice Williams",
  },
];

/**
 * Example demonstrating the difference between tables with and without selection.
 * This validates that the fix properly handles both scenarios.
 */
const SelectionComparisonExample: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Table WITHOUT selection (should NOT show checkboxes)
  const tableWithoutSelection = createTableBuilder<Task>()
    .addColumn("title", "Task", { sortable: true, width: "250px" })
    .addColumn("status", "Status", {
      sortable: true,
      width: "120px",
      render: (value: string) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor:
              value === "done"
                ? "#e8f5e8"
                : value === "in-progress"
                  ? "#fff3e0"
                  : "#f5f5f5",
            color:
              value === "done"
                ? "#2e7d32"
                : value === "in-progress"
                  ? "#ef6c00"
                  : "#666",
          }}
        >
          {value}
        </span>
      ),
    })
    .addColumn("priority", "Priority", { sortable: true, width: "100px" })
    .addColumn("assignee", "Assignee", { sortable: true, width: "150px" })
    .enableSorting()
    .build();

  // Table WITH selection (should show checkboxes)
  const tableWithSelection = createTableBuilder<Task>()
    .addColumn("title", "Task", { sortable: true, width: "250px" })
    .addColumn("status", "Status", {
      sortable: true,
      width: "120px",
      render: (value: string) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor:
              value === "done"
                ? "#e8f5e8"
                : value === "in-progress"
                  ? "#fff3e0"
                  : "#f5f5f5",
            color:
              value === "done"
                ? "#2e7d32"
                : value === "in-progress"
                  ? "#ef6c00"
                  : "#666",
          }}
        >
          {value}
        </span>
      ),
    })
    .addColumn("priority", "Priority", { sortable: true, width: "100px" })
    .addColumn("assignee", "Assignee", { sortable: true, width: "150px" })
    .enableSelection("multiple", {
      selectedIds,
      onSelectionChange: setSelectedIds,
    })
    .enableSorting()
    .build();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Selection Comparison Example</h1>
      <p>
        This example demonstrates the fix for the checkbox column rendering
        issue. The first table does NOT call enableSelection() and should NOT
        show checkboxes. The second table calls enableSelection() and SHOULD
        show checkboxes.
      </p>

      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <h2 style={{ marginBottom: "10px" }}>Table WITHOUT Selection</h2>
        <p style={{ marginBottom: "10px", color: "#666" }}>
          ✓ No checkbox column should be visible
        </p>
        <Table
          data={tasks}
          config={tableWithoutSelection}
          data-testid="table-without-selection"
        />
      </Box>

      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <h2 style={{ marginBottom: "10px" }}>Table WITH Selection</h2>
        <p style={{ marginBottom: "10px", color: "#666" }}>
          ✓ Checkbox column should be visible | Selected: {selectedIds.size}{" "}
          tasks
        </p>
        <Table
          data={tasks}
          config={tableWithSelection}
          data-testid="table-with-selection"
        />
      </Box>
    </div>
  );
};

export default SelectionComparisonExample;
