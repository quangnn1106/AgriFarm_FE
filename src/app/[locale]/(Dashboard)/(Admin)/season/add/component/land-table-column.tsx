import { Radio, Table, TableColumnProps, TableColumnsType } from "antd";
import { Land } from "../../models/season-model";

export const LandColumns: TableColumnsType<Land> = [
    {
        title: 'ID',
        dataIndex: 'id',
        hidden: true
    },
    {
        title: 'Land Name',
        dataIndex: 'name',
        width: 'max-content',
    },
    {
        title: 'Square',
        dataIndex: 'square',
        width: 'max-content',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: 'max-content',
    },
    {
        title: 'History',
        dataIndex: 'history',
        width: 'max-content',
    }
];

// interface TableComponentProps {
//     loading: boolean,
//     data: Land[];
// }

// const rowSelection = {
    
// };
  
// const ListLandTable: React.FC<TableComponentProps> = ({data, loading}) => {

//     return (
//       <Table
//         dataSource={data}
//         columns={LandAndRiceVarietyColumns}
//         loading={loading}
//         rowSelection={{
//           type: 'checkbox'
//         }}
//         pagination={false}
//         rowKey='id'
//       ></Table>
//     );
// };
// export default ListLandTable;
