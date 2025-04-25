import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { useVans } from "@/hooks/VanHooks";

const CampersTable = () => {
  const { vans, count, loading, removeVan } = useVans(); // ✅ Corrected here
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(count / rowsPerPage);
  const items = vans.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) return <p className="text-center">Loading vans...</p>; // ✅ Loading state

  return (
    <Table
      removeWrapper
      className="mt-4 mb-4 gap-4"
      color="primary"
      selectionMode="single"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Manufacturer</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Delete</TableColumn>
      </TableHeader>
      <TableBody>
        {items.length > 0 ? (
          items.map((van, index) => (
            <TableRow key={van._id}>
              <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell>
              <TableCell>{van.manufacturer}</TableCell>
              <TableCell>{van.type}</TableCell>
              <TableCell>{van.price} €</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  size="lg"
                  variant="shadow"
                  onPress={() => removeVan(van._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No vans available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CampersTable;
