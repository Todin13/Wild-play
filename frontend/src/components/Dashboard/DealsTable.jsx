import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@heroui/react";
import { useDeals } from "@/hooks/DealsHooks";

import dayjs from "dayjs";

function DealsTable() {
  const { deals, count, loading, error, deleteDeal } = useDeals();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(count / rowsPerPage);
  const items = deals.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Table
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
      removeWrapper
      className="mt-4 mb-4 ml-10 mr-20 gap-4"
      color="primary"
      selectionMode="single"
    >
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Title</TableColumn>
        <TableColumn>Discount (%)</TableColumn>
        <TableColumn>Duration </TableColumn>
        <TableColumn>Delete</TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((deal, index) => (
          <TableRow key={deal.id}>
            <TableCell>{index + 1 + (page - 1) * rowsPerPage}</TableCell>
            <TableCell>{deal.title}</TableCell>
            <TableCell>{deal.discount} %</TableCell>
            <TableCell> {dayjs(deal.start_date).format("MMMM D, YYYY")} - {dayjs(deal.end_date).format("MMMM D, YYYY")}</TableCell>
            <TableCell>
              <Button
                color="danger"
                size="lg"
                variant="shadow"
                onPress={() => deleteDeal(deal.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DealsTable;
