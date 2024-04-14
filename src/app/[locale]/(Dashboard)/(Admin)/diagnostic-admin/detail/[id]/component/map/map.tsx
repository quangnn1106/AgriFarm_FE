import classNames from 'classnames/bind';
import styles from '../../../../diagnostic/disease.module.scss';

const MapComponent = () => {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('flex-center')} style={{height: '200px', width: '500px'}}>
            <div>Mappppppppp</div>
        </div>
    );
};

export default MapComponent;
