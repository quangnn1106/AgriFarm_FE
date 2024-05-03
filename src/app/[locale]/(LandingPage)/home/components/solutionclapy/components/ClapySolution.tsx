'use client';
import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.scss';
import { Fi5Icon } from './_5Icon';
import classes from './Counts.module.scss';
import { CovidPersonalHygieneHandSaniti } from './CovidPersonalHygieneHandSaniti';
import { FluentFoodGrains24RegularIcon } from './FluentFoodGrains24RegularIcon';
import { FluentStatus12RegularIcon } from './FluentStatus12RegularIcon';
import { FrameIcon } from './FrameIcon';
import { GameIconsEggDefenseIcon } from './GameIconsEggDefenseIcon';
import { GravityUiFaceSadIcon } from './GravityUiFaceSadIcon';
import { GroupIcon } from './GroupIcon';
import { IconParkOutlineBalanceIcon } from './IconParkOutlineBalanceIcon';
import { MaterialSymbolsNoFoodOutlineIc } from './MaterialSymbolsNoFoodOutlineIc';
import { MdiFarmHomeOutlineIcon } from './MdiFarmHomeOutlineIcon';
import { MdiWorkflowOutlineIcon } from './MdiWorkflowOutlineIcon';
import { MingcuteWastebasketLineIcon } from './MingcuteWastebasketLineIcon';
import { PhBowlFoodBoldIcon } from './PhBowlFoodBoldIcon';
import { TdesignUserTalkIcon } from './TdesignUserTalkIcon';
import { UilMoneyWithdrawIcon } from './UilMoneyWithdrawIcon';
import { VectorIcon } from './VectorIcon';

