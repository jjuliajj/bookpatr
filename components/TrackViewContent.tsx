"use client";

import { useEffect } from "react";
import { trackWhop } from "@/lib/whop";

interface TrackViewContentProps {
  id: string;
  title: string;
  price?: number;
  category?: string;
}

export default function TrackViewContent({ id, title, price, category }: TrackViewContentProps) {
  useEffect(() => {
    trackWhop("view_content", {
      content_id: id,
      content_name: title,
      content_category: category,
      value: price,
      currency: "USD",
    });
  }, [id, title, price, category]);

  return null;
}
