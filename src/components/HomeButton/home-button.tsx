'use client';
import classNames from "classnames"
import styles from './home-button.module.scss';
import { Button } from "antd";
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';

type Props = {};

const HomeButtonA = (props: Props) => {
    const cx = classNames.bind(styles);
    return (
        <>
        <Button
        className={cx('home-btn')}
        href='#'
      >
        <HomeOutlined />
        Farm Name
      </Button>
      </>
    );
}

export default HomeButtonA;