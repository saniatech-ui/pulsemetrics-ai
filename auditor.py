#!/usr/bin/env python3
"""
PulseMetrics AI — Automated Website SEO, Copywriting & Business Data Intelligence Engine
Core Python Engine (v2.4)
Author: Sania Sarwar (https://saniasarwar.vercel.app | https://github.com/saniatech-ui)

Capabilities:
1. E-Commerce & SaaS CSV Hygiene, Deduplication, Attribution & Revenue Intelligence (Pandas)
2. Live Website Technical SEO, Conversion Copywriting & CTA Structure Auditor (Requests + BeautifulSoup4)
3. Dual-Mode CLI & JSON Schema Exporter for Frontend Dashboard Hydration
"""

import argparse
import json
import logging
import re
import sys
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from urllib.parse import urljoin, urlparse

import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | PulseMetricsEngine | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("PulseMetricsEngine")


class BusinessDataEngine:
    """
    Production-grade Pandas data cleaning, deduplication, attribution modeling,
    and revenue intelligence pipeline for raw e-commerce and SaaS lead CSVs.
    """

    REQUIRED_COLUMNS = {"channel", "revenue"}
    OPTIONAL_COLUMNS = {"date", "leads", "conversions", "status", "email", "order_id"}

    def __init__(self, df: pd.DataFrame):
        self.raw_df = df.copy()
        self.cleaned_df: Optional[pd.DataFrame] = None
        self.hygiene_report: Dict[str, Any] = {}

    @classmethod
    def from_csv(cls, file_path: str) -> "BusinessDataEngine":
        try:
            df = pd.read_csv(file_path, encoding="utf-8-sig")
            logger.info(f"Loaded CSV '{file_path}' with {len(df)} raw rows.")
            return cls(df)
        except Exception as exc:
            logger.error(f"Failed to read CSV file '{file_path}': {exc}")
            raise

    @staticmethod
    def _normalize_column_names(df: pd.DataFrame) -> pd.DataFrame:
        df.columns = (
            df.columns.astype(str)
            .str.strip()
            .str.lower()
            .str.replace(r"[^a-z0-9]+", "_", regex=True)
            .str.strip("_")
        )
        # Map common column aliases to canonical schema
        alias_map = {
            "acquisition_channel": "channel",
            "source": "channel",
            "utm_source": "channel",
            "traffic_source": "channel",
            "amount": "revenue",
            "sales": "revenue",
            "total_revenue": "revenue",
            "deal_value": "revenue",
            "mrr": "revenue",
            "lead_count": "leads",
            "visitors": "leads",
            "sessions": "leads",
            "converted": "conversions",
            "orders": "conversions",
            "customers": "conversions",
            "created_at": "date",
            "timestamp": "date",
            "month": "date",
        }
        df = df.rename(columns={k: v for k, v in alias_map.items() if k in df.columns})
        return df

    @staticmethod
    def _clean_currency(series: pd.Series) -> pd.Series:
        cleaned = (
            series.astype(str)
            .str.replace(r"[\$,€£PKR,\s]", "", regex=True)
            .replace({"": np.nan, "nan": np.nan, "None": np.nan, "null": np.nan})
        )
        return pd.to_numeric(cleaned, errors="coerce")

    def clean_and_transform(self) -> pd.DataFrame:
        df = self._normalize_column_names(self.raw_df)
        initial_rows = len(df)

        # Drop completely empty rows
        df = df.dropna(how="all").copy()
        empty_rows_removed = initial_rows - len(df)

        # Validate required columns or synthesize safe fallbacks
        if "channel" not in df.columns:
            df["channel"] = "Direct / Unattributed"
        if "revenue" not in df.columns:
            raise ValueError("CSV dataset must contain a 'revenue' (or 'amount'/'sales') column.")

        # Standardize channel labels
        df["channel"] = (
            df["channel"]
            .fillna("Unattributed")
            .astype(str)
            .str.strip()
            .str.title()
            .replace(
                {
                    "Seo": "Organic Search",
                    "Organic": "Organic Search",
                    "Google": "Organic Search",
                    "Facebook": "Meta Ads",
                    "Instagram": "Meta Ads",
                    "Fb Ads": "Meta Ads",
                    "Meta": "Meta Ads",
                    "Linkedin": "LinkedIn Outbound",
                    "Linkedin Ads": "LinkedIn Outbound",
                    "Cold Email": "Email",
                    "Newsletter": "Email",
                }
            )
        )

        # Clean numeric fields
        df["revenue"] = self._clean_currency(df["revenue"])
        null_revenue_rows = int(df["revenue"].isna().sum())
        df["revenue"] = df["revenue"].fillna(0.0)
        df = df[df["revenue"] >= 0].copy()

        # Process leads & conversions columns if present, else infer realistic row-level metrics
        if "leads" in df.columns:
            df["leads"] = pd.to_numeric(df["leads"], errors="coerce").fillna(1).clip(lower=1).astype(int)
        else:
            df["leads"] = 1

        if "conversions" in df.columns:
            df["conversions"] = pd.to_numeric(df["conversions"], errors="coerce").fillna(0).clip(lower=0).astype(int)
        elif "status" in df.columns:
            df["conversions"] = (
                df["status"]
                .astype(str)
                .str.lower()
                .isin(["converted", "won", "paid", "closed", "completed", "qualified"])
                .astype(int)
            )
        else:
            df["conversions"] = (df["revenue"] > 0).astype(int)

        # Deduplication based on order_id, email, or exact record signature
        before_dedup = len(df)
        if "order_id" in df.columns:
            df = df.drop_duplicates(subset=["order_id"], keep="first")
        elif "email" in df.columns:
            df = df.drop_duplicates(subset=["email", "channel", "revenue"], keep="first")
        else:
            dedup_cols = [c for c in ["date", "channel", "revenue", "leads", "conversions"] if c in df.columns]
            df = df.drop_duplicates(subset=dedup_cols, keep="first")
        duplicates_removed = before_dedup - len(df)

        # Parse dates for monthly trajectory
        if "date" in df.columns:
            parsed_dates = pd.to_datetime(df["date"], errors="coerce")
            if parsed_dates.notna().any():
                df["month_key"] = parsed_dates.dt.strftime("%Y-%m")
                df["month_label"] = parsed_dates.dt.strftime("%b %Y")
            else:
                df["month_key"] = "2026-Q4"
                df["month_label"] = df["date"].astype(str)
        else:
            df["month_key"] = "2026-11"
            df["month_label"] = "Nov 2026"

        self.cleaned_df = df.reset_index(drop=True)

        total_anomalies = empty_rows_removed + duplicates_removed + null_revenue_rows
        hygiene_score = round(max(0.0, min(100.0, ((initial_rows - total_anomalies) / max(initial_rows, 1)) * 100)), 1)

        self.hygiene_report = {
            "raw_rows": initial_rows,
            "cleaned_rows": len(self.cleaned_df),
            "duplicates_removed": duplicates_removed,
            "null_values_repaired": null_revenue_rows,
            "empty_rows_dropped": empty_rows_removed,
            "data_hygiene_score": hygiene_score,
        }
        return self.cleaned_df

    @staticmethod
    def _generate_channel_recommendation(channel: str, conv_rate: float, revenue_share: float) -> str:
        if conv_rate >= 6.0 and revenue_share >= 25.0:
            return f"Scale budget +20% on {channel}; top-quartile ROAS and conversion velocity."
        if conv_rate < 2.5:
            return f"Audit {channel} landing page message-match & above-the-fold CTA friction."
        if revenue_share < 12.0 and conv_rate >= 4.0:
            return f"High efficiency ({conv_rate:.1f}% CVR) on {channel}; expand top-of-funnel volume."
        return f"Maintain steady cadence on {channel}; A/B test value-proposition headline."

    def generate_intelligence_payload(self) -> Dict[str, Any]:
        if self.cleaned_df is None:
            self.clean_and_transform()

        df = self.cleaned_df
        total_revenue = float(df["revenue"].sum())
        total_leads = int(df["leads"].sum())
        total_conversions = int(df["conversions"].sum())
        net_conversion_rate = round((total_conversions / max(total_leads, 1)) * 100, 2)

        # Monthly trajectory aggregation
        monthly_grp = (
            df.groupby(["month_key", "month_label"], as_index=False)
            .agg(revenue=("revenue", "sum"), leads=("leads", "sum"), conversions=("conversions", "sum"))
            .sort_values("month_key")
        )
        monthly_grp["conversion_rate"] = (
            (monthly_grp["conversions"] / monthly_grp["leads"].clip(lower=1)) * 100
        ).round(2)

        # Channel attribution aggregation
        channel_grp = (
            df.groupby("channel", as_index=False)
            .agg(revenue=("revenue", "sum"), leads=("leads", "sum"), conversions=("conversions", "sum"))
            .sort_values("revenue", ascending=False)
        )
        channel_grp["conversion_rate"] = (
            (channel_grp["conversions"] / channel_grp["leads"].clip(lower=1)) * 100
        ).round(2)
        channel_grp["revenue_share"] = (
            (channel_grp["revenue"] / max(total_revenue, 1.0)) * 100
        ).round(1)
        channel_grp["avg_order_value"] = (
            channel_grp["revenue"] / channel_grp["conversions"].clip(lower=1)
        ).round(2)

        channel_insights: List[Dict[str, Any]] = []
        for _, row in channel_grp.iterrows():
            rec = self._generate_channel_recommendation(
                row["channel"], float(row["conversion_rate"]), float(row["revenue_share"])
            )
            channel_insights.append(
                {
                    "channel": row["channel"],
                    "revenue": round(float(row["revenue"]), 2),
                    "leads": int(row["leads"]),
                    "conversions": int(row["conversions"]),
                    "conversion_rate": float(row["conversion_rate"]),
                    "revenue_share": float(row["revenue_share"]),
                    "avg_order_value": float(row["avg_order_value"]),
                    "recommendation": rec,
                }
            )

        return {
            "engine": "PulseMetrics BusinessDataEngine v2.4",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "kpis": {
                "total_cleaned_revenue": round(total_revenue, 2),
                "qualified_leads_processed": total_leads,
                "total_conversions": total_conversions,
                "net_conversion_rate": net_conversion_rate,
                "data_hygiene_score": self.hygiene_report["data_hygiene_score"],
            },
            "hygiene_summary": self.hygiene_report,
            "monthly_trajectory": monthly_grp[
                ["month_label", "revenue", "leads", "conversions", "conversion_rate"]
            ].to_dict(orient="records"),
            "channel_attribution": channel_insights,
        }


