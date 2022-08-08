import React, { cloneElement, isValidElement, useMemo } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Text } from '@/components';

type Align = 'left' | 'right' | 'center';

export type DataItemBase = {
  /** 唯一键 */
  key: string;
} & Record<string, unknown>;

export interface Column<DataItem extends DataItemBase> {
  /** 列头名称 */
  title: React.ReactNode;
  /** 唯一键 */
  key: string;
  /** 列单元样式 */
  width?: ViewStyle['flexBasis'];
  /** 设置列的对齐方式	 */
  align?: 'left' | 'right' | 'center';
  /** 列单元样式 */
  style?: ViewStyle;
  /** 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 */
  render?(text: unknown, record: DataItem, index: number): React.ReactNode;
}

interface Props<DataItem extends DataItemBase> {
  /** 列信息 */
  columns: Column<DataItem>[];
  /** 数据源 */
  data: DataItem[];
  /** 覆盖表格样式 */
  style?: ViewStyle;
}

const alignMap: Record<Align, ViewStyle['justifyContent']> = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export function Table<DataItem extends DataItemBase>(props: Props<DataItem>) {
  const { columns, data, style } = props;
  const columnMap = useMemo(
    () =>
      columns.reduce(
        (acc, col) => ((acc[col.key] = col), acc),
        {} as Record<string, Column<DataItem>>,
      ),
    [columns],
  );

  const thead = useMemo(
    () => (
      <View style={[styles.thead]}>
        {columns.map(col => (
          <View
            key={col.key}
            style={[
              styles.th,
              {
                flexBasis: col.width || 'auto',
                justifyContent: alignMap[col.align!],
              },
            ]}>
            {isValidElement(col.title) ? (
              cloneElement(col.title, { ...col.title, key: col.key })
            ) : (
              <Text color="#fff" height={20} size={15}>
                {col.title}
              </Text>
            )}
          </View>
        ))}
      </View>
    ),
    [columns],
  );

  const tbody = useMemo(
    () => (
      <View style={styles.tbody}>
        {data.map((item, idx) => (
          <View key={item.key ?? idx} style={styles.tr}>
            {columns.map(col => {
              const colItem = (
                typeof col.render === 'function'
                  ? col.render(item[col.key], item, idx)
                  : item[col.key]
              ) as React.ReactNode;

              return (
                <View
                  key={col.key}
                  style={[
                    styles.td,
                    columnMap[col.key].style,
                    {
                      flexBasis: col.width || 'auto',
                      justifyContent: alignMap[col.align!],
                    },
                  ]}>
                  {isValidElement(colItem) ? (
                    colItem
                  ) : (
                    <Text size={15} height={18}>
                      {colItem}
                    </Text>
                  )}
                </View>
              );
            })}
            <View style={styles.lineBorder} />
          </View>
        ))}
      </View>
    ),
    [columns, columnMap, data],
  );

  return (
    <View style={[styles.table, style]}>
      {thead}
      {tbody}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  thead: {
    flexDirection: 'row',
    backgroundColor: '#32ADE6',
    paddingVertical: 4,
    paddingHorizontal: 8.5,
  },
  th: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
  },
  tbody: {},
  tr: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8.5,
  },
  td: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
  },
  lineBorder: {
    position: 'absolute',
    left: 8.5,
    right: 8.5,
    bottom: 0,
    backgroundColor: '#E5E5EA',
    height: 1,
  },
});

export default Table;
