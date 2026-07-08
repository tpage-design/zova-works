import type { Capability, Language, ProcessStep, Product } from "../types";

export const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" }
];

export const siteContent = {
  nav: {
    capabilities: { en: "Capabilities", zh: "能力" },
    products: { en: "Products", zh: "产品方向" },
    process: { en: "Process", zh: "流程" },
    about: { en: "About", zh: "关于" },
    contact: { en: "Contact", zh: "联系" },
    cta: { en: "Start a Project", zh: "启动项目" },
    menu: { en: "Menu", zh: "菜单" },
    close: { en: "Close", zh: "关闭" }
  },
  hero: {
    kicker: { en: "ZOVA Works", zh: "ZOVA Works" },
    title: { en: "From Paper\nto Product.", zh: "从纸张\n到成品。" },
    subtitle: {
      en: "Custom paper products, packaging and export-ready assembly.",
      zh: "定制纸品、包装与出口交付组装支持。"
    },
    capabilityTag: {
      en: "Paper sourcing · Printing · Binding · Packaging · Product kitting · Warehousing · Shipment support",
      zh: "纸张选材 · 印刷 · 装订 · 包装 · 产品组装 · 仓储 · 发货支持"
    },
    primaryCta: { en: "Start a Project", zh: "启动项目" },
    secondaryCta: { en: "Explore Packaging Solutions", zh: "查看包装方案" },
    visualNote: {
      en: "Concept visuals for custom development.",
      zh: "用于定制开发展示的概念视觉。"
    },
    coordinationLine: {
      en: "We coordinate specialized manufacturing resources across paper sourcing, printing, binding, packaging, handmade finishing, product kitting, warehousing and shipment support.",
      zh: "我们整合纸张、印刷、装订、包装、手工工艺、产品组装、仓储与发货资源，为品牌提供从纸张到成品的一体化交付支持。"
    }
  },
  capabilities: {
    eyebrow: { en: "Capabilities", zh: "能力" },
    title: { en: "One system. Multiple capabilities.", zh: "一套整合系统，多种制造能力。" },
    intro: {
      en: "Coordinated manufacturing resources for custom paper products, packaging, product assembly and export-ready delivery support.",
      zh: "为定制纸品、包装、产品组装与出口交付支持整合专业制造资源。"
    }
  },
  products: {
    eyebrow: { en: "Products", zh: "产品方向" },
    title: { en: "Built around paper. Ready for retail.", zh: "以纸为基础，为零售交付而打造。" },
    intro: {
      en: "Illustrative directions for custom development. Final materials, structures and finishing are tailored to each project.",
      zh: "以下为品牌定制开发方向示意，最终材质、结构与工艺将根据项目需求确认。"
    }
  },
  retailSetProof: {
    title: {
      en: "From individual products to complete retail sets.",
      zh: "从单个产品到完整零售套装。"
    },
    items: [
      { en: "Paper products", zh: "纸制产品" },
      { en: "Packaging", zh: "包装" },
      { en: "Manual assembly", zh: "手工组装" },
      { en: "Warehouse & export preparation", zh: "仓储与出口准备" }
    ],
    body: {
      en: "We can coordinate notebooks, art paper, packaging, paper bags, accessories, manual assembly, warehouse consolidation and shipment preparation in one project workflow.",
      zh: "我们可在同一项目流程中协调纸本、艺术纸、包装盒、纸袋、配件、手工组装、仓储合箱与发货准备。"
    }
  },
  process: {
    eyebrow: { en: "Process", zh: "流程" },
    title: { en: "From brief to shipment.", zh: "从需求到发货。" }
  },
  moq: {
    eyebrow: { en: "Bulk Export", zh: "大货出口" },
    title: { en: "From test runs to bulk export programs.", zh: "从测试订单到大货出口项目。" },
    body: {
      en: "Selected standard programs can start from 100 units. Full private-label customization is recommended from 500 units. For larger projects, we support bulk production coordination, export carton packing, warehouse consolidation and container-ready shipment preparation.",
      zh: "部分常规项目可从100件开始测试。完整私标定制建议每个 SKU 500 件起。对于更大规模项目，我们支持大货生产协调、出口外箱包装、仓储合箱与整柜发货准备。"
    },
    firstLabel: { en: "Selected Standard Programs", zh: "常规项目测试" },
    secondLabel: { en: "Private Label Customization", zh: "私标定制建议" },
    note: {
      en: "Supports bulk production and container-ready export programs.",
      zh: "支持大货生产与整柜出口交付准备。"
    }
  },
  about: {
    eyebrow: { en: "About", zh: "关于" },
    title: {
      en: "Built for brands that care about details.",
      zh: "为重视产品细节的品牌而打造。"
    },
    body: {
      en: "ZOVA Works combines product thinking with coordinated manufacturing resources. We work across specialized paper, printing, binding, packaging and handmade finishing partners to help brands turn ideas into retail-ready paper products.",
      zh: "ZOVA Works 将产品思维与制造资源整合结合起来。我们协调纸张、印刷、装订、包装和手工工艺等专业资源，帮助品牌将想法转化为可直接销售的纸制产品。"
    },
    note: {
      en: "Created by a product-focused team with hands-on experience in paper products, printing and notebook development.",
      zh: "由具备纸品、印刷与笔记本开发经验的产品团队打造。"
    },
    experience: {
      en: "We support projects that combine paper products, packaging and manual assembly — from branded notebooks and art paper ranges to retail-ready stationery and creative product sets.",
      zh: "我们支持纸品、包装与手工组装结合的项目，从品牌笔记本、艺术纸系列，到可直接零售的文具和创意产品套装。"
    },
    selected: {
      en: "Selected Project Experience",
      zh: "精选项目经验"
    },
    selectedNote: {
      en: "Reserved for future anonymous project examples.",
      zh: "预留用于后续展示匿名项目案例。"
    }
  },
  contact: {
    eyebrow: { en: "Contact", zh: "联系" },
    title: {
      en: "Let's build your next paper product.",
      zh: "一起开发你的下一款纸制产品。"
    },
    body: {
      en: "Tell us what you want to make. We will help you shape the material, structure, printing, binding, packaging and assembly direction.",
      zh: "告诉我们你想做什么产品，我们会协助你梳理纸张、结构、印刷、装订、包装与组装方向。"
    },
    fields: {
      name: { en: "Name", zh: "姓名" },
      brand: { en: "Brand / Company", zh: "品牌或公司" },
      email: { en: "Email", zh: "邮箱" },
      productType: { en: "Product Type", zh: "产品类型" },
      quantity: { en: "Estimated Quantity", zh: "预计数量" },
      message: { en: "Message", zh: "项目需求" }
    },
    submit: { en: "Request a Quote", zh: "获取报价" },
    updating: { en: "Contact details are being updated.", zh: "联系信息正在更新中。" },
    whatsapp: { en: "WhatsApp", zh: "WhatsApp" },
    email: { en: "Email", zh: "邮箱" },
    facebook: { en: "Facebook", zh: "Facebook" },
    messenger: { en: "Messenger", zh: "Messenger" }
  },
  footer: {
    tagline: { en: "From Paper to Product.", zh: "从纸张到成品。" },
    custom: { en: "Custom Paper Products", zh: "定制纸品" },
    packaging: { en: "Packaging Solutions", zh: "包装解决方案" },
    location: { en: "Guangdong, China", zh: "中国广东" },
    copyright: { en: "© 2026 ZOVA Works. All rights reserved.", zh: "© 2026 ZOVA Works. All rights reserved." }
  }
};

