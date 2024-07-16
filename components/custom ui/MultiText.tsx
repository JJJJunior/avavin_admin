"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({ placeholder, value, onChange, onRemove }) => {
  const [inputValue, setInputValue] = React.useState("");
  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  const handleClickBtn = (evt: React.MouseEvent<HTMLButtonElement>, item) => {
    //在form表单内部，防止点击事件冒泡
    evt.preventDefault();
    onRemove(item);
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(evt) => setInputValue(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4 overflow-visible">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={(evt) => handleClickBtn(evt, item)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
