import type { PageData } from '@/interface';
import type { BuniesssUser } from '@/interface/business';

import { request } from './request';

export const getApplication = (params: any) => request<PageData<BuniesssUser>>('get', '/pipeline/application/page', params);
