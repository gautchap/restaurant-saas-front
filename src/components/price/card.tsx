"use client";

import type { Product } from "@/types/productSchema";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Card({ product }: { product: Product }) {
    return (
        <>
            <CardContainer>
                <CardBody className="group/card relative aspect-square size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 transition-shadow duration-500 hover:shadow-lg dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[25rem]">
                    <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                        Make things float in air
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                    >
                        Hover over this card to unleash the power of CSS perspective
                    </CardItem>
                    <CardItem translateZ="100" className="mt-4 w-full">
                        <img
                            src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg"
                            height="240"
                            width="430"
                            className="h-60 w-full rounded-xl object-cover transition-all duration-300 group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <div className="mt-20 flex items-center justify-between">
                        <CardItem
                            translateZ={40}
                            // className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                        >
                            <span className="text-xs font-normal transition-all">
                                {formatCurrency(product.price / 100)}
                            </span>
                        </CardItem>
                        <CardItem translateZ={40} className="transition-all group-hover/card:shadow-xl">
                            <Button asChild>
                                <a href={product.link}>Get Started</a>
                            </Button>
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
        </>
    );
}
