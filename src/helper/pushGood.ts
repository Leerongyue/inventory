import {GoodsDetail} from '@/helper/type';
import dayjs from 'dayjs';

export const pushGood = (goodsList: GoodsDetail[], currentGood: GoodsDetail, amount: string) => {
  goodsList.unshift({
    ...currentGood,
    amount: parseInt(amount),
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss.000')
  });
};


