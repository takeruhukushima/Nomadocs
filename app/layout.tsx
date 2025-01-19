'use client';

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MainContent } from "@/components/main-content";
import { getContentTree } from "@/lib/get-content-tree";
import type { DirectoryItem } from "@/lib/get-content-tree";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [tree, setTree] = useState<DirectoryItem[]>([]);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch('/api/content-tree')
      .then((res) => res.json())
      .then(setTree);
  }, []);

  const toggleLeftSidebar = useCallback(() => {
    setIsLeftSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleRightSidebar = useCallback(() => {
    setIsRightSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <LeftSidebar
              tree={tree}
              isCollapsed={isLeftSidebarCollapsed}
              onCollapse={toggleLeftSidebar}
              className="md:block"
            />
            <main className={cn(
              "flex-1 overflow-auto transition-all duration-300",
              isLeftSidebarCollapsed ? "md:ml-0" : "md:ml-64",
              isRightSidebarCollapsed ? "md:mr-0" : "md:mr-64"
            )}>
              <MainContent>{children}</MainContent>
            </main>
            <RightSidebar
              isCollapsed={isRightSidebarCollapsed}
              onCollapse={toggleRightSidebar}
              className="md:block"
            />
          </div>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
