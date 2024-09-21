export type LoginResponse = {
  token: string;
};

export type PendingFile = {
  id: string;
  name: string;
  status: 'pending' | 'success' | 'error';
  chunkNumber: number;
  totalChunks: number;
  chunkSize: number;
};
