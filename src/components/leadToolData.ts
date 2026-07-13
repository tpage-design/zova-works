import { contactConfig } from "../config/contact";

export type LeadScore = "高" | "中" | "低";
export type CustomerStatus = "未联系" | "已联系" | "已回复" | "待跟进" | "不合适";
export type SearchQuantity = "10" | "20" | "50";
export type SearchMode = "生成搜索关键词" | "手动导入客户链接" | "搜索结果分析" | "官网信息提取";
export type LeadQuality = "High" | "Medium" | "Low";

export const serviceOptions = [
  { label: "彩盒", english: "custom box" },
  { label: "标签", english: "label" },
  { label: "纸袋", english: "paper bag" },
  { label: "说明卡", english: "insert card" },
  { label: "感谢卡", english: "thank-you card" },
  { label: "吊牌", english: "hang tag" },
  { label: "礼盒", english: "gift box" },
  { label: "贴纸", english: "sticker" }
] as const;

export const customerTypeOptions = ["独立品牌", "Shopify 独立站", "Instagram 小品牌", "Etsy 店铺", "礼品店", "文创品牌", "DTC 品牌"] as const;
export const statusOptions: CustomerStatus[] = ["未联系", "已联系", "已回复", "待跟进", "不合适"];
export const leadScoreOptions: LeadScore[] = ["高", "中", "低"];
export const searchModes: SearchMode[] = ["生成搜索关键词", "手动导入客户链接", "搜索结果分析", "官网信息提取"];
export const productDirections = ["Custom Notebooks", "Watercolor Pads", "Sketchbooks", "Retail Packaging", "Paper Bags", "Art Kits", "Product Kitting", "Other"] as const;

export type ServiceLabel = (typeof serviceOptions)[number]["label"];
export type CustomerType = (typeof customerTypeOptions)[number];
export type ProductDirection = (typeof productDirections)[number];

export type SearchForm = {
  country: string;
  category: string;
  services: ServiceLabel[];
  customerTypes: CustomerType[];
  quantity: SearchQuantity;
  mode: SearchMode;
};

export type CustomerLead = {
  id: string;
  brandName: string;
  country: string;
  category: string;
  website: string;
  instagram: string;
  email: string;
  contactPage: string;
  packagingNeed: string;
  leadScore: LeadScore;
  suggestedAngle: string;
  status: CustomerStatus;
  notes: string;
};

export type SearchTask = {
  id: string;
  createdAt: string;
  country: string;
  category: string;
  services: string;
  keywords: string[];
};

export type Filters = {
  text: string;
  score: "全部" | LeadScore;
  status: "全部" | CustomerStatus;
};

export type ManualLeadForm = {
  brandName: string;
  country: string;
  website: string;
  instagram: string;
  email: string;
  currentProducts: string;
  opportunity: string;
  productDirection: ProductDirection;
};

export type ExportFields = {
  messageSent: string;
  replyStatus: string;
  followUpDate: string;
  notes: string;
};

type FutureIntegrationHooks = {
  searchApi: (query: string) => Promise<CustomerLead[]>;
  websiteCrawler: (url: string) => Promise<Partial<CustomerLead>>;
  emailExtractor: (htmlOrText: string) => Promise<string[]>;
  instagramExtractor: (htmlOrText: string) => Promise<string[]>;
  scoringModel: (lead: CustomerLead) => Promise<LeadScore>;
  emailSender: (lead: CustomerLead, message: string) => Promise<void>;
  crmRecorder: (lead: CustomerLead) => Promise<void>;
};

export const leadToolIntegrationHooks: FutureIntegrationHooks = {
  searchApi: async () => [],
  websiteCrawler: async () => ({}),
  emailExtractor: async () => [],
  instagramExtractor: async () => [],
  scoringModel: async (lead) => lead.leadScore,
  emailSender: async () => undefined,
  crmRecorder: async () => undefined
};

export const initialSearch: SearchForm = {
  country: "United States",
  category: "candle brand",
  services: ["彩盒", "标签", "说明卡"],
  customerTypes: ["独立品牌", "Shopify 独立站", "Instagram 小品牌"],
  quantity: "20",
  mode: "生成搜索关键词"
};

export const initialManualLead: ManualLeadForm = {
  brandName: "",
  country: "",
  website: "",
  instagram: "",
  email: "",
  currentProducts: "",
  opportunity: "",
  productDirection: "Retail Packaging"
};

