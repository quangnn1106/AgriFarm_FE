import { TableColumnsType } from "antd";
import { Product } from "../../../season/models/season-model";

export function ProductTableColumns() {
    const productTableColumn: TableColumnsType<Product> = [
        {
            title: '#',
            dataIndex: '',
            width: 'max-content',
            render: (_, product, index) => `${index}`
        },
        {
            title: 'Vị trí',
            dataIndex: 'land',
            width: 'max-content',

            render: (_, product) => `${product.land?.name}`
        },
        {
            title: 'Mùa vụ',
            dataIndex: 'season',
            width: 'max-content',
            render: (_, product) => `${product.season?.title}`
        },
        {
            title: 'Giống lúa',
            dataIndex: 'seed',
            width: 'max-content',
            render: (_, product) => `${product.seed?.name}`
        },
        {
            title: 'Tổng sản lượng (tấn)',
            dataIndex: 'totalQuantity',
            width: 'max-content',
        },
        {
            title: 'Năng suất',
            dataIndex: 'currentQuanlity',
            width: 'max-content',
        }
    ];
    
    return productTableColumn;
}