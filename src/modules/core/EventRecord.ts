"use client";

export interface EventMetadata {
  name: string;
  option?: any;
}

export type EventRecord = Record<string, EventMetadata | undefined>;

export type EventHandleRecord = Record<string, (() => void) | undefined>;