export const signature = `Evan Zhong
ZOVA Works
Custom Paper Products, Packaging & Export-Ready Assembly
Email: ${contactConfig.emailAddress}
WhatsApp: ${contactConfig.whatsAppHref}
Website: https://zova-works.vercel.app`;

export const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const normalize = (...parts: string[]) => parts.join(" ").toLowerCase();
export const hasAnyTerm = (text: string, terms: string[]) => terms.some((term) => text.includes(term));
export const shortText = (value: string, maxLength = 130) => {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length <= maxLength ? trimmed : `${trimmed.slice(0, maxLength - 1).trim()}...`;
};

export const getDateAfterDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
};

export const createInitialExportFields = (): ExportFields => ({
  messageSent: "No",
  replyStatus: "No reply",
  followUpDate: getDateAfterDays(3),
  notes: ""
});

export const serviceEnglish = (services: ServiceLabel[]) => services.map((service) => serviceOptions.find((item) => item.label === service)?.english ?? service.toLowerCase());
export const serviceChinese = (services: ServiceLabel[]) => services.join(" / ");

export const toSearchCountry = (country: string) => {
  const value = country.trim().toLowerCase();
  if (!value) return "target market";
  if (["美国", "united states", "usa", "us", "u.s."].includes(value)) return "USA";
  if (["英国", "united kingdom", "uk", "u.k."].includes(value)) return "UK";
  if (["澳大利亚", "australia"].includes(value)) return "Australia";
  if (["加拿大", "canada"].includes(value)) return "Canada";
  return country.trim();
};

export const toEnglishCategory = (category: string) => {
  const value = category.trim().toLowerCase();
  if (!value) return "product brand";
  if (value.includes("香薰") || value.includes("蜡烛")) return "candle brand";
  if (value.includes("护肤")) return "skincare brand";
  if (value.includes("手工皂") || value.includes("肥皂")) return "handmade soap brand";
  if (value.includes("咖啡")) return "coffee brand";
  if (value.includes("茶")) return "tea brand";
  if (value.includes("饰品") || value.includes("首饰")) return "jewelry brand";
  if (value.includes("服装") || value.includes("衣服")) return "clothing brand";
  return category.trim();
};

export const cleanCategoryForCopy = (category: string) => toEnglishCategory(category).replace(/\bbrand\b/gi, "").replace(/\s+/g, " ").trim() || "products";

export const generateSearchKeywords = (search: SearchForm) => {
  const country = toSearchCountry(search.country);
  const category = toEnglishCategory(search.category);
  const services = serviceEnglish(search.services);
  const firstService = services[0] ?? "custom packaging";
  const secondService = services[1] ?? "label";
  const thirdService = services[2] ?? "insert card";
  return Array.from(new Set([
    `handmade ${category} ${country} packaging`,
    `small ${category} custom ${firstService}`,
    `${cleanCategoryForCopy(category)} gift set brand ${country}`,
    `${category} ${secondService} packaging`,
    `${category} ${thirdService} packaging`,
    `Shopify ${category} ${country}`,
    `${category} contact wholesale`,
    `independent ${category} gift box`,
    `DTC ${category} packaging`,
    `Instagram ${category} ${country}`
  ]));
};

export const extractUrls = (text: string) => Array.from(new Set(text.match(/https?:\/\/[^\s,，；;]+/g) ?? []));
export const extractEmail = (text: string) => text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
export const extractInstagram = (text: string) => text.match(/https?:\/\/(www\.)?instagram\.com\/[^\s,，；;]+/i)?.[0] ?? "";

export const inferBrandFromUrl = (url: string) => {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    const name = hostname.split(".")[0].replace(/[-_]/g, " ");
    return name.replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return "待确认品牌";
  }
};

