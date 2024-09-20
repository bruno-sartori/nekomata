export type LoginResponse = {
  token: string;
};

export type PendingFile = {
  name: string;
  status: 'pending' | 'success' | 'error';
  chunkNumber: number;
  totalChunks: number;
}
