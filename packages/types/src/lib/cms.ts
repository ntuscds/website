/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    categories: Category;
    posts: Post;
    tags: Tag;
    users: User;
    media: Media;
    orders: Order;
  };
  globals: {};
}
export interface Category {
  id: string;
  name?: string;
}
export interface Post {
  id: string;
  title?: string;
  category?: string | Category;
  tags?: string[] | Tag[];
  layout?: (
    | {
        columns?: {
          width: 'oneThird' | 'half' | 'twoThirds' | 'full';
          alignment: 'left' | 'center' | 'right';
          richText?: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        media: string | Media;
        size?: 'normal' | 'wide' | 'fullscreen';
        caption?: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'media';
      }
  )[];
  slug?: string;
  status?: 'draft' | 'published';
  author?: string | User;
  publishedDate?: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Tag {
  id: string;
  name?: string;
}
export interface Media {
  id: string;
  alt?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface User {
  id: string;
  name?: string;
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Order {
  id: string;
  paymentGateway: string;
  status: '1' | '2' | '3';
  customerEmail: string;
  transactionID: string;
  orderDateTime: string;
  updatedAt: string;
  createdAt: string;
}
