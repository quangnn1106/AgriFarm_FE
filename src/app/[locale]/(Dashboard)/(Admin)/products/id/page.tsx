'use client'
import FullProductDetail from '@/components/(ProductionItems)/ProductDetail/productFullDetail';

export default function ProductDetailPage() {
  return (
    <>
      <FullProductDetail
        detail={{
          id: 'sdada-dasd-weqwe-32123',
          name: 'Product 01',
          quantity: 10,
          seedRef: {
            id: '0d0q3-142asjdn-121-asd1',
            name: 'seed xyz'
          },
          unit: 'kg'
        }}
      />
    </>
  );
}
