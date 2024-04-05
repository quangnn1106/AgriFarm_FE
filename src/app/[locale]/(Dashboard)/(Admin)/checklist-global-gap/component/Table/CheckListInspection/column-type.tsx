import { Button, Dropdown, MenuProps, Modal, Space, TableColumnsType, Tag } from "antd";
import {
  CheckCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
import { useTranslations } from "next-intl";
import { ChecklistMappingDef } from "../../../models";
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import { CHECKLIST_IMPLEMENT } from "@/constants/routes";
const CheckListInspectionTableColumn = () => {
  const tLbl = useTranslations('Services.Checklist.label');
  const tMsg = useTranslations('Services.Checklist.message');
  const tCom = useTranslations('common');
  const router = useRouter();
  const pathName = usePathname();

  const CheckListInspectionTableColumn: TableColumnsType<ChecklistMappingDef> = [
    {
        title: '#',
        dataIndex: 'no',
        width: '5%',
    },
    {
        title: tLbl('checklist_name'),
        render: (_,checklist) => (
          checklist.checklistName
        )
    },
    {
        title: tLbl('checklist_start_date'),
        // dataIndex: 'startDate',
        width: '15%',
        render: (_, item) => {
          if (item.startDate) {
            const date = new Date(item.startDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
      }
    },
    {
        title: tLbl('checklist_end_date'),
        // dataIndex: 'endDate',
        width: '15%',
        render: (_, item) => {
          if (item.endDate) {
            const date = new Date(item.endDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
      }
    },
    {
        title: tLbl('checklist_status'),
        width: '15%',
        render: (_,checklist) => {
            if (checklist.status == 1) {
                return (<Tag icon={<SyncOutlined spin={false}/>} color="processing">{tLbl('in_progress')}</Tag>)
            } else if (checklist.status == 2) {
                return (<Tag icon={<CheckCircleOutlined />} color="success">{tLbl('done')}</Tag>)
            } else {
              return (<Tag icon={<CloseCircleOutlined />} color="error">{tLbl('not_yet')}</Tag>)
            }
        }
    },
    {
        title: tLbl('checklist_create_date'),
        // dataIndex: 'createdDate',
        width: '15%',
        render: (_, item) => {
          const date = new Date(item.createdDate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
      }
    },
    {
        title: '',
        width: '5%',
        render: (_,item) => {
            const renderItems = (
                id: string
            ): MenuProps['items'] => {
                return [
                    {
                        label: (
                            <a
                                onClick={() => {
                                    router.push(`${CHECKLIST_IMPLEMENT}/${id}`);
                                }}
                            >
                                <Space>
                                <ExclamationCircleOutlined /> {tCom('btn_detail')}
                                </Space>
                            </a>
                        ),
                        key: '0'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        label: (
                            <a
                            onClick={() => {
                                // router.push(`${pathName}/update/${id}`);
                            }}
                            >
                            <Space>
                                <EditOutlined /> {tCom('btn_edit')}
                            </Space>
                            </a>
                        ),
                        key: '1'
                    }
                ];
            };
            return (
                <Dropdown
                    menu={{
                    items: renderItems(
                        item.key!
                    )
                    }}
                    key={item.id}
                >
                    <a onClick={e => e.preventDefault()} key={item.id}>
                        <Space>
                        <Button
                            type='text'
                            icon={<EllipsisOutlined />}
                        ></Button>
                        </Space>
                    </a>
                </Dropdown>
            )
        }
    }
  ]
  return CheckListInspectionTableColumn;
}

export default CheckListInspectionTableColumn;
