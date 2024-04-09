import { Expert } from '@/services/Admin/Training/response/training.response';
import { Flex, Typography, Col, Avatar, Row, Descriptions, Divider } from 'antd';
import { useEffect } from 'react';

interface IProps {
  expert: Expert;
}

export default function ExpertInfo(props: IProps) {
  const { expert } = props;
  const renderProfileSection = () => {
    return (
      <>
        <Flex>
          <Typography.Title level={3}>Preview</Typography.Title>
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
            height: '60vh',
            overflowY: 'auto'
          }}
        >
          {!!expert ? (
            <>
              <Flex justify='space-between'>
                <Col span={10}>
                  <Avatar
                    shape='square'
                    alt='avatar'
                    src='#'
                    size={150}
                  />
                </Col>

                <Col span={10}>
                  <Row
                    gutter={[16, 16]}
                    style={{ height: '80%' }}
                  >
                    <Col>
                      <Descriptions title='Name' />
                      {expert.fullName}
                    </Col>
                    <Col>
                      <Descriptions title='Expert' />
                      {expert.expertField}
                    </Col>
                  </Row>
                </Col>
              </Flex>
              <Row gutter={[16, 16]}>
                <Divider></Divider>

                <Col>
                  <Descriptions title='Description' />
                  {expert.description ?? 'No thing to display'}
                </Col>

                <Col>
                  <Descriptions title='Certificates'></Descriptions>
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
      </Flex>
    </>
  );
}
