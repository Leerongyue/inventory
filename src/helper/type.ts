type GoodsDetail = {
  barcode: string;
  createdate: string;
  goodsname: string;
  py: string;
  retailprice: string;
  spec: string;
  stocknum: string;
  unitname: string;
  createdAt: string;
  amount: number;
}
type Goods = {
  infodata: GoodsDetail;
}

export {Goods, GoodsDetail};