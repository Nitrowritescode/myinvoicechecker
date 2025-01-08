'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { RainbowButton } from "@/components/ui/rainbow-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logoinvoice.png" alt="Logo" width={40} height={40} className="size-10" />
            <h3 className="min-[484px]:text-3xl text-2xl font-semibold">
              My<span className="text-blue-500 font-playwright italic mx-1">Invoice</span>Checker
            </h3>
          </Link>
          <div className="hidden md:block">
            <Link href="/login">
              <RainbowButton>Get Started</RainbowButton>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link href="/login" className="block px-4 py-2 text-white bg-black text-center hover:bg-gray-200">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

