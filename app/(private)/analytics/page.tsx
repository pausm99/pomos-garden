"use client";

import Section from "@/components/Section";
import { useUserContext } from "@/contexts/UserContext";
import React from "react";

export default function Page() {
  const { user } = useUserContext()
  return <Section section="stats" name={`Analytics Dashboard for ${user?.name || '...'}`} />;
}
