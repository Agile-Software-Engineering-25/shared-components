import React, { useState, useMemo } from "react";
import { Avatar, Chip, Box, IconButton } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";
import { Table, type DataItem, type TableConfig } from "../";

// Complex data type
interface Employee extends DataItem {
  id: number;
  avatar?: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: Date;
  isStarred: boolean;
  skills: string[];
  performance: number;
  status: "active" | "inactive" | "on-leave";
}

// Sample complex data
const employeeData: Employee[] = [
  {
    id: 1,
    fullName: "Alice Johnson",
    email: "alice.johnson@company.com",
    department: "Engineering",
    position: "Senior Developer",
    salary: 95000,
    startDate: new Date("2022-01-15"),
    isStarred: true,
    skills: ["React", "TypeScript", "Node.js"],
    performance: 9.2,
    status: "active",
  },
  {
    id: 2,
    fullName: "Bob Smith",
    email: "bob.smith@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 75000,
    startDate: new Date("2021-06-20"),
    isStarred: false,
    skills: ["SEO", "Content Strategy", "Analytics"],
    performance: 8.5,
    status: "active",
  },
  {
    id: 3,
    fullName: "Carol Davis",
    email: "carol.davis@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 88000,
    startDate: new Date("2023-03-10"),
    isStarred: true,
    skills: ["AWS", "Docker", "Kubernetes"],
    performance: 9.0,
    status: "on-leave",
  },
  {
    id: 4,
    fullName: "David Wilson",
    email: "david.wilson@company.com",
    department: "Design",
    position: "UX Designer",
    salary: 70000,
    startDate: new Date("2020-11-05"),
    isStarred: false,
    skills: ["Figma", "User Research", "Prototyping"],
    performance: 8.8,
    status: "active",
  },
  {
    id: 5,
    fullName: "Eve Brown",
    email: "eve.brown@company.com",
    department: "Sales",
    position: "Account Executive",
    salary: 65000,
    startDate: new Date("2022-09-12"),
    isStarred: false,
    skills: ["CRM", "Lead Generation", "Negotiation"],
    performance: 7.9,
    status: "inactive",
  },
];

