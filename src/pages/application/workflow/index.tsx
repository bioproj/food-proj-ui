import type { MyPageTableOptions } from '@/components/business/page';
import type { Application } from '@/interface/business';
import type { FC } from 'react';

import { Space, Tag } from 'antd';

import { applicationPageApi } from '@/api/application';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';

const tableColums: MyPageTableOptions<Application> = [
  {
    title: 'Name',
    children: [
      { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
      { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    ],
  },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags, record) => (
      <>
        {record.tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <MyButton type="text">Invite {record.lastName}</MyButton>
        <MyButton type="text">Delete</MyButton>
      </Space>
    ),
  },
];

const BusinessBasicPage: FC = () => {
  return <MyPage pageApi={applicationPageApi} tableOptions={tableColums}></MyPage>;
};

export default BusinessBasicPage;