export const getSuggestedPackagingUse = (lead: Pick<CustomerLead, "category" | "packagingNeed">, search: SearchForm) => {
  const text = normalize(lead.category, lead.packagingNeed, search.category, serviceChinese(search.services));
  if (hasAnyTerm(text, ["candle", "蜡烛", "香薰"])) return "a candle gift box with a matching label and insert card";
  if (hasAnyTerm(text, ["skincare", "护肤", "soap", "手工皂", "肥皂"])) return "a clean label system with a small box or insert card";
  if (hasAnyTerm(text, ["coffee", "咖啡", "tea", "茶"])) return "label packaging, thank-you cards, or a small gift set box";
  if (hasAnyTerm(text, ["jewelry", "饰品", "首饰"])) return "a small gift box, hang tag, or thank-you card";
  if (hasAnyTerm(text, ["clothing", "服装", "apparel", "fashion"])) return "hang tags, stickers, and a branded paper bag";
  const services = serviceEnglish(search.services);
  return services.length ? `a small ${services.slice(0, 3).join(" / ")} test` : "a small packaging upgrade";
};

export const getPackagingNeed = (search: SearchForm, category: string) => {
  const base = serviceChinese(search.services);
  const use = getSuggestedPackagingUse({ category, packagingNeed: base }, search);
  return base ? `${base}；可先测试 ${use}` : use;
};

export const evaluateCustomer = (lead: CustomerLead, search: SearchForm) => {
  const text = normalize(lead.brandName, lead.category, lead.website, lead.instagram, lead.email, lead.contactPage, lead.packagingNeed, lead.notes, search.category, serviceChinese(search.services));
  const hasProduct = Boolean(lead.category.trim()) || hasAnyTerm(text, ["product", "shop", "store", "collection", "brand", "产品"]);
  const hasPackaging = Boolean(lead.packagingNeed.trim()) || hasAnyTerm(text, ["box", "label", "packaging", "gift", "card", "bag", "盒", "标签", "纸袋", "卡"]);
  const hasBrandSignal = Boolean(lead.website.trim() || lead.instagram.trim()) || hasAnyTerm(text, ["shopify", "etsy", "dtc", "instagram", "brand"]);
  const hasContact = Boolean(lead.email.trim() || lead.contactPage.trim());
  const weakRelationship = hasAnyTerm(text, ["software", "electronics", "machinery", "distributor", "wholesale only", "supplier", "trading company"]);
  let numericScore = (hasProduct ? 2 : 0) + (hasPackaging ? 2 : 0) + (hasBrandSignal ? 2 : 0) + (hasContact ? 2 : 0) + (search.services.length ? 1 : 0) - (weakRelationship ? 3 : 0);
  let score: LeadScore = "低";
  if (numericScore >= 7 && hasProduct && hasPackaging && hasBrandSignal && hasContact) score = "高";
  else if (numericScore >= 4 && hasProduct) score = "中";
  if (!hasProduct || (!hasContact && !lead.website.trim() && !lead.instagram.trim()) || weakRelationship) score = "低";
  const packagingUse = getSuggestedPackagingUse(lead, search);
  const angle = score === "高" ? `先从 ${packagingUse} 切入，强调小批量测试和品牌视觉延展。` : score === "中" ? `作为低压力测试客户，先问是否愿意看 2-3 个 ${packagingUse} 方向。` : "先确认对方是否有包装升级计划，不要直接推完整供应商服务。";
  const why = score === "高" ? "有产品、品牌触点、包装需求和联系方式，适合优先联系。" : score === "中" ? "品类方向有机会，但品牌信息或联系方式还不完整，适合轻量试探。" : "产品、联系方式或包装相关性不足，需要先补信息或暂缓联系。";
  return { score, angle, why };
};

export const createEmptyCustomer = (search: SearchForm): CustomerLead => {
  const lead: CustomerLead = { id: createId(), brandName: "", country: search.country, category: search.category, website: "", instagram: "", email: "", contactPage: "", packagingNeed: getPackagingNeed(search, search.category), leadScore: "中", suggestedAngle: "", status: "未联系", notes: "" };
  const evaluation = evaluateCustomer(lead, search);
  return { ...lead, leadScore: evaluation.score, suggestedAngle: evaluation.angle };
};

export const createCustomerFromUrl = (url: string, search: SearchForm, sourceText = ""): CustomerLead => {
  const lead: CustomerLead = { id: createId(), brandName: inferBrandFromUrl(url), country: search.country, category: search.category, website: /instagram\.com/i.test(url) ? "" : url, instagram: /instagram\.com/i.test(url) ? url : extractInstagram(sourceText), email: extractEmail(sourceText), contactPage: /contact/i.test(url) ? url : "", packagingNeed: getPackagingNeed(search, search.category), leadScore: "中", suggestedAngle: "", status: "未联系", notes: sourceText ? shortText(sourceText, 180) : "由手动导入链接生成，需人工核对。" };
  const evaluation = evaluateCustomer(lead, search);
  return { ...lead, leadScore: evaluation.score, suggestedAngle: evaluation.angle };
};