interface Props {
  className?: string;
}
/* @figmaId 5:20778 */
export const ClapySolution: FC<Props> = memo(function ClapySolution(props = {}) {
  return (
    <div
      id='clapy_solution'
      className={`${resets.clapyResets} ${classes.root}`}
    >
      <div className={classes.sectionHeading}>
        <div className={classes.sectionTitle}>Giải pháp của chúng tôi</div>
        <div className={classes.description}>Những điểm của tiêu chuẩn GlobalG.A.P</div>
      </div>

      <div className={classes.row1}>
        <div className={classes._2}>
          <div className={classes.mdiFarmHomeOutline}>
            <MdiFarmHomeOutlineIcon className={classes.icon} />
          </div>
          <div className={classes.details}>
            <div className={classes.number}>
              <div className={classes.textBlock}>Lịch sử trang trại &amp; </div>
              <div className={classes.textBlock2}>Quản lý trang trại</div>
            </div>
          </div>
        </div>
        <div className={classes._1}>
          <div className={classes.vector}>
            <VectorIcon className={classes.icon2} />
          </div>
          <div className={classes.details2}>
            <div className={classes.number2}>
              <div className={classes.textBlock3}>Sức khỏe người lao động, </div>
              <div className={classes.textBlock4}>hồ sơ an toàn &amp; phúc lợi</div>
            </div>
          </div>
        </div>
        <div className={classes._3}>
          <div className={classes.phBowlFoodBold}>
            <PhBowlFoodBoldIcon className={classes.icon3} />
          </div>
          <div className={classes.details3}>
            <div className={classes.number3}>
              <div className={classes.textBlock5}>An toàn thực phẩm</div>
              <div className={classes.textBlock6}>khai báo chính sách</div>
            </div>
          </div>
        </div>
        <div className={classes.fluentStatus12Regular}>
          <FluentStatus12RegularIcon className={classes.icon4} />
        </div>
        <div className={classes._4}>
          <div className={classes.details4}>
            <div className={classes.number4}>Trạng thái GlobalG.A.P</div>
          </div>
        </div>
      </div>
      <div className={classes.row2}>
        <div className={classes._22}>
          <div className={classes.frame}>
            <FrameIcon className={classes.icon5} />
          </div>
          <div className={classes.details5}>
            <div className={classes.number5}>
              <div className={classes.textBlock7}>Lưu trữ hồ sơ &amp; </div>
              <div className={classes.textBlock8}>Đánh giá nội bộ</div>
            </div>
          </div>
        </div>
        <div className={classes._12}>
          <div className={classes.uilMoneyWithdraw}>
            <UilMoneyWithdrawIcon className={classes.icon6} />
          </div>
          <div className={classes.details6}>
            <div className={classes.number6}>Thu hồi/Quy trình thu hồi</div>
          </div>
        </div>
        <div className={classes.materialSymbolsNoFoodOutline}>
          <MaterialSymbolsNoFoodOutlineIc className={classes.icon7} />
        </div>
        <div className={classes._32}>
          <div className={classes.details7}>
            <div className={classes.number7}>
              <div className={classes.textBlock9}>Sự giảm thiểu </div>
              <div className={classes.textBlock10}>Thực phẩm bẩn</div>
            </div>
          </div>
        </div>
        <div className={classes.gameIconsEggDefense}>
          <GameIconsEggDefenseIcon className={classes.icon8} />
        </div>
        <div className={classes._42}>
          <div className={classes.details8}>
            <div className={classes.number8}>Bảo vệ thực phẩm</div>
          </div>
        </div>
      </div>
      <div className={classes.row6}>
        <div className={classes._23}>
          <div className={classes.mingcuteWastebasketLine}>
            <MingcuteWastebasketLineIcon className={classes.icon9} />
          </div>
          <div className={classes.details9}>
            <div className={classes.number9}>
              Chất thải và ô nhiễm &amp; tái chế &amp; tái sử dụng
            </div>
          </div>
        </div>
        <div className={classes._13}>
          <div className={classes.mdiWorkflowOutline}>
            <MdiWorkflowOutlineIcon className={classes.icon10} />
          </div>
          <div className={classes.details10}>
            <div className={classes.number10}>Truy xuất nguồn gốc &amp; phân biệt</div>
          </div>
        </div>
        <div className={classes._33}>
          <div className={classes.fluentFoodGrains24Regular}>
            <FluentFoodGrains24RegularIcon className={classes.icon11} />
          </div>
          <div className={classes.details11}>
            <div className={classes.number11}>
              <div className={classes.textBlock11}>Các sản phẩm</div>
              <div className={classes.textBlock12}>không phù hợp</div>
            </div>
          </div>
        </div>
        <div className={classes.iconParkOutlineBalance}>
          <IconParkOutlineBalanceIcon className={classes.icon12} />
        </div>
        <div className={classes._43}>
          <div className={classes.details12}>
            <div className={classes.number12}>Cân bằng khối lượng</div>
          </div>
        </div>
      </div>
      <div className={classes.row4}>
        <div className={classes._24}>
          <div className={classes.covidPersonalHygieneHandSaniti}>
            <CovidPersonalHygieneHandSaniti className={classes.icon13} />
          </div>
          <div className={classes.details13}>
            <div className={classes.number13}>Vệ sinh</div>
          </div>
        </div>
        <div className={classes._5}>
          <div className={classes.icon14}>
            <Fi5Icon className={classes.icon15} />
          </div>
          <div className={classes.details14}>
            <div className={classes.number14}>Nhà cung cấp</div>
          </div>
        </div>
        <div className={classes._6}>
          <div className={classes.tdesignUserTalk}>
            <TdesignUserTalkIcon className={classes.icon16} />
          </div>
          <div className={classes.details15}>
            <div className={classes.number15}>Bảo tồn</div>
          </div>
        </div>
        <div className={classes._7}>
          <div className={classes.gravityUiFaceSad}>
            <GravityUiFaceSadIcon className={classes.icon17} />
          </div>
          <div className={classes.details16}>
            <div className={classes.number16}>Khiếu nại</div>
          </div>
        </div>
        <div className={classes._8}>
          <div className={classes.group}>
            <GroupIcon className={classes.icon18} />
          </div>
          <div className={classes.details17}>
            <div className={classes.number17}>Logo sử dụng</div>
          </div>
        </div>
      </div>
    </div>
  );
});
