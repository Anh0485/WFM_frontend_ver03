import { ModulePermissions } from './module';

export interface BackendResponse {
  message: string;
  modules: ModulePermissions[];
}