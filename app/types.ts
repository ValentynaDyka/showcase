// src/types.ts

export interface BlokType {
    _uid: string;
    component: 'text' | 'heading' | 'link' | 'list' | string;
    level?: number;
    text?: string;
    url?: string;
    items?: string[];
    [key: string]: any;
  }
  