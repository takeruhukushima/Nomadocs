"use client"

import Link from "next/link"
import { Menu, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Nomadocs</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

