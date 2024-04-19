import { useRouter } from '@/navigation';
import { Expert } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { HomeOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Flex,
  Typography,
  Col,
  Avatar,
  Row,
  Descriptions,
  Divider,
  Button,
  Breadcrumb,
  ConfigProvider,
  Form,
  Input,
  Table,
  TableProps,
  Space
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface IProps {
  expert: Expert;
}

export default function ExpertInfo(props: IProps) {
  const { expert } = props;
  const farmRouter = useRouter();

  const http = UseAxiosAuth();

  const columns: TableProps<{name: string, reference: string}>['columns'] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      // width: '30%',
      render: (_, e) => (
        <Flex>{e.name}</Flex>
      )
    },
    {
      title: 'Liên kết',
      dataIndex: 'url',
      key: 'name',
      // width: '30%',
      render: (_, e) => (
        <Flex>{e.reference??"Trống"}</Flex>
      )
    }
  ];

  const certSection = (
    <div
      style={{
        //height: '50vh',
        marginTop: 30,
        width: '100%'
      }}
    >
      <Descriptions title='Chứng nhận' />

      <Table
        dataSource={expert.certificates}
        columns={columns}
        pagination={false}
        scroll={{y:300}}

      ></Table>
    </div>
  );

  const renderProfileSection = () => {
    return (
      <>
        <Flex>
          <Typography.Title level={3}>Chi tiết</Typography.Title>
        </Flex>
        {/* <div style={{}}> */}
        <Flex
          vertical
          align='center'
          style={{
            //margin: 20,
            border: '1px solid black',
            padding: 20,
            borderRadius: 20,
            paddingTop: 40,

            //marginTop: 20,
            height: '80vh',
            overflowY: 'auto'
          }}
        >
          {!!expert ? (
            <>
              <Flex justify='center'>
                <Col
                  offset={2}
                  span={8}
                >
                  <Avatar
                    shape='square'
                    alt='avatar'
                    src='https://cdn.vectorstock.com/i/preview-1x/77/22/farmer-avatar-icon-vector-32077722.jpg'
                    //src='https://www.caseyprinting.com/hs-fs/hubfs/the-expert.png?width=600&name=the-expert.png'
                    size={350}
                  />
                </Col>

                <Col
                  offset={2}
                  span={10}
                >
                  <Row
                    gutter={[16, 16]}
                    style={{ height: '80%', marginTop: '5vh' }}
                  >
                    <Col>
                      <Descriptions title='Tên' />
                      {expert.fullName}
                    </Col>
                    <Col>
                      <Descriptions title='Lĩnh vực chuyên môn' />
                      {expert.expertField}
                    </Col>
                  </Row>
                </Col>
              </Flex>
              <Row gutter={[16, 16]}>
                <Divider></Divider>

                <Col
                  offset={2}
                  span={20}
                >
                  <Descriptions title='Mô tả' />
                  {expert.description ?? 'No thing to display'}
                  {/* Là một kỹ sư nông nghiệp, bạn sẽ phụ trách những công việc chính sau
                  đây: Chăm sóc cây trồng, vật nuôi, kiểm tra chất lượng chăm sóc và điều
                  kiện sống của chúng, đảm bảo môi trường nuôi dưỡng và phát triển đạt
                  tiêu chuẩn. Đánh giá chất lượng cây trồng, vật nuôi để đảm bảo chất
                  lượng và năng suất sản phẩm. */}
                </Col>

                <Col
                  offset={2}
                  span={20}
                >
                  {/* {certSection} */}
                </Col>
              </Row>
            </>
          ) : (
            <div>
              <Typography.Text
                italic
                type='secondary'
              >
                Select an expert profile to preview
              </Typography.Text>
            </div>
          )}
        </Flex>
        {/* </div> */}
      </>
    );
  };

  return (
    <>
      <Flex
        vertical
        style={{
          width: '60vw'
        }}
      >
        {renderProfileSection()}
        <Flex
          style={{ marginTop: 20, paddingRight: 30 }}
          justify='end'
        >
          <Button
            type='primary'
            onClick={() => farmRouter.back()}
          >
            Quay lại
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
