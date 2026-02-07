import { Product, Category, BlogPost } from './types';

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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Timeless Allure of Banarasi Silk',
    excerpt: 'Explore the rich history and intricate craftsmanship behind one of India\'s most celebrated textiles. Banarasi silk is more than just fabric; it is a legacy woven in threads of gold and silver.',
    content: `
      <p>Banarasi silk sarees have been a symbol of royalty and elegance for centuries. Originating from the holy city of Varanasi, these sarees are known for their gold and silver brocade or zari, fine silk, and opulent embroidery. The sarees are made of finely woven silk and are decorated with intricate design, and, because of these engravings, are relatively heavy.</p>
      
      <h3>A Legacy Woven in Gold</h3>
      <p>The history of Banarasi silk dates back to the Mughal era, where Persian motifs were mixed with Indian designs to create the unique patterns we see today. The specialized weaving technique involves thousands of individual threads, making the process labor-intensive and highly skilled. A single saree can take anywhere from 15 days to 6 months to complete, depending on the complexity of the design.</p>

      <h3>Identifying the Authentic</h3>
      <p>With the market flooded with power-loom imitations, identifying a genuine handloom Banarasi saree can be challenging. An authentic handloom saree will always have a slightly uneven texture due to the manual weaving process. Additionally, look for the 'Silk Mark' certification which guarantees the purity of the silk used.</p>
      
      <h3>Caring for your Heirloom</h3>
      <p>To preserve the sheen and longevity of your Banarasi saree, always wrap it in a muslin cloth and store it in a dark, dry place. Avoid hanging them on metal hangers for long periods, and change the folds every few months to prevent permanent creasing.</p>
    `,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    author: 'Vastrika Editorial',
    date: 'Oct 12, 2024',
    category: 'Heritage',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: '5 Styling Tips for Your Wedding Lehenga',
    excerpt: 'Make your special day even more magical with these expert styling tips for the modern Indian bride. From jewelry pairing to draping styles, we cover it all.',
    content: `
      <p>Your wedding day is one of the most significant moments of your life, and your lehenga plays a starring role. Here are five styling tips to ensure you look breathtakingly beautiful.</p>
      
      <h3>1. Balance the Bling</h3>
      <p>If your lehenga is heavily embroidered, opt for subtle, elegant jewelry. Conversely, if your outfit is relatively simple, you can go all out with heavy polki or kundan sets. The key is to let one element shine without overpowering the other.</p>

      <h3>2. The Dupatta Drape</h3>
      <p>The way you drape your dupatta can completely transform your look. A double dupatta style is trending, where one is draped diagonally across the chest and the other covers the head. This adds a regal touch and allows for better movement.</p>

      <h3>3. Comfort is Key</h3>
      <p>Remember, you will be wearing this outfit for hours. Ensure the cancan underneath isn't too heavy and the blouse fits perfectly without restricting your movement. A happy bride is a beautiful bride!</p>
      
      <h3>4. Contrast is Cool</h3>
      <p>Don't be afraid to mix and match colors. A mint green dupatta with a peach lehenga or a maroon blouse with a gold skirt can create a stunning visual impact.</p>
      
      <h3>5. Personalize It</h3>
      <p>Add a personal touch to your lehenga, perhaps by embroidering your wedding date or initials on the hem or the dupatta. It makes the outfit truly yours.</p>
    `,
    image: 'https://img.perniaspopupshop.com/catalog/product/n/k/NKGC082311_1.jpg?impolicy=zoomimage',
    author: 'Riya Kapoor, Stylist',
    date: 'Nov 05, 2024',
    category: 'Styling',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Preserving Heritage: Our Sustainability Promise',
    excerpt: 'At Vastrika, we believe in fashion with a conscience. Learn about our initiatives to support local artisans and promote sustainable weaving practices.',
    content: `
      <p>In a world of fast fashion, Vastrika stands as a beacon for slow, sustainable luxury. We are committed to preserving the ancient art of handloom weaving while ensuring a sustainable future for our planet and our artisans.</p>
      
      <h3>Empowering Artisans</h3>
      <p>We work directly with over 500 weaver families across India, eliminating middlemen to ensure fair wages. By providing steady work and fair compensation, we encourage the younger generation of weaver families to continue their ancestral craft.</p>

      <h3>Eco-friendly Practices</h3>
      <p>We are progressively moving towards using organic dyes and natural fibers. Our packaging is 100% plastic-free, utilizing recycled paper and cloth bags that can be reused. We believe that luxury should not come at the cost of the environment.</p>

      <h3>The Beauty of Slow Fashion</h3>
      <p>Handloom products are the epitome of slow fashion. They are durable, timeless, and can be passed down through generations. By choosing a handloom product, you are voting for a world that values quality over quantity and heritage over trends.</p>
    `,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
    author: 'Anjali Desai, Founder',
    date: 'Nov 18, 2024',
    category: 'Sustainability',
    readTime: '3 min read'
  },
    {
    id: '4',
    title: 'The Evolution of the Anarkali Suit',
    excerpt: 'From the courts of the Mughal Empire to the modern runways, trace the fascinating journey of the Anarkali suit.',
    content: `
      <p>The Anarkali suit, with its frock-style top and slim fitted bottom, is named after Anarkali, a legendary courtesan in the court of Mughal Emperor Akbar. It is a silhouette that has stood the test of time, evolving with every era while retaining its core essence of grace and flow.</p>
      
      <h3>Mughal Origins</h3>
      <p>Originally, the Anarkali was made of opulent muslins and silks, often transparent to show the inner layers. It was the attire of dancers, designed to accentuate their twirls. The tight bodice and flared skirt were perfect for the Kathak dance form.</p>

      <h3>Modern Interpretations</h3>
      <p>Today, designers have reimagined the Anarkali in various forms - floor-length gowns, layered cuts, and asymmetrical hemlines. It has become a staple in Indian wedding wear, offering the grandeur of a lehenga with the comfort of a suit.</p>

      <h3>Styling the Anarkali</h3>
      <p>For a contemporary look, ditch the dupatta and opt for a cape-style Anarkali. Pair it with statement earrings and high heels to elongate your silhouette. It is a versatile outfit that works for everything from a sangeet night to a formal dinner.</p>
    `,
    image: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-georgette-anarkali-suit-in-teal-blue-v1-kgj181.jpg',
    author: 'Vastrika Editorial',
    date: 'Dec 01, 2024',
    category: 'History',
    readTime: '6 min read'
  }
];