class WebsiteSEOAndCopyAuditor:
    """
    Live HTML Scraper & Conversion Copywriting Intelligence Auditor.
    Evaluates H1 hierarchy, Meta description length, CTA action-verb density,
    image alt accessibility coverage, canonical tags, and OpenGraph completeness.
    """

    ACTION_VERBS = {
        "get", "start", "book", "schedule", "claim", "launch", "try", "download",
        "request", "audit", "explore", "build", "join", "unlock", "buy", "order",
        "consult", "discover", "scale", "demo", "contact", "reserve",
    }

    WEAK_CTA_LABELS = {"submit", "click here", "learn more", "read more", "send", "go"}

    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (compatible; PulseMetricsAI-Auditor/2.4; "
            "+https://saniasarwar.vercel.app)"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    def __init__(self, url: str, timeout: int = 12):
        self.url = self._normalize_url(url)
        self.timeout = timeout

    @staticmethod
    def _normalize_url(url: str) -> str:
        url = url.strip()
        if not re.match(r"^https?://", url, re.IGNORECASE):
            url = f"https://{url}"
        return url

    def audit(self) -> Dict[str, Any]:
        logger.info(f"Starting live SEO & conversion copy audit for: {self.url}")
        start_ts = datetime.now(timezone.utc)

        try:
            response = requests.get(self.url, headers=self.HEADERS, timeout=self.timeout)
            response.raise_for_status()
            elapsed_ms = round(response.elapsed.total_seconds() * 1000, 1)
        except requests.RequestException as exc:
            logger.error(f"HTTP request failed for {self.url}: {exc}")
            return {
                "engine": "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
                "status": "error",
                "target_url": self.url,
                "error": str(exc),
                "audited_at": start_ts.isoformat(),
            }

        soup = BeautifulSoup(response.text, "html.parser")
        findings: List[Dict[str, str]] = []
        score = 100

        # 1. Title Tag Analysis
        title_tag = soup.find("title")
        title_text = title_tag.get_text(strip=True) if title_tag else ""
        title_len = len(title_text)
        if not title_text:
            score -= 18
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Critical",
                    "check": "Missing <title> Tag",
                    "finding": "No HTML <title> tag detected on page.",
                    "recommendation": "Add a 50–60 character outcome-driven title with primary keyword + brand.",
                }
            )
        elif title_len < 30 or title_len > 65:
            score -= 6
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Warning",
                    "check": "Suboptimal Title Length",
                    "finding": f"Title is {title_len} chars ('{title_text[:55]}...').",
                    "recommendation": "Tighten title to 50–60 characters to prevent SERP truncation and boost CTR.",
                }
            )
        else:
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Passed",
                    "check": "Title Tag Optimization",
                    "finding": f"Optimal title length ({title_len} chars): '{title_text}'.",
                    "recommendation": "Title tag meets search visibility and clarity standards.",
                }
            )

        # 2. Meta Description Analysis
        meta_desc_tag = soup.find("meta", attrs={"name": re.compile(r"^description$", re.I)})
        meta_desc = meta_desc_tag.get("content", "").strip() if meta_desc_tag else ""
        meta_len = len(meta_desc)
        if not meta_desc:
            score -= 14
            findings.append(
                {
                    "category": "Search CTR Copy",
                    "severity": "Critical",
                    "check": "Missing Meta Description",
                    "finding": "No meta description attribute found.",
                    "recommendation": "Write a 140–155 char benefit-led meta summary ending with a soft CTA.",
                }
            )
        elif meta_len < 110 or meta_len > 165:
            score -= 5
            findings.append(
                {
                    "category": "Search CTR Copy",
                    "severity": "Warning",
                    "check": "Meta Description Length",
                    "finding": f"Meta description is {meta_len} characters (ideal: 120–158).",
                    "recommendation": "Refine meta copy to highlight quantifiable ROI within 155 characters.",
                }
            )
        else:
            findings.append(
                {
                    "category": "Search CTR Copy",
                    "severity": "Passed",
                    "check": "Meta Description Copy",
                    "finding": f"Well-sized meta description ({meta_len} chars) detected.",
                    "recommendation": "Maintain persuasive benefit framing in search snippets.",
                }
            )

        # 3. H1 Headline Hierarchy & Conversion Value Proposition
        h1_tags = [h.get_text(" ", strip=True) for h in soup.find_all("h1") if h.get_text(strip=True)]
        h1_count = len(h1_tags)
        primary_h1 = h1_tags[0] if h1_tags else ""
        if h1_count == 0:
            score -= 18
            findings.append(
                {
                    "category": "Conversion Copy",
                    "severity": "Critical",
                    "check": "Missing Hero H1 Headline",
                    "finding": "Zero <h1> elements found on page.",
                    "recommendation": "Add one clear H1 articulating Who you help + Core Outcome + Timeframe.",
                }
            )
        elif h1_count > 1:
            score -= 7
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Warning",
                    "check": "Multiple H1 Tags Detected",
                    "finding": f"Found {h1_count} H1 tags; dilutes semantic topic hierarchy.",
                    "recommendation": "Reserve a single H1 for the hero value proposition and demote others to H2.",
                }
            )
        else:
            findings.append(
                {
                    "category": "Conversion Copy",
                    "severity": "Passed",
                    "check": "Single Focused H1",
                    "finding": f"Primary H1 detected: '{primary_h1[:80]}'.",
                    "recommendation": "Ensure subheadline immediately reinforces H1 with social proof.",
                }
            )

        # 4. Call-To-Action (CTA) Detection & Action-Verb Persuasion Audit
        cta_candidates = []
        for el in soup.find_all(["a", "button"]):
            label = re.sub(r"\s+", " ", el.get_text(" ", strip=True))
            if not label or len(label) > 48:
                continue
            classes = " ".join(el.get("class", [])).lower()
            is_button_like = el.name == "button" or any(
                token in classes for token in ("btn", "button", "cta", "primary", "action")
            )
            first_word = label.split()[0].lower().strip(".,!?")
            if is_button_like or first_word in self.ACTION_VERBS:
                cta_candidates.append(label)

        unique_ctas = list(dict.fromkeys(cta_candidates))
        weak_ctas = [c for c in unique_ctas if c.lower() in self.WEAK_CTA_LABELS]

        if not unique_ctas:
            score -= 16
            findings.append(
                {
                    "category": "Conversion Copy",
                    "severity": "Critical",
                    "check": "No Actionable CTAs Detected",
                    "finding": "Zero high-intent buttons or action-verb links identified.",
                    "recommendation": "Add high-contrast primary CTAs using first-person value copy (e.g., 'Book My Strategy Call').",
                }
            )
        elif weak_ctas:
            score -= 6
            findings.append(
                {
                    "category": "Conversion Copy",
                    "severity": "Warning",
                    "check": "Generic Low-Intent CTA Labels",
                    "finding": f"Detected passive CTA copy: {', '.join(weak_ctas[:3])}.",
                    "recommendation": "Replace generic labels with outcome-specific verbs (e.g., 'Get Free Audit').",
                }
            )
        else:
            findings.append(
                {
                    "category": "Conversion Copy",
                    "severity": "Passed",
                    "check": "Action-Oriented CTA Coverage",
                    "finding": f"{len(unique_ctas)} high-intent CTAs found (e.g., '{unique_ctas[0]}').",
                    "recommendation": "Strong action-verb alignment across conversion touchpoints.",
                }
            )

        # 5. Image Alt Attribute & Accessibility Audit
        images = soup.find_all("img")
        total_images = len(images)
        images_with_alt = sum(1 for img in images if img.get("alt") and img.get("alt").strip())
        alt_coverage = round((images_with_alt / total_images) * 100, 1) if total_images > 0 else 100.0

        if total_images > 0 and alt_coverage < 80.0:
            score -= 8
            findings.append(
                {
                    "category": "Accessibility & SEO",
                    "severity": "Warning",
                    "check": "Incomplete Image Alt Text",
                    "finding": f"{images_with_alt}/{total_images} images ({alt_coverage}%) contain descriptive alt text.",
                    "recommendation": "Add keyword-relevant descriptive alt attributes to all product/portfolio visuals.",
                }
            )
        else:
            findings.append(
                {
                    "category": "Accessibility & SEO",
                    "severity": "Passed",
                    "check": "Image Alt Coverage",
                    "finding": f"{alt_coverage}% alt text coverage across {total_images} images.",
                    "recommendation": "Image accessibility and visual indexing hygiene verified.",
                }
            )

        # 6. Canonical & Social Meta Readiness
        canonical = soup.find("link", attrs={"rel": lambda x: x and "canonical" in x})
        og_title = soup.find("meta", attrs={"property": "og:title"})
        if not canonical or not og_title:
            score -= 4
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Warning",
                    "check": "Canonical / OpenGraph Tags",
                    "finding": f"Canonical: {'Present' if canonical else 'Missing'} | og:title: {'Present' if og_title else 'Missing'}.",
                    "recommendation": "Include self-referencing canonical URL and OpenGraph tags for LinkedIn/X previews.",
                }
            )
        else:
            findings.append(
                {
                    "category": "Technical SEO",
                    "severity": "Passed",
                    "check": "Canonical & Social Metadata",
                    "finding": "Canonical URL and OpenGraph metadata properly configured.",
                    "recommendation": "Link previews and duplicate-URL indexing protection are active.",
                }
            )

        # Word count & readability metrics
        body_text = soup.body.get_text(" ", strip=True) if soup.body else soup.get_text(" ", strip=True)
        words = re.findall(r"\b\w+\b", body_text)
        word_count = len(words)

        final_score = max(0, min(100, score))
        h1_meta_status = (
            "Optimal"
            if (h1_count == 1 and 30 <= title_len <= 65 and 110 <= meta_len <= 165)
            else "Needs Attention"
        )

        return {
            "engine": "PulseMetrics WebsiteSEOAndCopyAuditor v2.4",
            "status": "success",
            "target_url": self.url,
            "domain": urlparse(self.url).netloc,
            "http_status": response.status_code,
            "response_time_ms": elapsed_ms,
            "audited_at": start_ts.isoformat(),
            "metrics": {
                "overall_health_score": final_score,
                "detected_ctas_count": len(unique_ctas),
                "detected_ctas": unique_ctas[:8],
                "h1_meta_status": h1_meta_status,
                "h1_count": h1_count,
                "primary_h1": primary_h1,
                "title": title_text,
                "meta_description": meta_desc,
                "image_alt_coverage_pct": alt_coverage,
                "total_images": total_images,
                "word_count": word_count,
            },
            "findings": findings,
        }


