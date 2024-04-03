import type { PageData } from '@/interface';

export const getTableData = <T extends any[]>(number = 1, size = 10, totalData: T) => {
  const count: number = totalData.length;
  const tableData: PageData<T[0]> = {
    content: [],
    number,
    size,
    count,
  };

  if (size >= count) {
    //pageSize大于等于总数据长度，说明只有1页数据或没有数据
    tableData.content = totalData;
    tableData.number = 1; //直接取第一页
  } else {
    //pageSize小于总数据长度，数据多余1页
    const num = size * (number - 1); //计算当前页（不含）之前的所有数据总条数

    if (num < count) {
      //如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
      const startIndex = num; //当前页第一条数据在总数据集中的索引
      const endIndex = num + size - 1; //当前页最后一条数据索引

      tableData.content = totalData.filter((_, index) => index >= startIndex && index <= endIndex); //当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
    } else {
      //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
      const size_ = Math.ceil(count / size); //取商
      const rest = count % size; //取余数

      if (rest > 0) {
        //余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
        tableData.number = size + 1; //当前页码重置，取size+1
        tableData.content = totalData.filter((_, index) => index >= size_ * size_ && index <= count);
      } else if (rest === 0) {
        //余数等于0，最后一页数据条数正好是pageSize
        tableData.number = size; //当前页码重置，取size
        tableData.content = totalData.filter((_, index) => index >= size * (size_ - 1) && index <= count);
      } //注：余数不可能小于0
    }
  }

  return tableData;
};