export const capabilities: Capability[] = [
  {
    number: "01",
    title: { en: "Paper Sourcing & Specification", zh: "纸张选材与规格确认" },
    body: {
      en: "Coordinate paper options, custom paper specification and material direction based on project requirements.",
      zh: "根据项目需求协调纸张选项、定制纸张规格与材料方向。"
    },
    accent: "red"
  },
  {
    number: "02",
    title: { en: "Printing & Surface Finish", zh: "印刷与表面工艺" },
    body: {
      en: "Coordinate cover printing, inserts, labels, instructions, brand graphics and surface finish partners.",
      zh: "协调封面印刷、内页、标签、说明卡、品牌图形与表面工艺资源。"
    },
    accent: "yellow"
  },
  {
    number: "03",
    title: { en: "Binding & Book Production", zh: "装订与纸本生产" },
    body: {
      en: "Work with specialized binding and book production partners for notebooks, journals and art paper formats.",
      zh: "协同专业装订与纸本生产资源，开发笔记本、日记本与艺术纸品形式。"
    },
    accent: "blue"
  },
  {
    number: "04",
    title: { en: "Packaging & Custom Boxes", zh: "包装与定制彩盒" },
    body: {
      en: "Develop retail boxes, folding cartons, sleeves, inserts and branded packaging as standalone or combined projects.",
      zh: "开发零售彩盒、折叠盒、纸套、内托与品牌包装，可作为独立项目或组合项目承接。"
    },
    accent: "green"
  },
  {
    number: "05",
    title: { en: "Product Kitting & Handmade Assembly", zh: "产品组装与手工工艺" },
    body: {
      en: "Coordinate manual kitting, hand assembly, wrapping, handmade finishing and retail-ready product set preparation.",
      zh: "协调手工组套、手工组装、包装整理、手工后道与零售套装准备。"
    },
    accent: "red"
  },
  {
    number: "06",
    title: { en: "Quality Check, Warehousing & Shipment Support", zh: "质检、仓储与发货支持" },
    body: {
      en: "Support detail checks, warehouse coordination, export carton packing, consolidation and shipment preparation.",
      zh: "支持细节检查、仓储协调、出口外箱包装、合箱整合与发货准备。"
    },
    accent: "blue"
  }
];

