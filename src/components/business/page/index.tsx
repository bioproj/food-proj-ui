import type { MyAsideProps } from '../aside';
import type { MyRadioCardssOption } from '../radio-cards';
import type { MyTabsOption } from '../tabs';
import type { MyResponse } from '@/api/request';
import type { PageData } from '@/interface';
import type { ColumnsType } from 'antd/es/table/interface';

import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, useMemo } from 'react';

import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';

import MyAside from '../aside';
import MyRadioCards from '../radio-cards';
import MySearch from '../search';
// import {FormModal} from '../form/Modal';
import MyTabs from '../tabs';

interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T : S;

export type MyPageTableOptions<S> = ColumnsType<S>;
export interface PageProps<S> {
  searchRender?: React.ReactNode;
  formRender?: React.ReactNode;
  pageApi?: S;
  pageParams?: object;
  tableOptions?: MyPageTableOptions<ParseDataType<S>>;
  tableRender?: (data: MyPageTableOptions<ParseDataType<S>>[]) => React.ReactNode;
  asideData?: MyAsideProps['options'];
  asideKey?: string;
  asideValue?: string | number;
  radioCardsData?: MyRadioCardssOption[];
  radioCardsValue?: string | number;
  asideTreeItemRender?: MyAsideProps['titleRender'];
  tabsData?: MyTabsOption[];
  tabsValue?: string | number;
  onRowChange?: (selectedRowKeys: React.Key[], selectedRows: ParseDataType<S>[]) => void;
  showAside?: boolean
  searchParams?: Record<string, any>
  tableColums?: MyPageTableOptions<S>
  onDelete?: () => void
  tableColumsFlag?: string
}

export interface RefPageProps {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

const BasePage = <S extends SearchApi>(props: PageProps<S>, ref: React.Ref<RefPageProps>) => {
  const {
    pageApi,
    pageParams,
    searchRender,
    formRender,
    tableOptions,
    tableRender,
    asideKey,
    asideData,
    asideValue,
    asideTreeItemRender,
    radioCardsData,
    radioCardsValue,
    tabsData,
    tabsValue,
    onRowChange,
    showAside,
    searchParams
  } = props;
  // const [searchParamsInfo, setSearchParamsInfo] = useState<Record<string, any>>();
  // setSearchParamsInfo(searchParams)
  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    size: 20,
    number: 1,
    count: 0,
    content: [],
  });

  const [asideCheckedKey, setAsideCheckedKey] = useState(asideValue);

  useEffect(() => {
    if (asideData) {
      setAsideCheckedKey(asideData[0].key);
    }
  }, [asideData]);
  // const criteriaVos = Object.entries(params).reduce((acc: any[], [key, value]) => {
  //   if (value !== null && value !== undefined && value !== '') {
  //     acc.push({ 'name':key,'searchType':'EQUAL','searchVal':value });
  //   }
  //   return acc;
  // }, []);
  // const searchParamsObj = useMemo(() => (searchParams), [searchParams]);

  const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (asideKey && !asideCheckedKey) return;
      // if(searchParams){
      //   params={...searchParams}
      // }
      // debugger
      // console.log(searchParams)
      const criteriaVos = Object.entries(params).reduce((acc: any[], [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          acc.push({ 'name': key, 'searchType': 'EQUAL', 'searchVal': value });
        }
        return acc;
      }, []);

      // debugger
      if (pageApi) {
        const obj = {
          // ...params,
          criteriaVos,
          ...pageParams,
          size: pageData.size,
          number: pageData.number,
          [asideKey!]: asideCheckedKey,
        };
        const res = await pageApi(obj);

        if (res.code) {
          setPageData({ count: res.data.count, content: res.data.content });
        }
      }
    },
    [pageApi, JSON.stringify(searchParams), pageParams, pageData.size, pageData.number, asideKey, asideCheckedKey],
  );
  useEffect(() => {

    getPageData(searchParams);
  }, [getPageData]);

  const onSearch = (searchParams: Record<string, any>) => {
    // debugger
    // setPageData({ number:1 });
    getPageData(searchParams);

  };

  const onSelectAsideTree: MyAsideProps['onSelect'] = ([key]) => {
    setAsideCheckedKey(key);
  };

  const onPageChange = (number: number, size?: number) => {
    setPageData({ number });
    if (size) {
      setPageData({ size });
    }
  };

  useImperativeHandle(ref, () => ({
    setAsideCheckedKey,
    load: (data?: object) => getPageData(data),
    reload: () => getPageData(searchParams),
  }));

  // const onRowChangea =  (selectedRowKeys: React.Key[], selectedRows: ParseDataType<S>[]) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  // }
  return (
    <div css={styles}>
      {tabsData && <MyTabs className="tabs" options={tabsData} defaultValue={tabsData[0].value || tabsValue} />}
      <div className="tabs-main">
        {/* {formRender && (
          <FormModal className="search" onSearch={onSearch}>
            {formRender}
          </FormModal>
        )} */}

        {showAside && asideData && (
          <MyAside
            options={asideData}
            selectedKeys={asideCheckedKey ? [asideCheckedKey] : undefined}
            titleRender={asideTreeItemRender}
            onSelect={onSelectAsideTree}
          />
        )}
        <div className="aside-main">
          {searchRender && (
            <MySearch className="search" onSearch={onSearch}>
              {searchRender}
            </MySearch>
          )}
          {radioCardsData && (
            <MyRadioCards options={radioCardsData} defaultValue={radioCardsValue || radioCardsData[0].value} />
          )}
          {tableOptions && (
            <div className="table">
              <MyTable
                // height="100%"
                dataSource={pageData.content}
                columns={tableOptions}
                rowKey={record => record.id}
                pagination={{
                  current: pageData.number,
                  pageSize: pageData.size,
                  total: pageData.count,
                  onChange: onPageChange,
                }}
                rowSelection={
                  {
                    type: 'radio',
                    columnWidth: 48,
                    onChange: onRowChange
                  }
                }
              >
                {tableRender?.(pageData.content)}
              </MyTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BasePageRef = forwardRef(BasePage) as <S extends SearchApi>(
  props: PageProps<S> & { ref?: React.Ref<RefPageProps> },
) => React.ReactElement;

type BasePageType = typeof BasePageRef;

interface MyPageType extends BasePageType {
  MySearch: typeof MySearch;
  MyTable: typeof MyTable;
  MyAside: typeof MyAside;
}

const MyPage = BasePageRef as MyPageType;

MyPage.MySearch = MySearch;
MyPage.MyTable = MyTable;
MyPage.MyAside = MyAside;

export default MyPage;

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;
