export type Error = {
  message: string;
  code: string;
};

export type RequestStatus = 'Init' | 'Loading' | 'Loaded' | Error;