const AdvancedExample: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [starredEmployees, setStarredEmployees] = useState<Set<number>>(
    new Set(employeeData.filter((emp) => emp.isStarred).map((emp) => emp.id))
  );

  const toggleStar = (employeeId: number) => {
    setStarredEmployees((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string): "success" | "warning" | "danger" => {
    switch (status) {
      case "active":
        return "success";
      case "on-leave":
        return "warning";
      case "inactive":
        return "danger";
      default:
        return "success";
    }
  };

  const getPerformanceColor = (
    score: number
  ): "success" | "warning" | "danger" => {
    if (score >= 9) return "success";
    if (score >= 8) return "warning";
    return "danger";
  };

  const config: TableConfig<Employee> = {
    columns: [
      {
        key: "fullName",
        label: "Employee",
        sortable: true,
        width: "250px",
        sticky: true,
        render: (_, employee) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar size="sm">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.fullName} />
              ) : (
                <PersonIcon />
              )}
            </Avatar>
            <Box>
              <Box sx={{ fontWeight: "md" }}>{employee.fullName}</Box>
              <Box sx={{ fontSize: "sm", color: "text.tertiary" }}>
                {employee.email}
              </Box>
            </Box>
            <IconButton
              size="sm"
              variant="plain"
              color={starredEmployees.has(employee.id) ? "warning" : "neutral"}
              onClick={(e) => {
                e.stopPropagation();
                toggleStar(employee.id);
              }}
            >
              {starredEmployees.has(employee.id) ? (
                <StarIcon />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          </Box>
        ),
      },
      {
        key: "department",
        label: "Department",
        sortable: true,
        width: "120px",
        render: (value) => (
          <Chip variant="soft" color="primary" size="sm">
            {value}
          </Chip>
        ),
      },
      {
        key: "position",
        label: "Position",
        sortable: true,
        width: "150px",
      },
      {
        key: "salary",
        label: "Salary",
        sortable: true,
        width: "120px",
        align: "right",
        render: (value) => `$${(value as number).toLocaleString()}`,
      },
      {
        key: "performance",
        label: "Performance",
        sortable: true,
        width: "120px",
        align: "center",
        render: (value, employee) => (
          <Chip
            variant="soft"
            color={getPerformanceColor(value as number)}
            size="sm"
          >
            {value}/10
          </Chip>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        width: "100px",
        render: (value) => (
          <Chip
            variant="soft"
            color={getStatusColor(value as string)}
            size="sm"
          >
            {(value as string).replace("-", " ")}
          </Chip>
        ),
      },
      {
        key: "skills",
        label: "Skills",
        width: "200px",
        render: (skills) => (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {(skills as string[]).slice(0, 2).map((skill, index) => (
              <Chip key={index} variant="outlined" size="sm">
                {skill}
              </Chip>
            ))}
            {(skills as string[]).length > 2 && (
              <Chip variant="soft" size="sm" color="neutral">
                +{(skills as string[]).length - 2}
              </Chip>
            )}
          </Box>
        ),
        hideOnMobile: true,
      },
      {
        key: "startDate",
        label: "Start Date",
        sortable: true,
        width: "120px",
        render: (value) => (value as Date).toLocaleDateString(),
        hideOnMobile: true,
      },
    ],
    selectable: {
      mode: "multiple",
      selectedIds,
      onSelectionChange: setSelectedIds,
    },
    sortable: true,
    filterable: true,
    filters: [
      {
        key: "fullName",
        label: "Name",
        type: "text",
        placeholder: "Search by name...",
      },
      {
        key: "department",
        label: "Department",
        type: "select",
        options: [
          { label: "Engineering", value: "Engineering" },
          { label: "Marketing", value: "Marketing" },
          { label: "Design", value: "Design" },
          { label: "Sales", value: "Sales" },
        ],
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Active", value: "active" },
          { label: "On Leave", value: "on-leave" },
          { label: "Inactive", value: "inactive" },
        ],
      },
      {
        key: "salary",
        label: "Min Salary",
        type: "number",
        placeholder: "Minimum salary...",
      },
    ],
    pagination: {
      page: 1,
      pageSize: 10,
      total: employeeData.length,
      pageSizeOptions: [5, 10, 25, 50],
      showPageSizeSelector: true,
      showFirstLast: true,
    },
    mobileConfig: {
      primaryField: "fullName",
      secondaryField: "position",
      tertiaryField: "department",
      showActions: true,
      customRenderer: (employee) => (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar size="sm">
            <PersonIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontWeight: "md", marginBottom: 0.5 }}>
              {employee.fullName}
            </Box>
            <Box sx={{ fontSize: "sm", color: "text.secondary" }}>
              {employee.position} • {employee.department}
            </Box>
            <Box sx={{ display: "flex", gap: 1, marginTop: 0.5 }}>
              <Chip
                variant="soft"
                color={getStatusColor(employee.status)}
                size="sm"
              >
                {employee.status.replace("-", " ")}
              </Chip>
              <Chip
                variant="soft"
                color={getPerformanceColor(employee.performance)}
                size="sm"
              >
                {employee.performance}/10
              </Chip>
            </Box>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color={starredEmployees.has(employee.id) ? "warning" : "neutral"}
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(employee.id);
            }}
          >
            {starredEmployees.has(employee.id) ? (
              <StarIcon />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </Box>
      ),
    },
    stickyHeader: true,
    onRowClick: (employee) => {
      console.log("Row clicked:", employee.fullName);
    },
    rowClassName: (employee) => {
      return employee.status === "inactive" ? "inactive-row" : "";
    },
    empty: {
      message: "No employees found",
      action: {
        label: "Add Employee",
        onClick: () => alert("Add new employee"),
      },
    },
  };

  const dataWithStars = useMemo(() => {
    return employeeData.map((emp) => ({
      ...emp,
      isStarred: starredEmployees.has(emp.id),
    }));
  }, [starredEmployees]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Advanced Table Example</h1>
      <p>
        Selected employees: {selectedIds.size} | Starred employees:{" "}
        {starredEmployees.size}
      </p>

      <Table
        data={dataWithStars}
        config={config}
        style={{ marginTop: "20px" }}
        data-testid="employee-table"
      />

      <style>{`
        .inactive-row {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default AdvancedExample;
