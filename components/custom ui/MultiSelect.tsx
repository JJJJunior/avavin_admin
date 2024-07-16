"use client";
import React, { useState } from "react";
import { CollectionType } from "@/lib/types";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, collections, value, onChange, onRemove }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) => collections.find((collection) => collection.id === id)) as CollectionType[];
  }

  const selectables = collections.filter((collection) => !selected.includes(collection));

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border border-b-0 rounded-md">
        {selected.map((collection) => (
          <Badge key={collection.id}>
            {collection.title}
            <button onClick={() => onRemove(collection.id)} className="ml-1 hover:text-red-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <CommandInput
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputValue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <CommandItem
                key={collection.id}
                onMouseDown={(evt) => evt.preventDefault()}
                onSelect={() => {
                  onChange(collection.id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