def build_demo_dataframe() -> pd.DataFrame:
    """Generates a realistic raw dataset with intentional duplicates and nulls to demonstrate cleaning."""
    raw_records = [
        {"date": "2026-06-12", "channel": "Organic Search", "revenue": "$14,250", "leads": 310, "conversions": 19},
        {"date": "2026-06-12", "channel": "Organic Search", "revenue": "$14,250", "leads": 310, "conversions": 19},  # duplicate
        {"date": "2026-07-08", "channel": "Meta Ads", "revenue": "$18,900", "leads": 620, "conversions": 24},
        {"date": "2026-08-19", "channel": "LinkedIn Outbound", "revenue": "$24,500", "leads": 190, "conversions": 15},
        {"date": "2026-09-14", "channel": "Email", "revenue": "$11,800", "leads": 240, "conversions": 18},
        {"date": "2026-10-21", "channel": "Organic Search", "revenue": "$29,400", "leads": 480, "conversions": 34},
        {"date": "2026-11-05", "channel": "LinkedIn Outbound", "revenue": "$34,200", "leads": 230, "conversions": 21},
        {"date": "2026-11-11", "channel": "Meta Ads", "revenue": None, "leads": 120, "conversions": 0},  # null revenue
    ]
    return pd.DataFrame(raw_records)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="PulseMetrics AI — Automated Website SEO, Copywriting & Business Data Intelligence Engine"
    )
    parser.add_argument("--csv", type=str, help="Path to raw e-commerce or SaaS leads CSV file")
    parser.add_argument("--url", type=str, help="Live website URL to audit for SEO & conversion copy")
    parser.add_argument("--demo", action="store_true", help="Run built-in demo dataset intelligence pipeline")
    parser.add_argument("--out", type=str, help="Optional output file path to write structured JSON report")

    args = parser.parse_args()

    if not any([args.csv, args.url, args.demo]):
        parser.print_help()
        sys.exit(0)

    output_bundle: Dict[str, Any] = {}

    if args.csv:
        engine = BusinessDataEngine.from_csv(args.csv)
        output_bundle["analytics"] = engine.generate_intelligence_payload()
    elif args.demo:
        engine = BusinessDataEngine(build_demo_dataframe())
        output_bundle["analytics"] = engine.generate_intelligence_payload()

    if args.url:
        auditor = WebsiteSEOAndCopyAuditor(args.url)
        output_bundle["seo_audit"] = auditor.audit()

    rendered_json = json.dumps(output_bundle, indent=2)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(rendered_json)
        logger.info(f"Structured JSON report exported to '{args.out}'.")
    else:
        print(rendered_json)


if __name__ == "__main__":
    main()