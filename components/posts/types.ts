export type StatusType = 'all' | 'draft' | 'scheduled' | 'published' | 'failed';

export interface PostsGridProps {
  search: string;
  status: StatusType;
  type: string;
}