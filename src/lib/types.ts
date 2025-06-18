type BatchResponseTypes = {
  model?: string;
};

type ResponseTypes = {
  model: string;
  content: string;
};

type ClientTypes = {
  stream?: boolean;
};

export { ResponseTypes, BatchResponseTypes, ClientTypes };
