export interface Credential {
  id: string;
  platformName: string;
  login: string;
  email: string | null;
  link: string | null;
  description: string | null;
  createdAt: string;
}
