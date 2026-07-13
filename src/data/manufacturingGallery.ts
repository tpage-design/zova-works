export type ManufacturingLayoutType = "wide" | "large" | "standard";

export type ManufacturingGalleryItem = {
  id: string;
  image: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  alt: string;
  featured: boolean;
  layoutType: ManufacturingLayoutType;
  width: number;
  height: number;
  objectPosition?: string;
};

export const manufacturingGallery: ManufacturingGalleryItem[] = [
  {
    id: "manual-assembly-workshop",
    image: "/images/manufacturing/manual-assembly-workshop.webp",
    titleEn: "Manual Assembly Workshop",
    titleZh: "手工组装与生产现场",
    descriptionEn:
      "Manual assembly and coordinated production for paper products, packaging and retail-ready sets.",
    descriptionZh: "纸品、包装和产品套装的手工组装与生产协同现场。",
    alt: "Manual assembly workshop for paper products packaging and retail-ready sets",
    featured: true,
    layoutType: "wide",
    width: 1600,
    height: 1200,
    objectPosition: "center 55%"
  },
  {
    id: "accordion-book-assembly",
    image: "/images/manufacturing/accordion-book-assembly.webp",
    titleEn: "Accordion Book Assembly",
    titleZh: "风琴本组装",
    descriptionEn: "Manual assembly, cover fitting and finishing for custom accordion books.",
    descriptionZh: "定制风琴本的手工组装、封面装配与后道加工。",
    alt: "Manual assembly of custom accordion books in production",
    featured: true,
    layoutType: "large",
    width: 1280,
    height: 1707,
    objectPosition: "center 58%"
  },
  {
    id: "batch-book-production",
    image: "/images/manufacturing/batch-book-production.webp",
    titleEn: "Batch Paper Product Production",
    titleZh: "批量纸品生产",
    descriptionEn:
      "Batch organisation, quality checking and production preparation for finished paper products.",
    descriptionZh: "完成后纸品的批量整理、质量检查与生产准备。",
    alt: "Stacks of finished paper products prepared for batch production",
    featured: false,
    layoutType: "standard",
    width: 1280,
    height: 1707,
    objectPosition: "center 44%"
  },
  {
    id: "pressing-and-finishing",
    image: "/images/manufacturing/pressing-and-finishing.webp",
    titleEn: "Pressing & Finishing",
    titleZh: "压制与后道整理",
    descriptionEn: "Pressing, forming and finishing of custom paper products.",
    descriptionZh: "纸制产品的压制、定型与成品整理。",
    alt: "Pressing and finishing process for custom paper products",
    featured: false,
    layoutType: "standard",
    width: 1600,
    height: 1200,
    objectPosition: "center center"
  },
  {
    id: "paper-bag-range",
    image: "/images/manufacturing/paper-bag-range.webp",
    titleEn: "Paper Bags & Retail Packaging",
    titleZh: "纸袋与零售包装",
    descriptionEn:
      "Paper bag and retail packaging options across different sizes, materials, handles and structures.",
    descriptionZh: "不同尺寸、材料、提手和结构的纸袋及零售包装方向。",
    alt: "Paper bag samples in different sizes materials and handle styles",
    featured: false,
    layoutType: "standard",
    width: 1600,
    height: 919,
    objectPosition: "center top"
  },
  {
    id: "production-materials",
    image: "/images/manufacturing/production-materials.webp",
    titleEn: "Production Materials & Preparation",
    titleZh: "生产材料与备料",
    descriptionEn: "Paperboard preparation and material organisation before bulk production.",
    descriptionZh: "批量生产前的纸板、材料整理与备料。",
    alt: "Prepared paperboard materials for bulk paper product production",
    featured: false,
    layoutType: "standard",
    width: 1600,
    height: 1200,
    objectPosition: "center center"
  }
];
