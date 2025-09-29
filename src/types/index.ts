interface Section {
  content_id: string,
  created_at: string,
  id: string,
  markdown: string,
  name: string,
  updated_at: string,
  vidurl: string,
};

interface Content {
  id: string,
  name: string,
  description: string,
}

export interface Item {
  message: string;
  content: Content[],
  sections: Section[];
}

export interface ItemsState {
  items: Item | null;
  loading: boolean;
  error: string | null;
}