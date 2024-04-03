import type { PageData } from '@/interface';
import type { Application } from '@/interface/business';

import { request } from './request';

export const applicationPageApi = (params: any) => request<PageData<Application>>('get', '/pipeline/application/page', params);
