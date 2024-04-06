'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button, InputNumber, Flex} from 'antd';
import TweenOne from 'rc-tween-one';

import stylesStatCard from '../statisticsStyle.module.scss';
import classNames from 'classnames/bind';

import ChildrenPlugin from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(ChildrenPlugin);

interface NumberBlockProps {
    totalNumbers: number;
    title: string;
    color: string;
    rate: number;
    float: number;
    unit: string; 
    timeCompare: string 
}

const NumberBlock: React.FC<NumberBlockProps> = ({ totalNumbers, title, color, rate, float, unit, timeCompare }) => {

    //style
    const cx = classNames.bind(stylesStatCard);
   

    const [animation, setAnimation] = useState({ Children: { value: 0, floatLength: 2 }, duration: 0 });
    const [textSubColor, setTextSubColor] = useState<string>('');
    const [number, setNumber] = useState<string>('');

    const setColor = (rate: number) => {
        if(rate < 0) {
            setTextSubColor('#9D0208');
        } else {
            setTextSubColor('#1B7203');
            setNumber('+')

        }
    }

    useEffect(()=> {
        setColor(rate);
        setAnimation({Children: { value: totalNumbers, floatLength: float }, duration: 3000 });
    }, [totalNumbers, rate])

    return (
        <Card className={cx('statistics-card-total-number')} style={{width: '210px', background: color}}>
            <TweenOne
                animation={animation}
                style={{ fontSize: '2rem', marginBottom: 12, textAlign: 'center' }}
            >
            </TweenOne>
            <div  className='card-unit'>({unit})</div>
            
            <Flex vertical={true} >
                <span className='card-title'>{title}</span>
                <span className='card-sub-infor'  style={{color: textSubColor}} >{number}{rate}% so với {timeCompare} </span>
            </Flex>
            
        </Card>
        
    );
};

export default NumberBlock;