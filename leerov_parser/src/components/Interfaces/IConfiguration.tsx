'use client';
export interface IConfiguration {
  id: number;
  name: string;
  domain: string;
  refXPath: string;
  refCSSSelector: string;
  dataStructure: Record<string, any>;
  modeChangePages: string;
  configChangePages: Record<string, any>;
}
