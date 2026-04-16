export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface CommentNode {
  id: string;
  author: string;
  text: string;
  children: CommentNode[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  imageType: 'mouse' | 'keyboard' | 'monitor';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type SortOrder = 'asc' | 'desc';

export interface TableRow {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

export interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
}