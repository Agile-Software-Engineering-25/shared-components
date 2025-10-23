import React from "react";
import { Table, createTableBuilder, type DataItem } from "../";

// Sample data type
interface Product extends DataItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 15,
  },
  {
    id: 2,
    name: "Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 50,
  },
  {
    id: 3,
    name: "Keyboard",
    category: "Electronics",
    price: 79.99,
    stock: 30,
  },
  {
    id: 4,
    name: "Monitor",
    category: "Electronics",
    price: 299.99,
    stock: 20,
  },
];

/**
 * Example demonstrating a table WITHOUT selection enabled.
 * This should NOT render checkbox columns.
 */
const NoSelectionExample: React.FC = () => {
  // Create a table configuration WITHOUT calling enableSelection()
  const tableConfig = createTableBuilder<Product>()
    .addColumn("name", "Product Name", { sortable: true, width: "200px" })
    .addColumn("category", "Category", { sortable: true, width: "150px" })
    .addColumn("price", "Price", {
      sortable: true,
      width: "100px",
      align: "right",
      render: (value: number) => `$${value.toFixed(2)}`,
    })
    .addColumn("stock", "Stock", {
      sortable: true,
      width: "100px",
      align: "right",
    })
    .enableSorting()
    .build();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Table Without Selection</h1>
      <p>
        This example demonstrates a table created without calling
        enableSelection(). No checkbox column should be visible.
      </p>

      <Table
        data={products}
        config={tableConfig}
        style={{ marginTop: "20px" }}
        data-testid="no-selection-table"
      />
    </div>
  );
};

export default NoSelectionExample;
