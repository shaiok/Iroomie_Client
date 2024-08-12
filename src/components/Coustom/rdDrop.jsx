import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow } from "lucide-react";

export default function SortDropDown({ onSortChange, searchType }) {
  const [sortOption, setSortOption] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const isRoommate = searchType === "apartment";

  const handleSortChange = (option) => {
    setSortOption(option);
    onSortChange({ option, order: sortOrder });
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
    onSortChange({ option: sortOption, order });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-none bg-transparent text-blue-900 hover:bg-transparent">
          <ArrowDownWideNarrow strokeWidth={2} size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortOption} onValueChange={handleSortChange}>
          <DropdownMenuRadioItem value="score">Best Match</DropdownMenuRadioItem>
          {isRoommate && <DropdownMenuRadioItem value="rent">Price</DropdownMenuRadioItem>}
          {isRoommate && <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>}
          {isRoommate && <DropdownMenuRadioItem value="distance">Distance</DropdownMenuRadioItem>}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Order</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortOrder} onValueChange={handleOrderChange}>
          <DropdownMenuRadioItem value="asc">Low to High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">High to Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}