'use client';
import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Flex,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
  TableProps,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import TrainingContentDetail from '../TrainingContentDetail/trainingContentDetail';
import CreateTrainingContent from '../CreateTrainingContent/createTrainingContent';
import UpdateTrainingContent from '../UpdateTrainingContent/updateTrainingContent';
import TrainingContentModal from '../TrainingContentDetail/trainingContentModal';
import loading from '@/app/[locale]/loading';
import Link from 'next/link';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { getPaginationResponse } from '@/utils/paginationHelper';
import { getTrainingContentsService } from '@/services/Admin/Training/trainingContentService';
import { GiEntangledTyphoon } from 'react-icons/gi';

interface IProps {}

export default function TrainingContentList(props: IProps) {
  const [selectedContent, setSelectedContent] = useState<TrainingContent | null>(null);
  const [contents, setContents] = useState<TrainingContent[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState(true);
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 10,
    TotalCount: 1,
    TotalPages: 1
  });
  const [loading, setLoading] = useState(false);
  const http = UseAxiosAuth();

  useEffect(() => {
    let l: TrainingContent[] = [];
    for (let i = 0; i < 10; i++) {
      l.push({
        content: 'content 0' + i,
        id: 'id_0' + i,
        title: 'title_0' + i
      });
    }
    if (initLoading) {
      getTrainingContentsService(http, page.CurrentPage)
        .then(res => {
          setPage(getPaginationResponse(res));
          return res.data.data as TrainingContent[];
        })
        .then(res => {
          setInitLoading(false);
          setContents([...l, ...res]);
        });
    }
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    // setList(
    //   data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    // );
    const nextPage =
      page.CurrentPage + 1 > page.TotalPages ? page.TotalPages : page.CurrentPage + 1;
    getTrainingContentsService(http, nextPage)
      .then(res => {
        const rsPage = getPaginationResponse(res);
        setPage(rsPage);
        return res.data.data as TrainingContent[];
      })
      .then(body => {
        setContents([...contents, ...body]);
        setLoading(false);
      });
  };

  const loadMore =
    !initLoading && !loading && contents.length < page.TotalCount ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const renderContentListSection = () => {
    return (
      <>
        <>
          <List
            style={{
              overflow: 'auto',
              height: '100%',
              width: '100%',
              marginLeft: 10
            }}
            loading={initLoading}
            itemLayout='horizontal'
            loadMore={loadMore}
            dataSource={contents}
            renderItem={content => (
              <List.Item actions={[<a key='list-loadmore-more'>more</a>]}>
                <Skeleton
                  avatar
                  title={false}
                  loading={loading}
                  active
                >
                  <Row
                    gutter={16}
                    style={{ width: '100%' }}
                    justify='space-between'
                  >
                    <Col span={6}>
                      <Avatar
                        size={50}
                        shape='square'
                      />
                    </Col>
                    <Col span={16}>
                      <Flex
                        vertical
                        justify='start'
                        style={{ paddingTop: 10 }}
                        align='center'
                      >
                        <Typography.Text strong>
                          <a onClick={() => setSelectedContent(content)}>
                            {content.title}
                          </a>
                        </Typography.Text>
                      </Flex>
                    </Col>
                    <Col span={2}></Col>
                  </Row>
                </Skeleton>
              </List.Item>
            )}
          />
          {!initLoading && contents && contents.length === 0 && (
            <Flex justify='center'>Nothing to display add more!</Flex>
          )}
        </>
      </>
    );
  };

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Training Contents</Typography.Title>
      </Divider>
      <Flex
        style={{ width: '100%', paddingInline: '3vw' }}
        justify='space-between'
      >
        <Col span={15}>
          <Flex
            //style={{width:'100%'}}
            vertical
            align='center'
          >
            <Descriptions title='Preview' />
          </Flex>
          <div
            style={{
              width: '100%',
              minHeight: 600,
              height: '60vh',
              border: '1px solid black',
              borderRadius: 15,
              overflow: 'auto',
              padding:20
            }}
          >
            
              
            
            {!selectedContent ?(
              <>
                <Flex
                  vertical
                  align='center'
                  justify='center'
                  style={{ height: '100%' }}
                >
                  <Typography.Text
                    italic
                    type='secondary'
                  >
                    Choose a content to preview!
                  </Typography.Text>
                </Flex>
              </>
            ):(
              <Flex
                vertical
              >
                <span>Ok Content: {selectedContent.title}</span>
              </Flex>
            )}
          </div>
        </Col>
        <Col span={7}>
          <Space
            //style={{width:'100%'}}

            align='center'
          >
            <Descriptions title='Content' />
          </Space>
          <Flex
            vertical
            align='center'
            style={{
              width: '100%',
              border: '1px solid black',
              borderRadius: 15,
              padding: 20,
              height: 400
            }}
          >
            {renderContentListSection()}
          </Flex>
        </Col>
      </Flex>
    </>
  );
}