export const products: Product[] = [
  {
    id: "notebooks-art-paper",
    number: "01",
    title: { en: "Custom Notebooks & Art Paper", zh: "定制笔记本与艺术纸品" },
    subtitle: {
      en: "Custom notebooks, journals, sketchbooks, watercolor pads and branded art paper formats.",
      zh: "定制笔记本、日记本、素描本、水彩本与品牌艺术纸品规格。"
    },
    items: [
      { en: "Custom format", zh: "定制规格" },
      { en: "Paper options", zh: "纸张选项" },
      { en: "Printing & binding", zh: "印刷与装订" }
    ],    directionNote: {
      en: "From paper selection and cover printing to binding and retail-ready packing.",
      zh: "从纸张选材、封面印刷到装订与零售包装准备。"
    },
    accent: "red",
    visual: "notebook",
    imageMode: "full-product"
  },
  {
    id: "retail-packaging",
    number: "02",
    title: { en: "Retail Packaging & Custom Boxes", zh: "零售包装与定制彩盒" },
    subtitle: {
      en: "Retail boxes, folding cartons, sleeves, gift boxes, inserts, labels and branded packaging.",
      zh: "零售彩盒、折叠盒、纸套、礼盒、内托、标签与品牌包装。"
    },
    items: [
      { en: "Custom boxes", zh: "定制彩盒" },
      { en: "Retail packaging", zh: "零售包装" },
      { en: "Print finishing", zh: "印刷后道" }
    ],    directionNote: {
      en: "Packaging can be developed as an independent project or as part of a complete product program.",
      zh: "包装盒可作为独立项目开发，也可作为完整产品项目的一部分。"
    },
    accent: "blue",
    visual: "packaging",
    imageMode: "full-product"
  },
  {
    id: "paper-bags-finishing",
    number: "03",
    title: { en: "Paper Bags & Handmade Finishing", zh: "纸袋与手工工艺" },
    subtitle: {
      en: "Custom paper bags, manual assembly, hand finishing, product wrapping and flexible packaging work.",
      zh: "定制纸袋、手工组装、手工后道、产品包裹与灵活包装工作。"
    },
    items: [
      { en: "Paper bags", zh: "纸袋" },
      { en: "Hand assembly", zh: "手工组装" },
      { en: "Flexible finishing", zh: "灵活后道" }
    ],    directionNote: {
      en: "Suitable for branded stationery, gift packaging and creative product programs.",
      zh: "适用于品牌文具、礼品包装与创意产品项目。"
    },
    accent: "green",
    visual: "bag",
    imageMode: "full-product"
  },
  {
    id: "art-kits-kitting",
    number: "04",
    title: { en: "Art Kits, Product Kitting & Export Prep", zh: "艺术套装、产品组装与出口准备" },
    subtitle: {
      en: "Notebook and art supply bundles, crayon or accessory packing, manual kitting, retail-ready sets and export carton preparation.",
      zh: "笔记本与艺术用品组合、蜡笔或配件包装、手工组套、零售套装与出口外箱准备。"
    },
    items: [
      { en: "Product kitting", zh: "产品组装" },
      { en: "Retail sets", zh: "零售套装" },
      { en: "Export carton prep", zh: "出口外箱准备" }
    ],    directionNote: {
      en: "Designed for projects that combine paper products, accessories, packaging and export-ready delivery.",
      zh: "面向纸制产品、配件、包装与出口交付准备结合的项目。"
    },
    accent: "yellow",
    visual: "kit",
    imageMode: "full-product"
  }
];
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: { en: "Brief", zh: "需求沟通" },
    body: {
      en: "Share your product idea, quantity, target market and references.",
      zh: "分享产品想法、数量、目标市场与参考资料。"
    },
    accent: "red"
  },
  {
    number: "02",
    title: { en: "Material & Structure", zh: "材料与结构" },
    body: {
      en: "Confirm paper, size, format, binding, packaging and assembly direction.",
      zh: "确认纸张、尺寸、形式、装订、包装与组装方向。"
    },
    accent: "yellow"
  },
  {
    number: "03",
    title: { en: "Production Coordination", zh: "生产协调" },
    body: {
      en: "Coordinate printing, binding, finishing, packaging and kitting processes.",
      zh: "协调印刷、装订、后道、包装与组套流程。"
    },
    accent: "blue"
  },
  {
    number: "04",
    title: { en: "Quality & Consolidation", zh: "质检与整合" },
    body: {
      en: "Check details, consolidate products and prepare export cartons.",
      zh: "检查细节、整合产品并准备出口外箱。"
    },
    accent: "green"
  },
  {
    number: "05",
    title: { en: "Shipment Support", zh: "发货支持" },
    body: {
      en: "Prepare the order for your nominated forwarder or shipping solution.",
      zh: "为指定货代或发货方案完成订单准备。"
    },
    accent: "red"
  }
];







