import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { PropsWithChildren } from "react"
import { RootProvider } from "fumadocs-ui/provider"
import "@/src/ui/globals.css"

const geist = Geist({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-geist",
})

export const metadata: Metadata = {
    title: {
        default: "@halvaradop/ts-utility-types - TypeScript Utility Types Library",
        template: "%s | @halvaradop/ts-utility-types",
    },
    description:
        "A comprehensive collection of utility types to enhance productivity and improve code readability in TypeScript projects. Over 100+ type-safe utilities for arrays, objects, strings, numbers, validation, and advanced deep manipulations.",
    keywords: [
        "typescript",
        "utility types",
        "type safety",
        "typescript utilities",
        "type manipulation",
        "array types",
        "object types",
        "string types",
        "number types",
        "deep operations",
        "type guards",
        "validation",
        "compile time",
        "zero runtime",
        "type level programming",
    ],
    authors: [
        {
            name: "Hernan Alvarado",
            url: "https://github.com/halvaradop",
        },
    ],
    creator: "Hernan Alvarado",
    publisher: "Hernan Alvarado",
    category: "Developer Tools",
    classification: "TypeScript Library",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://ts-utility-types.vercel.app",
        siteName: "@halvaradop/ts-utility-types",
        title: "TypeScript Utility Types - Enhance Your TypeScript Development",
        description:
            "A powerful collection of 100+ utility types for TypeScript. Zero-runtime, type-safe operations for arrays, objects, strings, numbers, and advanced deep manipulations with excellent IntelliSense support.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "@halvaradop/ts-utility-types - TypeScript Utility Types Library",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@halvaradop",
        creator: "@halvaradop",
        title: "TypeScript Utility Types - @halvaradop/ts-utility-types",
        description:
            "100+ zero-runtime utility types for TypeScript. Enhance productivity with type-safe array, object, string, number operations and more.",
        images: ["/og-image.png"],
    },
    metadataBase: new URL("https://ts-utility-types.vercel.app"),
    alternates: {
        canonical: "/",
    },
    verification: {
        google: "your-google-verification-code",
    },
    other: {
        "github-repo": "https://github.com/halvaradop/ts-utility-types",
        "npm-package": "https://www.npmjs.com/package/@halvaradop/ts-utility-types",
    },
}

export default function RootLayout({ children }: Readonly<Required<PropsWithChildren>>) {
    return (
        <html className="scroll-smooth" lang="en" suppressHydrationWarning>
            <body className={`${geist.variable} min-h-dvh flex flex-col`}>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    )
}
