import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useVans, useVanFilters } from "@/hooks/VanHooks";

const CampersTable = () => {
  const [filters, setFilters] = useState({
    manufacturer: "",
    transmission: "",
    type: "",
  });

  const { vans, count, loading, removeVan } = useVans(filters);
  const { manufacturers, types, loading: loadingFilters } = useVanFilters();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(count / rowsPerPage);
  const items = vans.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="flex gap-4">
        <Select
          label="Manufacturer"
          name="manufacturer"
          onChange={handleChange}
          selectedKeys={[filters.manufacturer]}
          isDisabled={loadingFilters}
        >
          <SelectItem key="">All</SelectItem>
          {manufacturers.map((mfr) => (
            <SelectItem key={mfr}>{mfr}</SelectItem>
          ))}
        </Select>

        <Select
          label="Transmission"
          name="transmission"
          onChange={handleChange}
          selectedKeys={[filters.transmission]}
        >
          <SelectItem key="">All</SelectItem>
          <SelectItem key="Manual">Manual</SelectItem>
          <SelectItem key="Automatic">Automatic</SelectItem>
        </Select>

        <Select
          label="Type"
          name="type"
          onChange={handleChange}
          selectedKeys={[filters.type]}
          isDisabled={loadingFilters}
        >
          <SelectItem key="">All</SelectItem>
          {types.map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Table Section */}
      {loading ? (
        <p className="text-center">Loading vans...</p>
      ) : (
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
                onChange={(p) => setPage(p)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Manufacturer</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Transmission</TableColumn>
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
                  <TableCell>{van.transmission}</TableCell>
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
                <TableCell colSpan={6} className="text-center">
                  No vans match the filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CampersTable;
