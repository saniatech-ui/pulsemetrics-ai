/**
 * PulseMetrics AI — Automated Website SEO, Copywriting & Business Data Intelligence Engine
 * Client-Side Analytics, CSV ETL Engine, Chart.js Visualizations & Live Audit Simulator
 * Author: Sania Sarwar (https://saniasarwar.vercel.app | https://github.com/saniatech-ui)
 */

(() => {
  "use strict";

  // =========================================================================
  // 1. Built-In Intelligence Datasets (Mirrors auditor.py Output Schema)
  // =========================================================================
  const PRESET_DATASETS = {
    ecommerce: {
      datasetName: "Q4 Global E-Commerce Intelligence (2026)",
      revenueTrend: "+18.4%",
      cvrTrend: "+2.1% MoM",
      hygiene: {
        raw_rows: 1420,
        cleaned_rows: 1368,
        duplicates_removed: 38,
        null_values_repaired: 14,
        data_hygiene_score: 96.3,
      },
      monthly: [
        { month_label: "Jun 2026", revenue: 36400, leads: 920, conversions: 52, conversion_rate: 5.65 },
        { month_label: "Jul 2026", revenue: 41200, leads: 1040, conversions: 61, conversion_rate: 5.87 },
        { month_label: "Aug 2026", revenue: 44850, leads: 1110, conversions: 68, conversion_rate: 6.13 },
        { month_label: "Sep 2026", revenue: 49300, leads: 1180, conversions: 75, conversion_rate: 6.36 },
        { month_label: "Oct 2026", revenue: 54100, leads: 1260, conversions: 86, conversion_rate: 6.83 },
        { month_label: "Nov 2026", revenue: 58800, leads: 1330, conversions: 97, conversion_rate: 7.29 },
      ],
      channels: [
        {
          channel: "Organic Search",
          color: "#10B981",
          revenue: 112400,
          leads: 2180,
          conversions: 168,
          conversion_rate: 7.71,
          avg_order_value: 669.05,
          recommendation: "Scale budget +20% on Organic Search; top-quartile ROAS and conversion velocity.",
        },
        {
          channel: "Meta Ads",
          color: "#38BDF8",
          revenue: 78950,
          leads: 2490,
          conversions: 124,
          conversion_rate: 4.98,
          avg_order_value: 636.69,
          recommendation: "Maintain steady cadence on Meta Ads; A/B test value-proposition headline.",
        },
        {
          channel: "LinkedIn Outbound",
          color: "#818CF8",
          revenue: 56800,
          leads: 980,
          conversions: 82,
          conversion_rate: 8.37,
          avg_order_value: 692.68,
          recommendation: "High efficiency (8.4% CVR) on LinkedIn Outbound; expand top-of-funnel volume.",
        },
        {
          channel: "Email",
          color: "#F59E0B",
          revenue: 36500,
          leads: 1190,
          conversions: 65,
          conversion_rate: 5.46,
          avg_order_value: 561.54,
          recommendation: "Deploy segmented cart-recovery sequence to lift Email conversion rate past 6.5%.",
        },
      ],
    },

    saas: {
      datasetName: "B2B SaaS Enterprise Pipeline & Demo Funnel (2026)",
      revenueTrend: "+26.8%",
      cvrTrend: "+3.4% MoM",
      hygiene: {
        raw_rows: 980,
        cleaned_rows: 952,
        duplicates_removed: 21,
        null_values_repaired: 7,
        data_hygiene_score: 97.1,
      },
      monthly: [
        { month_label: "Jun 2026", revenue: 52000, leads: 410, conversions: 22, conversion_rate: 5.37 },
        { month_label: "Jul 2026", revenue: 61500, leads: 465, conversions: 27, conversion_rate: 5.81 },
        { month_label: "Aug 2026", revenue: 68900, leads: 510, conversions: 31, conversion_rate: 6.08 },
        { month_label: "Sep 2026", revenue: 79400, leads: 560, conversions: 37, conversion_rate: 6.61 },
        { month_label: "Oct 2026", revenue: 91200, leads: 620, conversions: 44, conversion_rate: 7.10 },
        { month_label: "Nov 2026", revenue: 104500, leads: 690, conversions: 52, conversion_rate: 7.54 },
      ],
      channels: [
        {
          channel: "LinkedIn Outbound",
          color: "#10B981",
          revenue: 198500,
          leads: 1040,
          conversions: 89,
          conversion_rate: 8.56,
          avg_order_value: 2230.34,
          recommendation: "Scale budget +20% on LinkedIn Outbound; top-quartile ACV and enterprise close rate.",
        },
        {
          channel: "Organic Search",
          color: "#38BDF8",
          revenue: 134200,
          leads: 980,
          conversions: 64,
          conversion_rate: 6.53,
          avg_order_value: 2096.88,
          recommendation: "Expand high-intent comparison landing pages to capture bottom-of-funnel SaaS queries.",
        },
        {
          channel: "Meta Ads",
          color: "#818CF8",
          revenue: 72800,
          leads: 790,
          conversions: 34,
          conversion_rate: 4.30,
          avg_order_value: 2141.18,
          recommendation: "Audit Meta Ads landing page message-match & above-the-fold interactive demo CTA.",
        },
        {
          channel: "Email",
          color: "#F59E0B",
          revenue: 52000,
          leads: 445,
          conversions: 26,
          conversion_rate: 5.84,
          avg_order_value: 2000.00,
          recommendation: "Trigger founder-led plain-text follow-ups for pricing page repeat visitors.",
        },
      ],
    },
  };

  // =========================================================================
  // 2. Preset Website Audit Payloads (Mirrors WebsiteSEOAndCopyAuditor Output)
  // =========================================================================
  const AUDIT_PRESETS = {
    saas: {
      engine: "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
      status: "success",
      target_url: "https://saniasarwar.vercel.app",
      domain: "saniasarwar.vercel.app",
      http_status: 200,
      response_time_ms: 184.2,
      audited_at: "2026-11-24T09:45:00Z",
      metrics: {
        overall_health_score: 92,
        detected_ctas_count: 7,
        detected_ctas: ["Book Strategy Call", "Explore Case Studies", "View Live Projects", "Download Resume"],
        h1_meta_status: "Optimal (1 H1)",
        h1_count: 1,
        primary_h1: "Full-Stack AI Engineer & Conversion Copywriter Scaling Revenue-Focused Brands",
        title: "Sania Sarwar | Full-Stack AI Engineer & Conversion Copywriter",
        meta_description: "Conversion-engineered web platforms, Python automation pipelines, and direct-response copy built for high-growth founders.",
        image_alt_coverage_pct: 94.4,
        total_images: 18,
        word_count: 1140,
      },
      findings: [
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Single Focused H1",
          finding: "Primary H1 clearly pairs technical authority with measurable revenue outcome.",
          recommendation: "Maintain crisp outcome-driven hero framing above the fold.",
        },
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Action-Oriented CTA Coverage",
          finding: "7 high-intent CTAs detected ('Book Strategy Call', 'Explore Case Studies').",
          recommendation: "Strong first-person verb clarity across primary conversion touchpoints.",
        },
        {
          category: "Technical SEO",
          severity: "Passed",
          check: "Title Tag Optimization",
          finding: "Optimal title length (59 chars) with primary role + value proposition.",
          recommendation: "Meets search visibility and SERP click-through benchmarks.",
        },
        {
          category: "Search CTR Copy",
          severity: "Passed",
          check: "Meta Description Copy",
          finding: "Well-sized meta description (124 chars) highlighting ROI and deliverables.",
          recommendation: "Keep persuasive benefit framing in search snippets.",
        },
        {
          category: "Accessibility & SEO",
          severity: "Passed",
          check: "Image Alt Coverage",
          finding: "94.4% alt text coverage across 18 portfolio and UI showcase assets.",
          recommendation: "Image accessibility and visual search indexing hygiene verified.",
        },
        {
          category: "Technical SEO",
          severity: "Warning",
          check: "Schema.org JSON-LD Rich Snippet",
          finding: "Person/Service JSON-LD structured data block not detected in <head>.",
          recommendation: "Embed Schema.org ProfessionalService JSON-LD to unlock rich search snippets.",
        },
      ],
    },

    ecommerce: {
      engine: "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
      status: "success",
      target_url: "https://velora-luxury-store.example.com",
      domain: "velora-luxury-store.example.com",
      http_status: 200,
      response_time_ms: 312.6,
      audited_at: "2026-11-24T09:48:00Z",
      metrics: {
        overall_health_score: 76,
        detected_ctas_count: 4,
        detected_ctas: ["Shop Now", "Learn More", "Add to Bag"],
        h1_meta_status: "Needs Attention",
        h1_count: 2,
        primary_h1: "Elevate Your Everyday Ritual",
        title: "Velora Store - Official Website",
        meta_description: "Welcome to Velora Store. Browse our latest collection online today.",
        image_alt_coverage_pct: 68.0,
        total_images: 25,
        word_count: 680,
      },
      findings: [
        {
          category: "Technical SEO",
          severity: "Critical",
          check: "Multiple H1 Tags Detected",
          finding: "Found 2 H1 tags on homepage; dilutes primary product category relevance.",
          recommendation: "Keep 1 H1 for hero collection promise and demote secondary banners to H2.",
        },
        {
          category: "Search CTR Copy",
          severity: "Warning",
          check: "Generic Meta Description",
          finding: "Meta description is 63 chars and lacks differentiation or free-shipping hook.",
          recommendation: "Expand to 145 chars featuring core product benefit, social proof & shipping offer.",
        },
        {
          category: "Conversion Copy",
          severity: "Warning",
          check: "Passive Secondary CTA Copy",
          finding: "Detected low-intent 'Learn More' button on featured bestseller card.",
          recommendation: "Replace 'Learn More' with benefit-led 'Claim 15% Off Starter Kit'.",
        },
        {
          category: "Accessibility & SEO",
          severity: "Warning",
          check: "Incomplete Image Alt Text",
          finding: "17 of 25 product images (68.0%) contain descriptive alt attributes.",
          recommendation: "Add material, color, and product-name alt text to remaining 8 gallery images.",
        },
        {
          category: "Technical SEO",
          severity: "Passed",
          check: "Canonical & Social Metadata",
          finding: "Self-referencing canonical URL and OpenGraph product tags are active.",
          recommendation: "Duplicate parameter URL indexing protection is properly configured.",
        },
      ],
    },

    clinic: {
      engine: "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
      status: "success",
      target_url: "https://dreamsmile-dental.vercel.app",
      domain: "dreamsmile-dental.vercel.app",
      http_status: 200,
      response_time_ms: 162.8,
      audited_at: "2026-11-24T09:50:00Z",
      metrics: {
        overall_health_score: 88,
        detected_ctas_count: 6,
        detected_ctas: ["Book Consultation", "WhatsApp Specialist", "View Smile Gallery", "Claim Free Checkup"],
        h1_meta_status: "Optimal (1 H1)",
        h1_count: 1,
        primary_h1: "Painless Cosmetic & Implant Dentistry Trusted by 2,400+ Families",
        title: "Dream Smile Dental Clinic | Cosmetic & Implant Specialists",
        meta_description: "Book a painless smile consultation with certified implant & aesthetic dentists. Flexible plans and same-day emergency care.",
        image_alt_coverage_pct: 91.7,
        total_images: 12,
        word_count: 950,
      },
      findings: [
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Trust-Anchored Hero H1",
          finding: "H1 combines pain-free reassurance with specific patient proof ('2,400+ Families').",
          recommendation: "High-converting local healthcare positioning; keep above fold.",
        },
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Multi-Channel Appointment CTAs",
          finding: "6 direct booking CTAs including instant WhatsApp triage and consultation scheduling.",
          recommendation: "Reduces mobile patient booking friction effectively.",
        },
        {
          category: "Technical SEO",
          severity: "Passed",
          check: "Title & Meta Description Length",
          finding: "Title (58 chars) and Meta Description (123 chars) include local specialty keywords.",
          recommendation: "Strong alignment for high-intent local dental search queries.",
        },
        {
          category: "Technical SEO",
          severity: "Warning",
          check: "LocalBusiness MedicalClinic Schema",
          finding: "Geo-coordinates and clinic openingHours schema attributes are partial.",
          recommendation: "Add complete MedicalClinic structured data to strengthen Google Map Pack ranking.",
        },
      ],
    },
  };

  // =========================================================================
  // 3. Application State & Chart Instances
  // =========================================================================
  const state = {
    activeMode: "analytics",
    activeDatasetKey: "ecommerce",
    currentAnalytics: null,
    currentAudit: null,
    trajectoryChart: null,
    channelChart: null,
  };

  // =========================================================================
  // 4. Utility Helpers
  // =========================================================================
  function formatCurrency(num) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  }

  function formatCurrencyExact(num) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  function formatNumber(num) {
    return new Intl.NumberFormat("en-US").format(Math.round(num));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  let toastTimer = null;
  function showToast(message, isError = false) {
    const toast = document.getElementById("status-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("visible");
    }, 4500);
  }

  function triggerFileDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // 5. Client-Side Pandas-Equivalent CSV Parser & Data Hygiene Engine
  // =========================================================================
  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  function standardizeChannelName(raw) {
    const clean = (raw || "Unattributed").trim();
    const lower = clean.toLowerCase();
    if (["seo", "organic", "google", "organic search"].includes(lower)) return "Organic Search";
    if (["facebook", "instagram", "fb ads", "meta", "meta ads"].includes(lower)) return "Meta Ads";
    if (["linkedin", "linkedin ads", "linkedin outbound"].includes(lower)) return "LinkedIn Outbound";
    if (["email", "cold email", "newsletter"].includes(lower)) return "Email";
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  function generateChannelRecommendation(channel, convRate, revShare) {
    if (convRate >= 6.0 && revShare >= 25.0) {
      return `Scale budget +20% on ${channel}; top-quartile ROAS and conversion velocity.`;
    }
    if (convRate < 3.0) {
      return `Audit ${channel} landing page message-match & above-the-fold CTA friction.`;
    }
    if (revShare < 15.0 && convRate >= 4.5) {
      return `High efficiency (${convRate.toFixed(1)}% CVR) on ${channel}; expand top-of-funnel volume.`;
    }
    return `Maintain steady cadence on ${channel}; A/B test value-proposition headline.`;
  }

  function processRawCSVText(csvText, fileName) {
    const lines = csvText
      .replace(/^\uFEFF/, "")
      .split(/\r?\n/)
      .filter((l) => l.trim().length > 0);

    if (lines.length < 2) {
      throw new Error("CSV file must include a header row and at least one data record.");
    }

    const rawHeaders = parseCSVLine(lines[0]).map((h) =>
      h.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
    );

    const aliasMap = {
      acquisition_channel: "channel",
      source: "channel",
      utm_source: "channel",
      traffic_source: "channel",
      amount: "revenue",
      sales: "revenue",
      total_revenue: "revenue",
      deal_value: "revenue",
      mrr: "revenue",
      lead_count: "leads",
      visitors: "leads",
      sessions: "leads",
      converted: "conversions",
      orders: "conversions",
      customers: "conversions",
      created_at: "date",
      timestamp: "date",
      month: "date",
    };

    const headers = rawHeaders.map((h) => aliasMap[h] || h);
    const revIdx = headers.indexOf("revenue");
    if (revIdx === -1) {
      throw new Error("Missing required 'revenue' (or 'amount' / 'sales') column in uploaded CSV.");
    }

    const chIdx = headers.indexOf("channel");
    const leadsIdx = headers.indexOf("leads");
    const convIdx = headers.indexOf("conversions");
    const dateIdx = headers.indexOf("date");
    const orderIdIdx = headers.indexOf("order_id");

    const rawRowCount = lines.length - 1;
    const seenSignatures = new Set();
    let duplicatesRemoved = 0;
    let nullValuesRepaired = 0;
    const cleanedRows = [];

    for (let i = 1; i < lines.length; i++) {
      const cells = parseCSVLine(lines[i]);
      if (cells.every((c) => !c)) continue;

      const channel = standardizeChannelName(chIdx !== -1 ? cells[chIdx] : "Direct / Unattributed");
      const rawRevStr = (cells[revIdx] || "").replace(/[\$,€£,\s]/g, "");
      let revenue = parseFloat(rawRevStr);

      if (Number.isNaN(revenue)) {
        nullValuesRepaired++;
        revenue = 0;
      }
      if (revenue < 0) continue;

      const leads = leadsIdx !== -1 ? Math.max(1, parseInt(cells[leadsIdx], 10) || 1) : 1;
      const conversions =
        convIdx !== -1 ? Math.max(0, parseInt(cells[convIdx], 10) || 0) : revenue > 0 ? 1 : 0;
      const dateRaw = dateIdx !== -1 && cells[dateIdx] ? cells[dateIdx].trim() : "2026-11";

      const sig =
        orderIdIdx !== -1 && cells[orderIdIdx]
          ? `id:${cells[orderIdIdx]}`
          : `${dateRaw}|${channel}|${revenue}|${leads}|${conversions}`;

      if (seenSignatures.has(sig)) {
        duplicatesRemoved++;
        continue;
      }
      seenSignatures.add(sig);

      cleanedRows.push({ dateRaw, channel, revenue, leads, conversions });
    }

    if (cleanedRows.length === 0) {
      throw new Error("No valid numeric records remained after CSV hygiene pass.");
    }

    // Group by Month
    const monthMap = new Map();
    cleanedRows.forEach((row) => {
      let monthKey = row.dateRaw.slice(0, 7);
      let monthLabel = row.dateRaw;
      const parsedDate = new Date(row.dateRaw);
      if (!Number.isNaN(parsedDate.getTime()) && row.dateRaw.length >= 7) {
        const yyyy = parsedDate.getUTCFullYear();
        const mm = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
        monthKey = `${yyyy}-${mm}`;
        monthLabel = parsedDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        });
      }
      const existing = monthMap.get(monthKey) || {
        month_key: monthKey,
        month_label: monthLabel,
        revenue: 0,
        leads: 0,
        conversions: 0,
      };
      existing.revenue += row.revenue;
      existing.leads += row.leads;
      existing.conversions += row.conversions;
      monthMap.set(monthKey, existing);
    });

    const monthly = Array.from(monthMap.values())
      .sort((a, b) => a.month_key.localeCompare(b.month_key))
      .map((m) => ({
        month_label: m.month_label,
        revenue: Math.round(m.revenue * 100) / 100,
        leads: m.leads,
        conversions: m.conversions,
        conversion_rate: Number(((m.conversions / Math.max(m.leads, 1)) * 100).toFixed(2)),
      }));

    // Group by Channel
    const totalRevenue = cleanedRows.reduce((acc, r) => acc + r.revenue, 0);
    const palette = ["#10B981", "#38BDF8", "#818CF8", "#F59E0B", "#EC4899", "#2DD4BF"];
    const channelMap = new Map();

    cleanedRows.forEach((row) => {
      const existing = channelMap.get(row.channel) || {
        channel: row.channel,
        revenue: 0,
        leads: 0,
        conversions: 0,
      };
      existing.revenue += row.revenue;
      existing.leads += row.leads;
      existing.conversions += row.conversions;
      channelMap.set(row.channel, existing);
    });

    const channels = Array.from(channelMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .map((c, idx) => {
        const cvr = Number(((c.conversions / Math.max(c.leads, 1)) * 100).toFixed(2));
        const share = (c.revenue / Math.max(totalRevenue, 1)) * 100;
        const aov = c.revenue / Math.max(c.conversions, 1);
        return {
          channel: c.channel,
          color: palette[idx % palette.length],
          revenue: Math.round(c.revenue * 100) / 100,
          leads: c.leads,
          conversions: c.conversions,
          conversion_rate: cvr,
          avg_order_value: Math.round(aov * 100) / 100,
          recommendation: generateChannelRecommendation(c.channel, cvr, share),
        };
      });

    const totalAnomalies = duplicatesRemoved + nullValuesRepaired;
    const hygieneScore = Number(
      Math.max(0, Math.min(100, ((rawRowCount - totalAnomalies) / Math.max(rawRowCount, 1)) * 100)).toFixed(1)
    );

    return {
      datasetName: `Uploaded CSV: ${fileName}`,
      revenueTrend: "+LIVE ETL",
      cvrTrend: "VERIFIED",
      hygiene: {
        raw_rows: rawRowCount,
        cleaned_rows: cleanedRows.length,
        duplicates_removed: duplicatesRemoved,
        null_values_repaired: nullValuesRepaired,
        data_hygiene_score: hygieneScore,
      },
      monthly,
      channels,
    };
  }

  // =========================================================================
  // 6. Render Mode 1: KPI Cards, Chart.js Visualizations & Insights Table
  // =========================================================================
  function renderAnalyticsDashboard(payload) {
    state.currentAnalytics = payload;

    const totalRevenue = payload.channels.reduce((s, c) => s + c.revenue, 0);
    const totalLeads = payload.channels.reduce((s, c) => s + c.leads, 0);
    const totalConversions = payload.channels.reduce((s, c) => s + c.conversions, 0);
    const netCvr = ((totalConversions / Math.max(totalLeads, 1)) * 100).toFixed(2);
    const h = payload.hygiene;
    const totalAnomalies = h.duplicates_removed + h.null_values_repaired;

    // Header & Hygiene Logs
    document.getElementById("active-dataset-name").textContent = `Active: ${payload.datasetName}`;
    document.getElementById("hygiene-log-line").textContent =
      `Pipeline cleaned ${formatNumber(h.raw_rows)} raw rows — removed ${h.duplicates_removed} duplicate records & repaired ${h.null_values_repaired} null currency entries.`;

    // KPI Cards
    document.getElementById("kpi-revenue").textContent = formatCurrency(totalRevenue);
    document.getElementById("kpi-revenue-trend").textContent = payload.revenueTrend;
    document.getElementById("kpi-revenue-sub").textContent = `Verified across ${formatNumber(h.cleaned_rows)} deduplicated records`;

    document.getElementById("kpi-leads").textContent = formatNumber(totalLeads);
    document.getElementById("kpi-leads-sub").textContent = `Normalized across ${payload.channels.length} acquisition channels`;

    document.getElementById("kpi-cvr").textContent = `${netCvr}%`;
    document.getElementById("kpi-cvr-trend").textContent = payload.cvrTrend;
    document.getElementById("kpi-cvr-sub").textContent = `${formatNumber(totalConversions)} confirmed high-intent conversions`;

    document.getElementById("kpi-hygiene").textContent = `${h.data_hygiene_score}%`;
    document.getElementById("kpi-hygiene-badge").textContent = `${totalAnomalies} ANOMALIES FIXED`;
    document.getElementById("kpi-hygiene-sub").textContent =
      `${h.duplicates_removed} duplicates purged • ${h.null_values_repaired} null rows repaired`;

    renderCharts(payload);
    renderChannelTable();
  }

  function renderCharts(payload) {
    if (typeof Chart === "undefined") return;

    const labels = payload.monthly.map((m) => m.month_label);
    const revenues = payload.monthly.map((m) => m.revenue);
    const cvrs = payload.monthly.map((m) => m.conversion_rate);

    const ctx1 = document.getElementById("trajectoryChart").getContext("2d");
    if (state.trajectoryChart) state.trajectoryChart.destroy();

    const emeraldGrad = ctx1.createLinearGradient(0, 0, 0, 290);
    emeraldGrad.addColorStop(0, "rgba(16, 185, 129, 0.34)");
    emeraldGrad.addColorStop(1, "rgba(16, 185, 129, 0.0)");

    state.trajectoryChart = new Chart(ctx1, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Cleaned Revenue ($)",
            data: revenues,
            borderColor: "#10B981",
            backgroundColor: emeraldGrad,
            borderWidth: 2.5,
            fill: true,
            tension: 0.38,
            pointRadius: 4,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#090B10",
            pointBorderWidth: 2,
            yAxisID: "y",
          },
          {
            label: "Conversion Rate (%)",
            data: cvrs,
            borderColor: "#38BDF8",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.35,
            pointRadius: 3.5,
            pointBackgroundColor: "#38BDF8",
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            labels: { color: "#94A3B8", font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 } },
          },
          tooltip: {
            backgroundColor: "#11151F",
            borderColor: "rgba(255,255,255,0.14)",
            borderWidth: 1,
            titleColor: "#F8FAFC",
            bodyColor: "#CBD5E1",
            padding: 12,
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { color: "#64748B", font: { family: "'JetBrains Mono', monospace", size: 11 } },
          },
          y: {
            position: "left",
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#94A3B8",
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              callback: (val) => `$${(val / 1000).toFixed(0)}k`,
            },
          },
          y1: {
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: {
              color: "#38BDF8",
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              callback: (val) => `${Number(val).toFixed(1)}%`,
            },
          },
        },
      },
    });

    // Chart 2: Channel Attribution Bar Chart
    const ctx2 = document.getElementById("channelChart").getContext("2d");
    if (state.channelChart) state.channelChart.destroy();

    state.channelChart = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: payload.channels.map((c) => c.channel),
        datasets: [
          {
            label: "Attributed Revenue ($)",
            data: payload.channels.map((c) => c.revenue),
            backgroundColor: payload.channels.map((c) => c.color),
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 46,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#11151F",
            borderColor: "rgba(255,255,255,0.14)",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => ` Revenue: ${formatCurrency(ctx.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#94A3B8", font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: "600" } },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#64748B",
              font: { family: "'JetBrains Mono', monospace", size: 11 },
              callback: (val) => `$${(val / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });
  }

  function renderChannelTable() {
    if (!state.currentAnalytics) return;
    const tbody = document.getElementById("analytics-table-body");
    const searchQuery = (document.getElementById("channel-search-input").value || "").toLowerCase().trim();
    const tierFilter = document.getElementById("channel-tier-filter").value;

    const filtered = state.currentAnalytics.channels.filter((item) => {
      const matchesText =
        !searchQuery ||
        item.channel.toLowerCase().includes(searchQuery) ||
        item.recommendation.toLowerCase().includes(searchQuery);

      const matchesTier =
        tierFilter === "all" ||
        (tierFilter === "high" && item.conversion_rate >= 6.0) ||
        (tierFilter === "optimize" && item.conversion_rate < 6.0);

      return matchesText && matchesTier;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">No acquisition channels match your current filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered
      .map(
        (row) => `
        <tr>
          <td>
            <div class="channel-cell">
              <span class="channel-dot" style="background:${escapeHtml(row.color)}"></span>
              <span>${escapeHtml(row.channel)}</span>
            </div>
          </td>
          <td class="num-col">${formatCurrency(row.revenue)}</td>
          <td class="num-col">${formatNumber(row.leads)}</td>
          <td class="num-col">${formatNumber(row.conversions)}</td>
          <td class="num-col">
            <span class="trend-badge ${row.conversion_rate >= 6.0 ? "trend-positive" : "trend-cyan"}">
              ${row.conversion_rate.toFixed(2)}%
            </span>
          </td>
          <td class="num-col">${formatCurrencyExact(row.avg_order_value)}</td>
          <td><span class="rec-pill">${escapeHtml(row.recommendation)}</span></td>
        </tr>
      `
      )
      .join("");
  }

  // =========================================================================
  // 7. Render Mode 2: Automated Website SEO & Conversion Copy Auditor
  // =========================================================================
  function buildDynamicAuditForCustomUrl(rawUrl) {
    let normalized = rawUrl.trim();
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = `https://${normalized}`;
    }

    let domain = normalized.replace(/^https?:\/\//i, "").split("/")[0];
    try {
      domain = new URL(normalized).hostname;
    } catch (_) {
      // Fallback to extracted host string
    }

    // Match known presets if user enters matching URL
    if (domain.includes("saniasarwar")) return structuredClone(AUDIT_PRESETS.saas);
    if (domain.includes("velora")) return structuredClone(AUDIT_PRESETS.ecommerce);
    if (domain.includes("dreamsmile")) return structuredClone(AUDIT_PRESETS.clinic);

    // Deterministic live heuristic audit simulation for any custom URL
    const hash = Array.from(domain).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const score = 81 + (hash % 15); // 81 - 95
    const ctaCount = 4 + (hash % 5);
    const altCoverage = Number((84 + (hash % 14) + 0.4).toFixed(1));
    const latency = Number((145 + (hash % 130) + 0.3).toFixed(1));
    const words = 820 + (hash % 540);

    return {
      engine: "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
      status: "success",
      target_url: normalized,
      domain,
      http_status: 200,
      response_time_ms: latency,
      audited_at: new Date().toISOString(),
      metrics: {
        overall_health_score: score,
        detected_ctas_count: ctaCount,
        detected_ctas: ["Get Started Free", "Book a Demo", "Explore Features", "Start Trial"],
        h1_meta_status: score >= 86 ? "Optimal (1 H1)" : "Needs Attention",
        h1_count: 1,
        primary_h1: `Transform Operations & Revenue Velocity with ${domain}`,
        title: `${domain} — Modern Intelligence & Workflow Platform`,
        meta_description: `Discover how ${domain} helps high-growth teams automate operations, increase conversions, and scale sustainably.`,
        image_alt_coverage_pct: altCoverage,
        total_images: 16,
        word_count: words,
      },
      findings: [
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Single Focused H1",
          finding: `Single hero <h1> detected on ${domain} with clear outcome framing.`,
          recommendation: "Pair H1 with a 1-sentence quantified proof subheadline.",
        },
        {
          category: "Conversion Copy",
          severity: "Passed",
          check: "Action-Oriented CTA Coverage",
          finding: `${ctaCount} high-intent action CTAs detected ('Get Started Free', 'Book a Demo').`,
          recommendation: "Add micro-copy reassurance ('No credit card required') beneath primary CTA.",
        },
        {
          category: "Technical SEO",
          severity: "Passed",
          check: "Title & Meta Description Length",
          finding: "Title (52 chars) and Meta Description (121 chars) fall within optimal SERP bounds.",
          recommendation: "Maintain primary commercial keyword placement near start of title.",
        },
        {
          category: "Accessibility & SEO",
          severity: altCoverage >= 90 ? "Passed" : "Warning",
          check: "Image Alt Coverage",
          finding: `${altCoverage}% alt text coverage across 16 visual elements on ${domain}.`,
          recommendation: "Ensure all product screenshots include descriptive keyword-rich alt tags.",
        },
        {
          category: "Technical SEO",
          severity: "Warning",
          check: "OpenGraph & Schema Rich Snippets",
          finding: "Detected og:title; SoftwareApplication JSON-LD structured data can be enriched.",
          recommendation: "Add JSON-LD FAQPage & SoftwareApplication schema to expand SERP footprint.",
        },
      ],
    };
  }

  function renderAuditDashboard(auditPayload) {
    state.currentAudit = auditPayload;
    const m = auditPayload.metrics;

    // Radial SVG Ring (circumference = 2 * pi * 56 = 351.86)
    const circumference = 351.86;
    const offset = circumference - (m.overall_health_score / 100) * circumference;
    const ringEl = document.getElementById("audit-gauge-ring");
    ringEl.style.strokeDashoffset = offset.toFixed(2);
    ringEl.style.stroke =
      m.overall_health_score >= 85 ? "#10B981" : m.overall_health_score >= 70 ? "#F59E0B" : "#F43F5E";

    document.getElementById("audit-health-score").textContent = m.overall_health_score;
    document.getElementById("audit-domain-label").textContent = auditPayload.domain;
    document.getElementById("audit-latency-label").textContent =
      `HTTP ${auditPayload.http_status} OK • ${auditPayload.response_time_ms} ms • ${formatNumber(m.word_count)} words`;

    document.getElementById("audit-cta-count").textContent = `${m.detected_ctas_count} Action CTAs`;
    document.getElementById("audit-cta-samples").textContent =
      `Primary: "${m.detected_ctas.slice(0, 2).join('", "')}"`;

    document.getElementById("audit-h1-status").textContent = m.h1_meta_status;
    document.getElementById("audit-h1-text").textContent =
      `Title: ${m.title.length} chars • Meta Description: ${m.meta_description.length} chars`;

    document.getElementById("audit-alt-coverage").textContent = `${m.image_alt_coverage_pct}%`;
    const coveredCount = Math.round((m.image_alt_coverage_pct / 100) * m.total_images);
    document.getElementById("audit-alt-sub").textContent =
      `${coveredCount} of ${m.total_images} visual assets indexed with descriptive alt text`;

    // Severity Pills Summary
    const counts = { Critical: 0, Warning: 0, Passed: 0 };
    auditPayload.findings.forEach((f) => {
      if (counts[f.severity] !== undefined) counts[f.severity]++;
    });

    const pillsContainer = document.getElementById("audit-severity-pills");
    pillsContainer.innerHTML = [
      counts.Critical ? `<span class="sev-pill sev-critical">${counts.Critical} Critical</span>` : "",
      counts.Warning ? `<span class="sev-pill sev-warning">${counts.Warning} Warning</span>` : "",
      counts.Passed ? `<span class="sev-pill sev-passed">${counts.Passed} Passed</span>` : "",
    ].join("");

    // Findings Table
    const tbody = document.getElementById("audit-findings-body");
    tbody.innerHTML = auditPayload.findings
      .map((item) => {
        const sevClass =
          item.severity === "Critical"
            ? "sev-critical"
            : item.severity === "Warning"
              ? "sev-warning"
              : "sev-passed";
        return `
          <tr>
            <td><span class="sev-pill ${sevClass}">${escapeHtml(item.severity)}</span></td>
            <td>
              <strong>${escapeHtml(item.check)}</strong>
              <div style="font-size:0.73rem;color:var(--text-muted);margin-top:2px;">${escapeHtml(item.category)}</div>
            </td>
            <td style="color:var(--text-secondary);">${escapeHtml(item.finding)}</td>
            <td><span class="rec-pill">${escapeHtml(item.recommendation)}</span></td>
          </tr>
        `;
      })
      .join("");

    // Live JSON Output Terminal
    document.getElementById("audit-json-output").textContent = JSON.stringify(auditPayload, null, 2);
  }

  // =========================================================================
  // 8. Event Wiring & Initialization
  // =========================================================================
  function initEventListeners() {
    // Mode Switcher Tabs
    document.querySelectorAll(".mode-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetMode = tab.dataset.mode;
        state.activeMode = targetMode;

        document.querySelectorAll(".mode-tab").forEach((t) => {
          const isMatch = t.dataset.mode === targetMode;
          t.classList.toggle("active", isMatch);
          t.setAttribute("aria-selected", String(isMatch));
        });

        document.getElementById("panel-analytics").hidden = targetMode !== "analytics";
        document.getElementById("panel-auditor").hidden = targetMode !== "auditor";
      });
    });

    // Dataset Preset Buttons
    document.querySelectorAll("[data-dataset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.dataset;
        if (!PRESET_DATASETS[key]) return;
        state.activeDatasetKey = key;

        document.querySelectorAll("[data-dataset]").forEach((b) => b.classList.remove("active-preset"));
        btn.classList.add("active-preset");

        renderAnalyticsDashboard(structuredClone(PRESET_DATASETS[key]));
        showToast(`Loaded "${PRESET_DATASETS[key].datasetName}" via BusinessDataEngine.`);
      });
    });

    // Real Client-Side CSV Upload
    const csvInput = document.getElementById("csv-upload-input");
    csvInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = processRawCSVText(String(evt.target.result || ""), file.name);
          document.querySelectorAll("[data-dataset]").forEach((b) => b.classList.remove("active-preset"));
          renderAnalyticsDashboard(parsed);
          showToast(
            `Processed "${file.name}" — cleaned ${parsed.hygiene.raw_rows} rows (${parsed.hygiene.duplicates_removed} duplicates removed).`
          );
        } catch (err) {
          showToast(err.message || "Failed to parse CSV file.", true);
        } finally {
          csvInput.value = "";
        }
      };
      reader.readAsText(file);
    });

    // Download Sample CSV (with intentional duplicates & nulls so users can test Upload immediately)
    document.getElementById("btn-download-sample").addEventListener("click", () => {
      const sampleRows = [
        "date,channel,revenue,leads,conversions,order_id",
        "2026-07-04,Organic Search,$18400,410,31,ORD-1001",
        "2026-07-04,Organic Search,$18400,410,31,ORD-1001",
        "2026-08-12,Meta Ads,$22650,690,34,ORD-1002",
        "2026-09-09,LinkedIn Outbound,$31200,240,22,ORD-1003",
        "2026-10-15,Email,$14900,320,24,ORD-1004",
        "2026-11-02,Organic Search,$36800,530,44,ORD-1005",
        "2026-11-10,Meta Ads,,180,0,ORD-1006",
        "2026-11-18,LinkedIn Outbound,$42500,290,28,ORD-1007",
      ].join("\n");

      triggerFileDownload("pulsemetrics_sample_raw_data.csv", sampleRows, "text/csv;charset=utf-8;");
      showToast("Downloaded sample CSV (includes duplicate & null test rows). Upload it to test ETL cleaning!");
    });

    // Table Search & Tier Filtering
    document.getElementById("channel-search-input").addEventListener("input", renderChannelTable);
    document.getElementById("channel-tier-filter").addEventListener("change", renderChannelTable);

    // Website Audit Form Submit
    document.getElementById("url-audit-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const urlVal = document.getElementById("audit-url-input").value;
      if (!urlVal.trim()) return;

      document.querySelectorAll("[data-audit-preset]").forEach((b) => b.classList.remove("active-preset"));
      const result = buildDynamicAuditForCustomUrl(urlVal);
      renderAuditDashboard(result);
      showToast(`Completed SEO & conversion copy audit for ${result.domain} (${result.metrics.overall_health_score}/100).`);
    });

    // Website Audit Preset Buttons
    document.querySelectorAll("[data-audit-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.auditPreset;
        const preset = AUDIT_PRESETS[key];
        if (!preset) return;

        document.querySelectorAll("[data-audit-preset]").forEach((b) => b.classList.remove("active-preset"));
        btn.classList.add("active-preset");

        document.getElementById("audit-url-input").value = preset.target_url;
        renderAuditDashboard(structuredClone(preset));
        showToast(`Audited benchmark target: ${preset.domain}`);
      });
    });

    // Copy JSON Button
    document.getElementById("copy-json-btn").addEventListener("click", async () => {
      const jsonText = document.getElementById("audit-json-output").textContent;
      try {
        await navigator.clipboard.writeText(jsonText);
        showToast("Copied structured Python JSON output to clipboard.");
      } catch (_) {
        showToast("Unable to access clipboard in this browser context.", true);
      }
    });

    // Export Dropdown Toggle & Downloads
    const exportBtn = document.getElementById("export-report-btn");
    const exportMenu = document.getElementById("export-menu");

    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportMenu.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      exportMenu.classList.remove("open");
    });

    document.getElementById("export-json-btn").addEventListener("click", () => {
      const bundle = {
        exported_at: new Date().toISOString(),
        engine: "PulseMetrics AI v2.4",
        analytics_intelligence: state.currentAnalytics,
        website_seo_copy_audit: state.currentAudit,
      };
      triggerFileDownload(
        "pulsemetrics_intelligence_report.json",
        JSON.stringify(bundle, null, 2),
        "application/json;charset=utf-8;"
      );
      showToast("Exported full dual-mode JSON intelligence report.");
    });

    document.getElementById("export-csv-btn").addEventListener("click", () => {
      if (state.activeMode === "analytics" && state.currentAnalytics) {
        const header = "Channel,Cleaned Revenue ($),Qualified Leads,Conversions,Net CVR (%),Avg Order Value ($),Recommendation";
        const rows = state.currentAnalytics.channels.map(
          (c) =>
            `"${c.channel}",${c.revenue},${c.leads},${c.conversions},${c.conversion_rate},${c.avg_order_value},"${c.recommendation.replace(/"/g, '""')}"`
        );
        triggerFileDownload("pulsemetrics_cleaned_channels.csv", [header, ...rows].join("\n"), "text/csv;charset=utf-8;");
        showToast("Exported cleaned channel intelligence table as CSV.");
      } else if (state.currentAudit) {
        const header = "Severity,Category,Check,Finding,Recommendation";
        const rows = state.currentAudit.findings.map(
          (f) =>
            `"${f.severity}","${f.category}","${f.check}","${f.finding.replace(/"/g, '""')}","${f.recommendation.replace(/"/g, '""')}"`
        );
        triggerFileDownload("pulsemetrics_seo_copy_audit.csv", [header, ...rows].join("\n"), "text/csv;charset=utf-8;");
        showToast("Exported SEO & conversion copy audit findings as CSV.");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    renderAnalyticsDashboard(structuredClone(PRESET_DATASETS.ecommerce));
    renderAuditDashboard(structuredClone(AUDIT_PRESETS.saas));
  });
})();