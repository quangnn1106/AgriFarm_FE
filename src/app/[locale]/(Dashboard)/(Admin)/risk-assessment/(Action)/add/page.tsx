'use client'
import { Button, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import { ItemMode } from '../../enum';
import RiskItem from '../../components/RiskItem';
import { RiskItemDef } from '../../interface';

interface ItemContentDef {
  [key: number] : string;
}
const Add = () => {
    const [itemMode, setItemMode] = useState(1);
    // Riskitem
    const [riskItems, setRiskItems] = useState<RiskItemDef[]>([]);
    const [risItemContent, setRiskItemContent] = useState<ItemContentDef[]>([]);
    const onChange = (indexItem: number, value: number) => {
      
      riskItems[indexItem].riskItemType = value;
      setRiskItems(riskItems);
    };
    const handleRiskItems = (
        indexItem: number,
        index: number,
        value: string
      ) => {

      let riskItemContent = JSON.parse(riskItems[indexItem].riskItemContent);
      riskItemContent = {...riskItemContent, [index]: value};
      riskItems[indexItem].riskItemContent = JSON.stringify(riskItemContent);
      setRiskItems(riskItems);
      // console.log(index,value);
      // setRiskItemContent(prevState => {
      //     // Kiểm tra xem index đã tồn tại trong risItemContent chưa
      //     if (prevState[index] !== undefined) {
      //         // Nếu index đã tồn tại, cập nhật giá trị tại index đó
      //         return {...prevState, [index]: value};
      //     } else {
      //         // Nếu index chưa tồn tại, thêm một dòng mới với số index và giá trị tương ứng
      //         return {...prevState, [index]: value};
      //     }
      // });
    }
    const handleRiskItemsTitle = (
      indexItem: number,
      value: string
    ) => {
      riskItems[indexItem].riskItemTitle = value;
      setRiskItems(riskItems);
    }
    const handleOnclickBtn = () => {
      // console.log(riskItems);
      console.log(riskItems);
    }
    
    const handleAddItem = () => {
      if (riskItems.length > 5) {
        return;
      }
      const newItem = [...riskItems];
      newItem.push({
          riskItemTitle: "",
          riskItemType: 1,
          riskItemContent: JSON.stringify(risItemContent),
          must: 1,
          riskItemDiv: 1
        });
      setRiskItems(newItem);
    };
    const handleDeleteItem = (indexToRemove: number) => {
      const newItem = riskItems.filter((_, index) => index !== indexToRemove);
      setRiskItems(newItem);
    }
  return(
    <>
        <div>RiskAssessemnt Add</div>
        <Button onClick={handleOnclickBtn}>TestConsole</Button>
        <Button onClick={handleAddItem}>CreateNewItem++</Button>
        {riskItems.map((_, index) => {
          return (
              <RiskItem 
                key={index}
                indexItem={index}
                onRadioChange={onChange}
                itemMode={riskItems[index].riskItemType}
                handleRiskItems={handleRiskItems}
                handleDeleteItem={handleDeleteItem}
                handleRiskItemsTitle={handleRiskItemsTitle}
              />
          )
        })}
    </>
  )
}

export default Add;
