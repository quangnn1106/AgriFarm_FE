import { useRouter } from '@/navigation';
import { Expert } from '@/services/Admin/Training/response/training.response';
import { Flex, Typography, Col, Avatar, Row, Descriptions, Divider, Button } from 'antd';
import { useEffect } from 'react';

interface IProps {
  expert: Expert;
}

export default function ExpertInfo(props: IProps) {
  const { expert } = props;
  const farmRouter = useRouter();
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

            //marginTop: 20,
            height: '80vh',
            overflowY: 'auto'
          }}
        >
          {!!expert ? (
            <>
              <Flex justify='space-between'>
                <Col
                  offset={2}
                  span={10}
                >
                  <Avatar
                    shape='square'
                    alt='avatar'
                    src='https://www.caseyprinting.com/hs-fs/hubfs/the-expert.png?width=600&name=the-expert.png'
                    size={300}
                  />
                </Col>

                <Col span={10}>
                  <Row
                    gutter={[16, 16]}
                    style={{ height: '80%' }}
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
                </Col>

                <Col
                  offset={2}
                  span={20}
                >
                  <Descriptions title='Chứng chỉ'></Descriptions>
                  {expert.certificates?.map((e, i) => (
                    <Row key={i}>
                      <Col span={12}>
                        - <a href={e.reference}>{e.name}</a>
                      </Col>
                    </Row>
                  ))}
                  {!expert.certificates ||
                    (expert.certificates.length === 0 && (
                      <span>No certificate to display</span>
                    ))}

                  {Array.from({ length: 4 }, (_, i) => {
                    return (
                      <Row key={i}>
                        <Col span={12}>
                          - <a href={'#'}>Chứng chỉ GAP 0{i + 1}</a>
                        </Col>
                      </Row>
                    );
                  })}
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
