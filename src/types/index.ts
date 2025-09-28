interface Section {
  content_id: string,
  created_at: string,
  id: string,
  markdown: string,
  name: string,
  updated_at: string,
  vidurl: string,
};

export interface Item {
  message: string;
  content: {
    id: string,
    name: string,
    created_at: string,
  }[],
  sections: Section[];
}

export interface ItemsState {
  items: Section[];
  loading: boolean;
  error: string | null;
}