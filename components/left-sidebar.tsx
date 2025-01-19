"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft, File, Folder, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { DirectoryItem } from "@/lib/get-content-tree";
import { Button } from "@/components/ui/button";

interface LeftSidebarProps {
  className?: string;
  tree: DirectoryItem[];
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function LeftSidebar({ className, tree, isCollapsed, onCollapse }: LeftSidebarProps) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);

  const toggleDirectory = (path: string) => {
    setExpanded((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleCollapse = () => {
    setIsHoverEnabled(false);
    onCollapse();
    setTimeout(() => setIsHoverEnabled(true), 300);
  };

  const renderTree = (items: DirectoryItem[]) => {
    return items.map((item) => (
      <div key={item.path} className="ml-4">
        {item.type === "directory" ? (
          <>
            <button
              onClick={() => toggleDirectory(item.path)}
              className="flex items-center gap-2 py-2 transition-colors hover:bg-gray-100 w-full text-left"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded.includes(item.path) && "rotate-90"
                )}
              />
              <Folder className="h-4 w-4" />
              {item.name}
            </button>
            {item.children && expanded.includes(item.path) && (
              <div className="ml-2">{renderTree(item.children)}</div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={cn(
              "flex items-center gap-2 py-2 transition-colors hover:bg-blue-50",
              usePathname() === item.path && "bg-blue-50 text-blue-500 font-medium"
            )}
          >
            <File className="h-4 w-4" />
            {item.name.replace(/\.md$/, "")}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <div className={cn("group", !isHoverEnabled && "pointer-events-none")}>
      {isCollapsed && (
        <div className="fixed left-0 top-14 w-[256px] h-[calc(100vh-3.5rem)] bg-transparent z-30 group-hover:bg-opacity-50" />
      )}
      <div
        className={cn(
          "fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 border-r bg-sidebar transition-all duration-300 ease-in-out z-20", 
          isCollapsed ? "-translate-x-full group-hover:translate-x-0" : "translate-x-0",
          className
        )}
      >
        <div className="h-full flex flex-col">
          <div className="sticky top-0 bg-background p-4 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center">
            <div className="font-bold">Contents</div>
            <button
              onClick={handleCollapse}
              className="p-1.5 hover:bg-accent rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 pt-0">
            {renderTree(tree)}
          </div>
        </div>
      </div>
    </div>
  );
}
