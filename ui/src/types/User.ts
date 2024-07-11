interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  installed: boolean;
  language: string;
  status: string;
  video: Blob | undefined;
}
