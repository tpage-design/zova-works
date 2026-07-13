import { useMemo, useState } from "react";
import {
  analyzeCustomer,
  assessManualLead,
  cleanCategoryForCopy,
  createCustomerCsv,
  createCustomerFromUrl,
  createDevelopmentScripts,
  createEmptyCustomer,
  createId,
  createInitialExportFields,
  createManualMessages,
  CustomerLead,
  CustomerStatus,
  CustomerType,
  customerTypeOptions,
  escapeCsvValue,
  evaluateCustomer,
  ExportFields,
  extractEmail,
  extractInstagram,
  extractUrls,
  Filters,
  formatManualLeadInfo,
  generateSearchKeywords,
  getSuggestedPackagingUse,
  initialManualLead,
  initialSearch,
  leadScoreOptions,
  LeadScore,
  ManualLeadForm,
  normalize,
  productDirections,
  ProductDirection,
  SearchForm,
  searchModes,
  SearchMode,
  SearchQuantity,
  SearchTask,
  serviceChinese,
  serviceOptions,
  ServiceLabel,
  shortText,
  statusOptions,
  toSearchCountry
} from "./leadToolData";

export function LeadTool() {
  const [search, setSearch] = useState<SearchForm>(initialSearch);
  const [customers, setCustomers] = useState<CustomerLead[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [filters, setFilters] = useState<Filters>({ text: "", score: "全部", status: "全部" });
  const [manualLead, setManualLead] = useState<ManualLeadForm>(initialManualLead);
  const [exportFields, setExportFields] = useState<ExportFields>(() => createInitialExportFields());
  const [savedTasks, setSavedTasks] = useState<SearchTask[]>([]);
  const [importText, setImportText] = useState("");
  const [websiteText, setWebsiteText] = useState("");
  const [copiedItem, setCopiedItem] = useState("");

  const keywords = useMemo(() => generateSearchKeywords(search), [search]);
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId) ?? customers[0];
  const selectedScripts = useMemo(() => createDevelopmentScripts(selectedCustomer ?? createEmptyCustomer(search), search), [selectedCustomer, search]);
  const customerAnalysis = useMemo(() => analyzeCustomer(selectedCustomer, search), [selectedCustomer, search]);
  const manualAssessment = useMemo(() => assessManualLead(manualLead), [manualLead]);
  const manualMessages = useMemo(() => createManualMessages(manualLead, manualAssessment), [manualLead, manualAssessment]);
  const manualLeadInfo = useMemo(() => formatManualLeadInfo(manualLead, manualAssessment), [manualLead, manualAssessment]);

  const filteredCustomers = useMemo(() => {
    const text = filters.text.trim().toLowerCase();
    return customers.filter((customer) => {
      const haystack = normalize(customer.brandName, customer.country, customer.category, customer.website, customer.instagram, customer.email, customer.packagingNeed, customer.suggestedAngle, customer.notes);
      return (!text || haystack.includes(text)) && (filters.score === "全部" || customer.leadScore === filters.score) && (filters.status === "全部" || customer.status === filters.status);
    });
  }, [customers, filters]);

  const copyText = async (item: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = value;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
    }
    setCopiedItem(item);
    window.setTimeout(() => setCopiedItem(""), 1800);
  };

  const updateSearchField = <Field extends keyof SearchForm>(field: Field, value: SearchForm[Field]) => setSearch((current) => ({ ...current, [field]: value }));
  const toggleService = (service: ServiceLabel) => setSearch((current) => ({ ...current, services: current.services.includes(service) ? current.services.filter((item) => item !== service) : [...current.services, service] }));
  const toggleCustomerType = (type: CustomerType) => setSearch((current) => ({ ...current, customerTypes: current.customerTypes.includes(type) ? current.customerTypes.filter((item) => item !== type) : [...current.customerTypes, type] }));

  const addCustomer = (lead?: CustomerLead) => {
    const nextLead = lead ?? createEmptyCustomer(search);
    setCustomers((current) => [nextLead, ...current]);
    setSelectedCustomerId(nextLead.id);
  };

  const updateCustomerField = <Field extends keyof CustomerLead>(id: string, field: Field, value: CustomerLead[Field]) => {
    setCustomers((current) => current.map((customer) => {
      if (customer.id !== id) return customer;
      const next = { ...customer, [field]: value } as CustomerLead;
      if (!["leadScore", "suggestedAngle", "status", "notes", "id"].includes(field)) {
        const evaluation = evaluateCustomer(next, search);
        next.leadScore = evaluation.score;
        next.suggestedAngle = evaluation.angle;
      }
      return next;
    }));
  };

  const refreshSelectedScore = () => {
    if (!selectedCustomer) return;
    const evaluation = evaluateCustomer(selectedCustomer, search);
    setCustomers((current) => current.map((customer) => customer.id === selectedCustomer.id ? { ...customer, leadScore: evaluation.score, suggestedAngle: evaluation.angle } : customer));
  };

  const fillManualFromSelected = () => {
    if (!selectedCustomer) return;
    setManualLead({ brandName: selectedCustomer.brandName, country: selectedCustomer.country, website: selectedCustomer.website, instagram: selectedCustomer.instagram, email: selectedCustomer.email, currentProducts: selectedCustomer.category, opportunity: selectedCustomer.packagingNeed, productDirection: "Retail Packaging" });
  };

  const saveSearchTask = () => {
    setSavedTasks((current) => [{ id: createId(), createdAt: new Date().toLocaleString(), country: search.country, category: search.category, services: serviceChinese(search.services), keywords }, ...current].slice(0, 6));
  };

  const openSearch = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(keywords[0] ?? "")}`, "_blank", "noopener,noreferrer");

  const importLinks = () => {
    const urls = extractUrls(importText).slice(0, Number(search.quantity));
    if (!urls.length) return;
    const nextCustomers = urls.map((url) => createCustomerFromUrl(url, search, importText));
    setCustomers((current) => [...nextCustomers, ...current]);
    setSelectedCustomerId(nextCustomers[0].id);
  };

  const analyzeSearchText = () => {
    const urls = extractUrls(importText).slice(0, Number(search.quantity));
    if (urls.length) {
      const nextCustomers = urls.map((url) => createCustomerFromUrl(url, search, importText));
      setCustomers((current) => [...nextCustomers, ...current]);
      setSelectedCustomerId(nextCustomers[0].id);
      return;
    }
    const lead = createEmptyCustomer(search);
    const enriched = { ...lead, brandName: "待确认客户", email: extractEmail(importText), instagram: extractInstagram(importText), notes: shortText(importText, 220) };
    const evaluation = evaluateCustomer(enriched, search);
    addCustomer({ ...enriched, leadScore: evaluation.score, suggestedAngle: evaluation.angle });
  };

  const applyWebsiteInfo = () => {
    if (!selectedCustomer) return;
    const text = normalize(websiteText);
    const packagingSignals = [
      text.includes("gift box") || text.includes("box") || text.includes("包装盒") ? "礼盒 / 彩盒" : "",
      text.includes("label") || text.includes("标签") ? "标签" : "",
      text.includes("insert") || text.includes("card") || text.includes("说明卡") || text.includes("感谢卡") ? "说明卡 / 感谢卡" : "",
      text.includes("paper bag") || text.includes("shopping bag") || text.includes("纸袋") ? "纸袋" : ""
    ].filter(Boolean).join(" / ");
    const next = { ...selectedCustomer, email: extractEmail(websiteText) || selectedCustomer.email, instagram: extractInstagram(websiteText) || selectedCustomer.instagram, contactPage: extractUrls(websiteText).find((url) => /contact/i.test(url)) ?? selectedCustomer.contactPage, packagingNeed: packagingSignals || selectedCustomer.packagingNeed, notes: websiteText ? `官网信息摘录：${shortText(websiteText, 180)}` : selectedCustomer.notes };
    const evaluation = evaluateCustomer(next, search);
    setCustomers((current) => current.map((customer) => customer.id === selectedCustomer.id ? { ...next, leadScore: evaluation.score, suggestedAngle: evaluation.angle } : customer));
  };

  const downloadCustomerCsv = () => downloadFile("zova-customer-leads.csv", createCustomerCsv(customers, search));
  const downloadManualCsv = () => {
    const headers = ["Brand Name", "Country", "Website", "Instagram", "Email", "Product Category", "Opportunity", "Lead Quality", "Message Sent", "Reply Status", "Follow-up Date", "Notes"];
    const row = [manualLead.brandName, manualLead.country, manualLead.website, manualLead.instagram, manualLead.email, manualLead.productDirection, manualLead.opportunity, manualAssessment.quality, exportFields.messageSent, exportFields.replyStatus, exportFields.followUpDate, exportFields.notes];
    downloadFile("zova-manual-lead.csv", `${headers.map(escapeCsvValue).join(",")}\n${row.map(escapeCsvValue).join(",")}`);
  };

  const downloadFile = (filename: string, text: string) => {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scoreClass = (score: LeadScore) => `lead-tool__score lead-tool__score--${score === "高" ? "high" : score === "中" ? "medium" : "low"}`;
  const qualityClass = (quality: string) => `lead-tool__quality lead-tool__quality--${quality.toLowerCase()}`;
  const updateManual = <Field extends keyof ManualLeadForm>(field: Field, value: ManualLeadForm[Field]) => setManualLead((current) => ({ ...current, [field]: value }));

  return (
    <div className="lead-tool">
      <header className="lead-tool__topbar">
        <a className="brand-mark" href="/" aria-label="ZOVA Works home"><span>ZOVA</span><span>Works</span></a>
        <nav className="lead-tool__topnav" aria-label="客户开发工作台导航"><a href="#search">客户检索</a><a href="#manual">客户信息整理</a><a href="#customers">客户筛选</a><a href="#scripts">开发话术</a></nav>
        <a className="lead-tool__home-link" href="/">返回官网</a>
      </header>

      <main className="lead-tool__shell">
        <section className="lead-tool__hero" aria-labelledby="lead-tool-title">
          <div><span className="lead-tool__kicker">Packaging Export Lead Desk</span><h1 id="lead-tool-title">ZOVA Works 客户开发工作台</h1><p>从目标品类出发，检索潜在客户、判断匹配度、生成开发话术和跟进记录。</p></div>
          <div className="lead-tool__summary" aria-label="工作台概览"><span>当前检索</span><strong>{toSearchCountry(search.country)} · {cleanCategoryForCopy(search.category)}</strong><small>{customers.length} 个候选客户，{customers.filter((item) => item.leadScore === "高").length} 个高匹配。</small></div>
        </section>

        <section id="search" className="lead-tool__section lead-tool__section--search" aria-labelledby="search-title">
          <div className="lead-tool__section-head"><span>第一部分</span><h2 id="search-title">客户自动检索</h2><p>这个工具不是自动群发工具。它的作用是帮助你从目标品类中发现潜在客户，整理客户信息，判断是否适合联系，并生成更自然的开发话术。请避免批量骚扰式群发。优先联系和你们包装服务真正匹配的品牌。</p></div>
          <div className="lead-tool__search-layout">
            <form className="lead-tool__panel" onSubmit={(event) => event.preventDefault()}>
              <div className="lead-tool__panel-header"><h3>检索条件</h3><button className="lead-tool__ghost-button" type="button" onClick={() => copyText("keywords", keywords.join("\n"))}>{copiedItem === "keywords" ? "已复制" : "复制关键词"}</button></div>
              <div className="lead-tool__form-grid">
                <label className="lead-tool__field"><span>目标国家 / 地区</span><input value={search.country} onChange={(event) => updateSearchField("country", event.target.value)} placeholder="例如：美国、英国、澳大利亚、加拿大" /></label>
                <label className="lead-tool__field"><span>目标品类</span><input value={search.category} onChange={(event) => updateSearchField("category", event.target.value)} placeholder="例如：香薰蜡烛、护肤品、手工皂、咖啡、茶叶、饰品、服装品牌" /></label>
                <div className="lead-tool__field lead-tool__field--wide"><span>我能提供的服务</span><div className="lead-tool__checkbox-grid">{serviceOptions.map((service) => <label key={service.label} className="lead-tool__check-pill"><input type="checkbox" checked={search.services.includes(service.label)} onChange={() => toggleService(service.label)} /><span>{service.label}</span></label>)}</div></div>
                <div className="lead-tool__field lead-tool__field--wide"><span>客户类型</span><div className="lead-tool__checkbox-grid">{customerTypeOptions.map((type) => <label key={type} className="lead-tool__check-pill"><input type="checkbox" checked={search.customerTypes.includes(type)} onChange={() => toggleCustomerType(type)} /><span>{type}</span></label>)}</div></div>
                <label className="lead-tool__field"><span>检索数量</span><select value={search.quantity} onChange={(event) => updateSearchField("quantity", event.target.value as SearchQuantity)}><option value="10">10</option><option value="20">20</option><option value="50">50</option></select></label>
                <div className="lead-tool__field"><span>检索方式</span><div className="lead-tool__segmented">{searchModes.map((mode) => <button key={mode} className={search.mode === mode ? "is-active" : ""} type="button" onClick={() => updateSearchField("mode", mode as SearchMode)}>{mode}</button>)}</div></div>
              </div>
            </form>
            <div className="lead-tool__panel lead-tool__keywords-panel">
              <div className="lead-tool__panel-header"><h3>英文搜索关键词</h3><div className="lead-tool__button-row"><button className="lead-tool__ghost-button" type="button" onClick={openSearch}>打开搜索</button><button className="lead-tool__dark-button" type="button" onClick={saveSearchTask}>保存到检索任务</button></div></div>
              <div className="lead-tool__keywords">{keywords.map((keyword) => <code key={keyword}>{keyword}</code>)}</div>
              <div className="lead-tool__mode-panel"><label className="lead-tool__field lead-tool__field--wide"><span>{search.mode === "官网信息提取" ? "粘贴官网文字 / 联系页内容" : "粘贴客户链接、搜索结果或备注"}</span><textarea value={search.mode === "官网信息提取" ? websiteText : importText} onChange={(event) => search.mode === "官网信息提取" ? setWebsiteText(event.target.value) : setImportText(event.target.value)} placeholder={search.mode === "手动导入客户链接" ? "每行一个官网、Instagram 或联系页链接" : search.mode === "搜索结果分析" ? "粘贴 Google 搜索结果标题、摘要、链接、邮箱等内容" : search.mode === "官网信息提取" ? "粘贴官网 About / Contact / Product 页面中的文字，系统会提取邮箱、Instagram、联系页和包装信号" : "可先生成关键词，再粘贴你人工找到的结果。"} /></label><div className="lead-tool__button-row"><button className="lead-tool__ghost-button" type="button" onClick={importLinks}>从链接生成客户</button><button className="lead-tool__ghost-button" type="button" onClick={analyzeSearchText}>分析搜索结果</button><button className="lead-tool__ghost-button" type="button" onClick={applyWebsiteInfo}>提取到选中客户</button></div></div>
              {savedTasks.length > 0 && <div className="lead-tool__tasks"><span>已保存检索任务</span>{savedTasks.map((task) => <button key={task.id} type="button" onClick={() => copyText(task.id, task.keywords.join("\n"))}>{task.category} · {task.country} · {task.createdAt}</button>)}</div>}
            </div>
          </div>
        </section>

        <section id="manual" className="lead-tool__section" aria-labelledby="manual-title">
          <div className="lead-tool__section-head"><span>第二部分</span><h2 id="manual-title">客户信息整理</h2><p>保留原来的单客户整理能力：适合你已经知道品牌信息时，快速判断价值并生成一组英文开发信。</p></div>
          <section className="lead-tool__workspace" aria-label="客户信息整理工作区">
            <form className="lead-tool__panel lead-tool__form-panel" onSubmit={(event) => event.preventDefault()}>
              <div className="lead-tool__panel-header"><h3>客户信息输入</h3><div className="lead-tool__button-row"><button className="lead-tool__ghost-button" type="button" onClick={fillManualFromSelected}>填入选中客户</button><button className="lead-tool__ghost-button" type="button" onClick={() => setManualLead(initialManualLead)}>重置</button></div></div>
              <div className="lead-tool__form-grid">
                <label className="lead-tool__field"><span>Brand Name</span><input value={manualLead.brandName} onChange={(event) => updateManual("brandName", event.target.value)} placeholder="e.g. Oak & Ink Studio" /></label>
                <label className="lead-tool__field"><span>Country</span><input value={manualLead.country} onChange={(event) => updateManual("country", event.target.value)} placeholder="e.g. United States" /></label>
                <label className="lead-tool__field"><span>Website</span><input value={manualLead.website} onChange={(event) => updateManual("website", event.target.value)} placeholder="https://" /></label>
                <label className="lead-tool__field"><span>Instagram</span><input value={manualLead.instagram} onChange={(event) => updateManual("instagram", event.target.value)} placeholder="@brand" /></label>
                <label className="lead-tool__field"><span>Email</span><input type="email" value={manualLead.email} onChange={(event) => updateManual("email", event.target.value)} placeholder="buyer@brand.com" /></label>
                <label className="lead-tool__field"><span>Product Direction</span><select value={manualLead.productDirection} onChange={(event) => updateManual("productDirection", event.target.value as ProductDirection)}>{productDirections.map((direction) => <option key={direction} value={direction}>{direction}</option>)}</select></label>
                <label className="lead-tool__field lead-tool__field--wide"><span>Current Products</span><textarea value={manualLead.currentProducts} onChange={(event) => updateManual("currentProducts", event.target.value)} placeholder="Products, categories, visible packaging, gift sets, art supplies..." /></label>
                <label className="lead-tool__field lead-tool__field--wide"><span>Opportunity</span><textarea value={manualLead.opportunity} onChange={(event) => updateManual("opportunity", event.target.value)} placeholder="Why this brand may need custom paper products, packaging, kits, or assembly." /></label>
              </div>
            </form>
            <div className="lead-tool__results"><ManualResults copiedItem={copiedItem} copyText={copyText} manualAssessment={manualAssessment} manualLeadInfo={manualLeadInfo} manualMessages={manualMessages} qualityClass={qualityClass} exportFields={exportFields} setExportFields={setExportFields} downloadManualCsv={downloadManualCsv} /></div>
          </section>
        </section>

        <section id="customers" className="lead-tool__section" aria-labelledby="customers-title">
          <div className="lead-tool__section-head lead-tool__section-head--inline"><div><span>第三部分</span><h2 id="customers-title">客户列表与筛选</h2><p>把人工找到的链接、搜索结果和官网信息整理为客户表，再按匹配度和跟进状态筛选。</p></div><div className="lead-tool__button-row"><button className="lead-tool__ghost-button" type="button" onClick={() => addCustomer()}>新增客户</button><button className="lead-tool__dark-button" type="button" onClick={downloadCustomerCsv}>导出客户列表 CSV</button></div></div>
          <div className="lead-tool__panel lead-tool__filter-panel"><label className="lead-tool__field"><span>关键词筛选</span><input value={filters.text} onChange={(event) => setFilters((current) => ({ ...current, text: event.target.value }))} placeholder="品牌、国家、品类、邮箱、备注" /></label><label className="lead-tool__field"><span>匹配度</span><select value={filters.score} onChange={(event) => setFilters((current) => ({ ...current, score: event.target.value as Filters["score"] }))}><option>全部</option>{leadScoreOptions.map((score) => <option key={score}>{score}</option>)}</select></label><label className="lead-tool__field"><span>状态</span><select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value as Filters["status"] }))}><option>全部</option>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label><button className="lead-tool__ghost-button" type="button" onClick={refreshSelectedScore}>重新判断选中客户</button></div>
          <CustomerTable customers={filteredCustomers} selectedId={selectedCustomer?.id ?? ""} setSelectedCustomerId={setSelectedCustomerId} updateCustomerField={updateCustomerField} scoreClass={scoreClass} />
        </section>

        <section className="lead-tool__section lead-tool__analysis-section" aria-labelledby="analysis-title"><div className="lead-tool__section-head"><span>第四部分</span><h2 id="analysis-title">客户分析</h2><p>点击客户列表中的某一行后，这里会根据品类、包装需求和联系方式生成分析。</p></div><div className="lead-tool__analysis-grid">{[["这个品牌卖什么", customerAnalysis.selling], ["它可能需要什么包装", customerAnalysis.packaging], ["推荐切入点", customerAnalysis.angle], ["不建议怎么推", customerAnalysis.avoid], ["第一条私信建议", customerAnalysis.dm], ["第一封邮件建议", customerAnalysis.email], ["后续跟进建议", customerAnalysis.followUp]].map(([title, body]) => <article className="lead-tool__analysis-card" key={title}><span>{title}</span><pre>{body}</pre></article>)}</div></section>

        <section id="scripts" className="lead-tool__section" aria-labelledby="scripts-title">
          <div className="lead-tool__section-head lead-tool__section-head--inline"><div><span>第五部分</span><h2 id="scripts-title">开发话术生成</h2><p>根据选中客户的品类和包装需求，生成低压力、不像群发广告的英文开发话术。</p></div><button className="lead-tool__ghost-button" type="button" onClick={() => copyText("selected-all", `${selectedScripts.instagramDm}\n\n${selectedScripts.firstEmail}\n\n${selectedScripts.followUp1}\n\n${selectedScripts.followUp2}\n\n${selectedScripts.chineseNote}`)}>{copiedItem === "selected-all" ? "已复制" : "复制全部话术"}</button></div>
          <div className="lead-tool__script-grid"><ScriptPanel title="Instagram 私信" body={selectedScripts.instagramDm} copied={copiedItem === "selected-dm"} onCopy={() => copyText("selected-dm", selectedScripts.instagramDm)} meta={`${selectedScripts.instagramDm.length}/500 characters`} /><ScriptPanel title="第一封英文邮件" body={selectedScripts.firstEmail} copied={copiedItem === "selected-email"} onCopy={() => copyText("selected-email", selectedScripts.firstEmail)} /><ScriptPanel title="第二次跟进" body={selectedScripts.followUp1} copied={copiedItem === "selected-f1"} onCopy={() => copyText("selected-f1", selectedScripts.followUp1)} /><ScriptPanel title="第三次跟进" body={selectedScripts.followUp2} copied={copiedItem === "selected-f2"} onCopy={() => copyText("selected-f2", selectedScripts.followUp2)} /><ScriptPanel title="中文备注" body={selectedScripts.chineseNote} copied={copiedItem === "selected-note"} onCopy={() => copyText("selected-note", selectedScripts.chineseNote)} wide /></div>
        </section>

        <section className="lead-tool__section lead-tool__future" aria-label="未来扩展接口"><span>未来可扩展接口已预留</span><p>搜索 API、官网内容抓取、邮箱提取、Instagram 链接提取、客户评分模型、邮件发送工具、CRM 跟进记录。</p></section>
      </main>
    </div>
  );
}

type ManualResultsProps = { copiedItem: string; copyText: (item: string, value: string) => void; manualAssessment: ReturnType<typeof assessManualLead>; manualLeadInfo: string; manualMessages: ReturnType<typeof createManualMessages>; qualityClass: (quality: string) => string; exportFields: ExportFields; setExportFields: React.Dispatch<React.SetStateAction<ExportFields>>; downloadManualCsv: () => void; };

function ManualResults({ copiedItem, copyText, manualAssessment, manualLeadInfo, manualMessages, qualityClass, exportFields, setExportFields, downloadManualCsv }: ManualResultsProps) {
  return <>
    <section className="lead-tool__panel"><div className="lead-tool__panel-header"><h3>客户价值判断</h3><button className="lead-tool__ghost-button" type="button" onClick={() => copyText("manual-info", manualLeadInfo)}>{copiedItem === "manual-info" ? "已复制" : "复制客户信息"}</button></div><div className="lead-tool__fit-grid"><div><span>Lead Quality</span><strong className={qualityClass(manualAssessment.quality)}>{manualAssessment.quality}</strong></div><div><span>Why this lead may fit ZOVA Works</span><p>{manualAssessment.whyFit}</p></div><div><span>Suggested product opportunity</span><p>{manualAssessment.productOpportunity}</p></div><div><span>Recommended outreach angle</span><p>{manualAssessment.outreachAngle}</p></div></div></section>
    <ScriptPanel title="自动生成英文开发信" body={`Subject: ${manualMessages.subject}\n\n${manualMessages.emailBody}`} copied={copiedItem === "manual-email"} onCopy={() => copyText("manual-email", `Subject: ${manualMessages.subject}\n\n${manualMessages.emailBody}`)} />
    <ScriptPanel title="Instagram 私信与跟进" body={`${manualMessages.instagramDm}\n\n${manualMessages.followUps}`} copied={copiedItem === "manual-follow"} onCopy={() => copyText("manual-follow", `${manualMessages.instagramDm}\n\n${manualMessages.followUps}`)} />
    <section className="lead-tool__panel"><div className="lead-tool__panel-header"><h3>导出</h3><button className="lead-tool__dark-button" type="button" onClick={downloadManualCsv}>导出单客户 CSV</button></div><div className="lead-tool__export-grid"><label className="lead-tool__field"><span>Message Sent</span><select value={exportFields.messageSent} onChange={(event) => setExportFields((current) => ({ ...current, messageSent: event.target.value }))}><option>No</option><option>Yes</option></select></label><label className="lead-tool__field"><span>Reply Status</span><select value={exportFields.replyStatus} onChange={(event) => setExportFields((current) => ({ ...current, replyStatus: event.target.value }))}><option>No reply</option><option>Interested</option><option>Not a fit</option><option>Follow up later</option></select></label><label className="lead-tool__field"><span>Follow-up Date</span><input type="date" value={exportFields.followUpDate} onChange={(event) => setExportFields((current) => ({ ...current, followUpDate: event.target.value }))} /></label><label className="lead-tool__field lead-tool__field--wide"><span>Notes</span><textarea value={exportFields.notes} onChange={(event) => setExportFields((current) => ({ ...current, notes: event.target.value }))} placeholder="Internal notes for CSV export." /></label></div></section>
  </>;
}

type CustomerTableProps = { customers: CustomerLead[]; selectedId: string; setSelectedCustomerId: (id: string) => void; updateCustomerField: <Field extends keyof CustomerLead>(id: string, field: Field, value: CustomerLead[Field]) => void; scoreClass: (score: LeadScore) => string; };

function CustomerTable({ customers, selectedId, setSelectedCustomerId, updateCustomerField, scoreClass }: CustomerTableProps) {
  return <div className="lead-tool__table-wrap"><table className="lead-tool__table"><thead><tr><th>品牌名称</th><th>国家 / 地区</th><th>品类</th><th>官网</th><th>Instagram</th><th>联系邮箱</th><th>联系页面</th><th>可能需要的包装</th><th>匹配度</th><th>推荐切入点</th><th>状态</th><th>备注</th></tr></thead><tbody>{customers.length === 0 ? <tr><td colSpan={12} className="lead-tool__empty-cell">暂无客户。可以先生成关键词，手动打开搜索，再粘贴链接生成客户草稿。</td></tr> : customers.map((customer) => <tr key={customer.id} className={selectedId === customer.id ? "is-selected" : ""} onClick={() => setSelectedCustomerId(customer.id)}><td><input value={customer.brandName} onChange={(event) => updateCustomerField(customer.id, "brandName", event.target.value)} placeholder="品牌名称" /></td><td><input value={customer.country} onChange={(event) => updateCustomerField(customer.id, "country", event.target.value)} placeholder="国家" /></td><td><input value={customer.category} onChange={(event) => updateCustomerField(customer.id, "category", event.target.value)} placeholder="品类" /></td><td><input value={customer.website} onChange={(event) => updateCustomerField(customer.id, "website", event.target.value)} placeholder="https://" /></td><td><input value={customer.instagram} onChange={(event) => updateCustomerField(customer.id, "instagram", event.target.value)} placeholder="@ / URL" /></td><td><input value={customer.email} onChange={(event) => updateCustomerField(customer.id, "email", event.target.value)} placeholder="email" /></td><td><input value={customer.contactPage} onChange={(event) => updateCustomerField(customer.id, "contactPage", event.target.value)} placeholder="contact page" /></td><td><input value={customer.packagingNeed} onChange={(event) => updateCustomerField(customer.id, "packagingNeed", event.target.value)} placeholder="彩盒 / 标签 / 纸袋" /></td><td><select className={scoreClass(customer.leadScore)} value={customer.leadScore} onChange={(event) => updateCustomerField(customer.id, "leadScore", event.target.value as LeadScore)}>{leadScoreOptions.map((score) => <option key={score}>{score}</option>)}</select></td><td><input value={customer.suggestedAngle} onChange={(event) => updateCustomerField(customer.id, "suggestedAngle", event.target.value)} placeholder="推荐切入点" /></td><td><select value={customer.status} onChange={(event) => updateCustomerField(customer.id, "status", event.target.value as CustomerStatus)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></td><td><input value={customer.notes} onChange={(event) => updateCustomerField(customer.id, "notes", event.target.value)} placeholder="备注" /></td></tr>)}</tbody></table></div>;
}

type ScriptPanelProps = { title: string; body: string; copied: boolean; onCopy: () => void; meta?: string; wide?: boolean; };

function ScriptPanel({ title, body, copied, onCopy, meta, wide }: ScriptPanelProps) {
  return <section className={`lead-tool__panel ${wide ? "lead-tool__panel--wide" : ""}`}><div className="lead-tool__panel-header"><h3>{title}</h3><button className="lead-tool__ghost-button" type="button" onClick={onCopy}>{copied ? "已复制" : "复制"}</button></div><div className="lead-tool__message"><pre>{body}</pre>{meta && <small>{meta}</small>}</div></section>;
}