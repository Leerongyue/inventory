type GoodsDetail = {
  barcode: string;
  createdate: string;
  goodsname: string;
  py: string;
  retailprice: number;
  spec: string;
  stocknum: number;
  unitname: string;
}
type Goods = {
  infodata: GoodsDetail;
}

export {Goods, GoodsDetail};