export const createDevelopmentScripts = (lead: CustomerLead, search: SearchForm) => {
  const brand = lead.brandName.trim() || "your brand";
  const category = cleanCategoryForCopy(lead.category || search.category);
  const packagingUse = getSuggestedPackagingUse(lead, search);
  const serviceLine = serviceEnglish(search.services).length ? serviceEnglish(search.services).slice(0, 4).join(", ") : "custom boxes, labels, paper bags and insert cards";
  const greeting = lead.brandName.trim() ? `Hi ${brand} team,` : "Hi there,";
  const instagramDm = `Hi ${brand}, I really like the visual style of your ${category} products. I work with paper packaging, mainly ${serviceLine}. I noticed your products could work well as ${packagingUse}. If you ever plan to test upgraded packaging, I would be happy to share a few simple ideas. No pressure - just thought it could fit your brand style.`;
  const firstEmail = `Subject: A few packaging ideas for ${brand}\n\n${greeting}\n\nI came across ${brand} and liked the visual direction of your ${category} products.\n\nOne small opportunity could be ${packagingUse}. I would not suggest a big supplier conversation at this stage - just a few simple packaging directions that could make the product feel more giftable or retail-ready.\n\nZOVA Works helps with paper packaging such as ${serviceLine}, plus export-ready assembly when brands need packed sets.\n\nWould you be open to seeing 2-3 lightweight ideas for your team to review?\n\nBest,\n${signature}`;
  const followUp1 = `${greeting}\n\nJust following up on my note. I still think a small ${packagingUse} test could fit your ${category} products without changing the product itself.\n\nWould it be useful if I sent over a few simple directions?\n\nBest,\n${signature}`;
  const followUp2 = `${greeting}\n\nLast quick note from me. If packaging is not a priority right now, no problem at all.\n\nIf you do explore upgraded ${category} packaging later, I would be happy to share ideas around ${packagingUse}.\n\nBest,\n${signature}`;
  const chineseNote = `${brand} 可从“${packagingUse}”轻量切入。建议先给方向，不直接报价，不强调完整供应商能力，避免像群发广告。`;
  return { instagramDm: instagramDm.length > 500 ? `${instagramDm.slice(0, 496).trim()}...` : instagramDm, firstEmail, followUp1, followUp2, chineseNote };
};

export const analyzeCustomer = (lead: CustomerLead | undefined, search: SearchForm) => {
  if (!lead) return { selling: "请选择或新增一个客户后查看分析。", packaging: "", angle: "", avoid: "", dm: "", email: "", followUp: "" };
  const scripts = createDevelopmentScripts(lead, search);
  const evaluation = evaluateCustomer(lead, search);
  const category = cleanCategoryForCopy(lead.category || search.category);
  const packagingUse = getSuggestedPackagingUse(lead, search);
  return { selling: `${lead.brandName || "这个品牌"} 看起来主要销售 ${category} 相关产品。需要继续人工核对官网、Instagram 和产品页。`, packaging: lead.packagingNeed || `可能需要 ${packagingUse}。`, angle: lead.suggestedAngle || evaluation.angle, avoid: "不建议一上来推完整供应商服务、MOQ、报价或工厂能力。先从一个小包装方向切入，请对方看 2-3 个想法。", dm: scripts.instagramDm, email: scripts.firstEmail, followUp: `${scripts.followUp1}\n\n${scripts.followUp2}` };
};

export const escapeCsvValue = (value: string) => /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

export const createCustomerCsv = (customers: CustomerLead[], search: SearchForm) => {
  const headers = ["brand_name", "country", "category", "website", "instagram", "email", "contact_page", "packaging_need", "lead_score", "suggested_angle", "status", "notes", "first_message", "follow_up_1", "follow_up_2"];
  const rows = customers.map((lead) => {
    const scripts = createDevelopmentScripts(lead, search);
    return [lead.brandName, lead.country, lead.category, lead.website, lead.instagram, lead.email, lead.contactPage, lead.packagingNeed, lead.leadScore, lead.suggestedAngle, lead.status, lead.notes, scripts.instagramDm, scripts.followUp1, scripts.followUp2].map(escapeCsvValue).join(",");
  });
  return [headers.join(","), ...rows].join("\n");
};

