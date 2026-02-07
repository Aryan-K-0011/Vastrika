import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'sarees', name: 'Sarees', image: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-viscose-silk-saree-in-baby-pink-v1-sgsa847.jpg' },
  { id: 'lehengas', name: 'Lehengas', image: 'https://riyaasat.in/cdn/shop/files/MultiBanarsiSilkLehengaSetwithReshamEmbroideryandStoneWork_1.jpg?v=1767878273&width=1000' },
  { id: 'kurtis', name: 'Kurtis', image: 'https://cdn.sareeka.com/image/cache/data2022/turquoise-cotton-silk-casual-kurti-229480-1000x1375.jpg' },
  { id: 'suits', name: 'Suits', image: 'https://womenplusindia.com/cdn/shop/files/3916_III.jpg?v=1697554392&width=850' },
  { id: 'wedding', name: 'Wedding Collection', image: 'https://www.ansabjahangirstudio.com/images/thumbs/0015305_rumaisa_700.jpeg' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Banarasi Silk Saree',
    price: 12500,
    category: 'sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    description: 'A timeless Banarasi silk saree woven with intricate zari work, perfect for weddings and grand celebrations.',
    features: ['Pure Silk', 'Zari Work', 'Dry Clean Only']
  },
  {
    id: '2',
    name: 'Embroidered Velvet Lehenga',
    price: 45000,
    category: 'lehengas',
    image: 'https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/3/3332lg02-13005.jpg',
    description: 'Deep maroon velvet lehenga with heavy gold embroidery. Includes blouse piece and dupatta.',
    features: ['Velvet Fabric', 'Hand Embroidery', 'Includes Dupatta']
  },
  {
    id: '3',
    name: 'Teal Anarkali Suit',
    price: 8900,
    category: 'suits',
    image: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-georgette-anarkali-suit-in-teal-blue-v1-kgj181.jpg',
    description: 'Flowy georgette Anarkali suit in teal blue with delicate floral motifs.',
    features: ['Georgette', 'Floral Print', 'Lightweight']
  },
  {
    id: '4',
    name: 'Festive Chikankari Kurti',
    price: 3500,
    category: 'kurtis',
    image: 'https://thechikanlabel.com/cdn/shop/files/Sitara_Chikankari_Viscose_Kurta_Set_with_Dupatta_-_Rani_Pink.jpg?v=1750413724&width=1024',
    description: 'Handcrafted Lucknowi Chikankari kurti in pastel pink.',
    features: ['Cotton Blend', 'Hand Work', 'Casual & Festive']
  },
  {
    id: '5',
    name: 'Golden Zardosi Bridal Lehenga',
    price: 85000,
    category: 'wedding',
    image: 'https://img.perniaspopupshop.com/catalog/product/r/o/ROQA082504_1.jpg?impolicy=detailimageprod',
    description: 'Exquisite bridal lehenga featuring traditional Zardosi work on raw silk.',
    features: ['Raw Silk', 'Zardosi Work', 'Bridal Collection']
  },
  {
    id: '6',
    name: 'Kanjivaram Temple Saree',
    price: 18000,
    category: 'sarees',
    image: 'https://www.chhunchi.com/cdn/shop/files/DarkBluePureSilkKanjivaramHandloomSareewithGoldenTempleBorderDesign.jpg?v=1734447966&width=1600',
    description: 'Traditional Kanjivaram saree with temple border design.',
    features: ['Kanjivaram Silk', 'Traditional Weave', 'Festive Wear']
  },
  // New Products
  {
    id: '7',
    name: 'Midnight Blue Georgette Saree',
    price: 6500,
    category: 'sarees',
    image: 'https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/6/6680sr08-acy9818.jpg',
    description: 'Lightweight georgette saree with sequin borders, ideal for evening parties.',
    features: ['Georgette', 'Sequin Border', 'Evening Wear']
  },
  {
    id: '8',
    name: 'Peach Organza Lehenga',
    price: 22000,
    category: 'lehengas',
    image: 'https://www.cdnensemble.xyz/pub/media/catalog/product/cache/391a5e1abf666a8c41861a6cd6227bf9/1/4/1411mr14-2.jpg',
    description: 'Floral print organza lehenga with a matching crop top and ruffle dupatta.',
    features: ['Organza Silk', 'Floral Print', 'Contemporary Style']
  },
  {
    id: '9',
    name: 'Mustard Yellow Silk Suit',
    price: 5500,
    category: 'suits',
    image: 'https://stylejaipur.com/cdn/shop/files/03aa08b5-5c7e-459d-9baa-97464a534c54.jpg?v=1731062280',
    description: 'Straight cut raw silk suit in mustard yellow, perfect for Haldi ceremonies.',
    features: ['Raw Silk', 'Straight Cut', 'Haldi Special']
  },
  {
    id: '10',
    name: 'White Cotton Chikankari Kurti',
    price: 2800,
    category: 'kurtis',
    image: 'https://assets0.mirraw.com/images/11055391/SCL4245_1_zoom.JPG?1693301414',
    description: 'Elegant white cotton kurti with intricate Chikankari embroidery.',
    features: ['Pure Cotton', 'Hand Embroidery', 'Summer Wear']
  },
  {
    id: '11',
    name: 'Crimson Red Bridal Lehenga',
    price: 120000,
    category: 'wedding',
    image: 'https://img.perniaspopupshop.com/catalog/product/n/k/NKGC082311_1.jpg?impolicy=zoomimage',
    description: 'The quintessential red bridal lehenga with all-over intricate handwork.',
    features: ['Premium Velvet', 'Bridal Handwork', 'Heirloom Piece']
  },
  {
    id: '12',
    name: 'Emerald Green Silk Saree',
    price: 14500,
    category: 'sarees',
    image: 'https://clothsvilla.com/cdn/shop/products/B-Vipul-SuvarnaSilk-DarkGreen_5_1024x1024.jpg?v=1698140835',
    description: 'Rich emerald green silk saree with gold coin motifs.',
    features: ['Soft Silk', 'Gold Motifs', 'Traditional']
  },
  {
    id: '13',
    name: 'Floral Print Organza Saree',
    price: 4200,
    category: 'sarees',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/10/CJ/ZM/XG/137063079/floral-printed-organza-saree-with-blouse.JPG',
    description: 'Dreamy organza saree with hand-painted floral designs.',
    features: ['Organza', 'Hand Painted', 'Day Events']
  },
  {
    id: '14',
    name: 'Mirror Work Pink Lehenga',
    price: 32000,
    category: 'lehengas',
    image: 'https://nehakhullar.in/cdn/shop/files/pink-chanderi-mirror-work-lehenga-set_1_d9ca338b-bf05-470b-a3e3-967682b76454.jpg?v=1748856809',
    description: 'Baby pink lehenga adorned with real mirror work and embroidery.',
    features: ['Georgette', 'Real Mirror Work', 'Sangeet Special']
  },
  {
    id: '15',
    name: 'Navy Blue Anarkali Gown',
    price: 11500,
    category: 'suits',
    image: 'https://sairasboutique.net/cdn/shop/files/NavyBlueDesignerHeavyEmbroideredNetPartyWearAnarkaliGown-Saira_sBoutique_1.jpg?v=1746548632',
    description: 'Floor-length navy blue Anarkali gown with gold accents.',
    features: ['Silk Blend', 'Floor Length', 'Reception Wear']
  }
];