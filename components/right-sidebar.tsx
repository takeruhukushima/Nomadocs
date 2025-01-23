"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from 'lucide-react';
import { usePathname } from "next/navigation";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface RightSidebarProps {
  className?: string;
  isCollapsed: boolean;
  onCollapse: () => void;
}

export function RightSidebar({ className, isCollapsed, onCollapse }: RightSidebarProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);

  useEffect(() => {
    try {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems = Array.from(headings).map((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName[1]),
        };
      });
      setToc(tocItems);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-80px 0px -80% 0px" }
      );

      headings.forEach((heading) => observer.observe(heading));
      return () => observer.disconnect();
    } catch (error) {
      console.error("Error in RightSidebar useEffect:", error);
    }
  }, [pathname]);

  const handleCollapse = () => {
    setIsHoverEnabled(false);
    onCollapse();
    setTimeout(() => setIsHoverEnabled(true), 300);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    try {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, '', `#${id}`);
        setActiveId(id);
      } else {
        console.warn(`Target not found: ${id}`);
      }
    } catch (error) {
      console.error("Error in handleLinkClick:", error);
    }
  };

  return (
    <div className={cn("group", !isHoverEnabled && "pointer-events-none")}>
      {isCollapsed && (
        <div className="fixed right-0 top-14 w-[256px] h-[calc(100vh-3.5rem)] bg-transparent z-30 group-hover:bg-opacity-50" />
      )}
      <div
        className={cn(
          "fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-64 border-l bg-sidebar transition-all duration-300 ease-in-out z-20", 
          isCollapsed ? "translate-x-full group-hover:translate-x-0" : "translate-x-0",
          className
        )}
      >
        <div className="h-full flex flex-col">
          <div className="sticky top-0 bg-background p-4 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center">
            <div className="font-bold">On this page</div>
            <button
              onClick={handleCollapse}
              className="p-1.5 hover:bg-accent rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-auto p-4 pt-0">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block py-2 transition-transform hover:translate-y-[-1px]",
                  item.level === 1 && "pl-0",
                  item.level === 2 && "pl-4",
                  item.level === 3 && "pl-8",
                  activeId === item.id && "font-semibold text-blue-500 bg-gray-200 rounded" // 修正箇所
                )}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
