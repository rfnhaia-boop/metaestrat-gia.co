export type TemplateType = 'Cover' | 'Text' | 'List' | 'Matrix' | 'Flow' | 'Journey' | 'TableOfContents';

export type BlockType = 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'table_row' | 'data_point';

export type ContentBlock = {
  id: string;
  type: BlockType;
  content: string | string[] | Record<string, string>;
  metadata?: Record<string, any>;
};

export type AudioSource = {
  url: string;
  duration: number; // in seconds
};

export type EditorialSection = {
  id: string;
  number: string;
  title: string;
  blocks: ContentBlock[];
  preferredTemplate?: TemplateType;
  manualBreaks?: string[]; // IDs of blocks where a break must happen before
  audio?: AudioSource;
};

export type EditorialDocument = {
  id: string;
  version: string;
  client: string;
  date: string;
  scope: string;
  sections: EditorialSection[];
};
