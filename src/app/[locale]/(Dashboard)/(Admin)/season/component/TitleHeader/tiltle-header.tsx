
import styles from '../../seasonStyle.module.scss';
import classNames from 'classnames/bind';

type Props = {
    title: string;
}

const cx = classNames.bind(styles);
const TitleHeader = (props: Props) => {
    const { title } = props;
    return <label className={cx('title-header')}> {title} </label>;
};

export default TitleHeader;