export const directionToProductPhrase = (direction: ProductDirection) => direction === "Other" ? "custom paper product ideas" : direction.toLowerCase();

export const assessManualLead = (lead: ManualLeadForm) => {
  const text = normalize(lead.brandName, lead.currentProducts, lead.opportunity, lead.productDirection);
  const hasProductFit = hasAnyTerm(text, ["art supplies", "stationery", "watercolor", "watercolour", "sketchbook", "journal", "gift set", "notebook", "packaging", "paper bag", "kit"]) || lead.productDirection !== "Other";
  const hasBrandSignal = Boolean(lead.website.trim() || lead.instagram.trim());
  const hasWeakSignal = hasAnyTerm(text, ["wholesale", "distributor", "trading company", "software", "electronics", "machinery"]);
  let quality: LeadQuality = "Low";
  if (hasProductFit && hasBrandSignal && !hasWeakSignal) quality = "High";
  else if (hasProductFit || hasBrandSignal) quality = "Medium";
  if (hasWeakSignal && quality === "High") quality = "Medium";
  if (!hasProductFit && !hasBrandSignal) quality = "Low";
  const direction = directionToProductPhrase(lead.productDirection);
  return { quality, whyFit: quality === "High" ? "已有产品方向和品牌触点，适合围绕定制纸品或包装做轻量开发。" : quality === "Medium" ? "有部分匹配信号，但需要继续确认产品、品牌和联系方式。" : "当前信息和纸品、文具、画材或包装的关系较弱。", productOpportunity: lead.opportunity.trim() || `可以先测试 ${direction} 相关方向。`, outreachAngle: quality === "Low" ? "先确认是否有包装或纸品计划。" : "低压力询问是否愿意看几个产品方向。" };
};

export const createManualMessages = (lead: ManualLeadForm, assessment: ReturnType<typeof assessManualLead>) => {
  const brand = lead.brandName.trim() || "your brand";
  const currentProducts = shortText(lead.currentProducts || "your current products");
  const direction = directionToProductPhrase(lead.productDirection);
  const greeting = lead.brandName.trim() ? `Hi ${brand} team,` : "Hi there,";
  const subject = lead.brandName.trim() ? `Product extension ideas for ${brand}` : "A few custom paper product ideas";
  const emailBody = `${greeting}\n\nI came across ${brand} and noticed your focus on ${currentProducts}.\n\nOne practical opportunity could be ${assessment.productOpportunity} This could work as a branded add-on, a seasonal set, or a more polished retail presentation.\n\nZOVA Works helps brands develop custom paper products, retail packaging, paper bags, art kits, and export-ready assembly.\n\nWould you be open to seeing a few simple ${direction} directions?\n\nBest,\n${signature}`;
  const instagramDm = `Hi ${brand}, I noticed your ${currentProducts}. There may be a few custom paper or packaging directions around ${direction}. Would you be open to seeing 2-3 simple ideas?`;
  const followUps = `3-day follow-up:\n${greeting}\n\nJust a quick follow-up. Would it be useful if I sent a few ${direction} directions for ${brand}?\n\nBest,\n${signature}\n\nInterested reply:\n${greeting}\n\nThanks for getting back to me. I can prepare 2-3 focused directions around ${direction}, with notes on product format, packaging and export-ready assembly.\n\nBest,\n${signature}`;
  return { subject, emailBody, instagramDm, followUps };
};

export const formatManualLeadInfo = (lead: ManualLeadForm, assessment: ReturnType<typeof assessManualLead>) => `Brand Name: ${lead.brandName}\nCountry: ${lead.country}\nWebsite: ${lead.website}\nInstagram: ${lead.instagram}\nEmail: ${lead.email}\nCurrent Products: ${lead.currentProducts}\nOpportunity: ${lead.opportunity}\nProduct Direction: ${lead.productDirection}\n\nLead Quality: ${assessment.quality}\nWhy this lead may fit ZOVA Works: ${assessment.whyFit}\nSuggested product opportunity: ${assessment.productOpportunity}\nRecommended outreach angle: ${assessment.outreachAngle}`;