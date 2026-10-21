---
title: "Healthcare AI in Japan, before the paperwork"
description: "What founders building clinical AI for Japan should work out before the first PMDA consultation, from SaMD status to reimbursement and EMRs."
date: 2026-10-20
authors: ["Jet Villegas", "Aditya Pandya"]
summary_ja: "日本の臨床現場向けAIを手がける企業に向けて、PMDAへの最初の相談の前に整理しておくべき医療機器該当性とクラス分類、DASH for SaMDやIDATENなどの制度、承認とは別に2年ごとに改定される診療報酬、そして導入を左右する病院の業務フローと電子カルテ連携について解説する。"
draft: true
order: 3
plate: clinic
aside: office-floor
---

If you're building AI for clinical settings and Japan is on your roadmap, the first formal step is usually a consultation with the PMDA, the Pharmaceuticals and Medical Devices Agency, which reviews medical devices for the Ministry of Health, Labour and Welfare (MHLW). It works best as a checkpoint, because the questions that decide whether a clinical AI product succeeds here start earlier and run longer than the review.

This note is general background, not legal or regulatory advice. JungleCode brings the product, go-to-market and workflow perspective, and we work alongside specialist regulatory and reimbursement partners for filings. You'll want both.

The first question is whether your product is a medical device at all. Japan has regulated standalone software as a medical device since the revised PMD Act took effect on November 25, 2014. Software falls under it when it has a medical purpose and could affect a patient's life or health if it doesn't work as intended. Software whose risk is equivalent to a Class I device, the lowest category, is excluded. MHLW publishes a guideline on this question, last revised in March 2023, and a database of example decisions. When the answer isn't clear, you can ask for a formal qualification consultation.

Status turns on intended use and the claims you make, not on whether the product uses AI. The same underlying model can be treated differently depending on whether you position it as a documentation tool or a diagnostic aid, so decide which product you're bringing before you write the Japanese marketing copy.

If it is a device, its risk class sets the route. Japan uses four classes. Class II and Class III products covered by a certification standard can be certified by a registered third-party certification body. Products without such a standard, and all Class IV products, need MHLW approval after a PMDA review. Overseas manufacturers also need to register and appoint a marketing authorization holder in Japan.

## What the consultation programs are for

In November 2020, MHLW published DASH for SaMD, a package strategy to bring software medical devices into clinical use faster. It led to a one-stop desk at PMDA, the Comprehensive Consultation for SaMD, which brings together the qualification consultation run by MHLW, development consultations with PMDA and a medical insurance consultation.

In September 2023, MHLW and the Ministry of Economy, Trade and Industry (METI) followed with DASH for SaMD 2. It clarified a two-step approval approach, where a product can receive a first approval on earlier evidence and expand its approved scope as clinical evidence builds after launch.

For AI that keeps learning, the scheme to understand is IDATEN, short for Improvement Design within Approval for Timely Evaluation and Notice. It came from a 2019 amendment to the PMD Act and took effect on September 1, 2020. You submit a change plan as part of the review, PMDA confirms it, and changes made within that plan can then go through a notification or a streamlined review instead of a full new approval each time. PMDA's examples include improving diagnostic accuracy with post-market real-world data. It covers changes you plan in advance, so a model that keeps learning still needs its update process defined up front. Treat the change plan as a product decision about how your model gets retrained, validated and released, and design it early.

## Approval isn't adoption

Approval doesn't mean anyone will pay. Coverage under shinryō hōshū (診療報酬), the national fee schedule that sets what insured care pays, is a separate decision. MHLW makes it after deliberation at Chuikyo (中医協), the Central Social Insurance Medical Council, and the fee schedule is revised every two years, most recently for fiscal 2026. Recent revisions have added rules specific to software, including limited routes for using approved software outside standard coverage. Your reimbursement plan has to line up with that two-year calendar, so use the insurance consultation early and work out who in the hospital pays if your product isn't separately reimbursed.

Then the hospital has to use it, which in practice means the EMR. Adoption is uneven. In MHLW's 2023 survey of medical facilities, 93.7% of general hospitals with 400 or more beds had an EMR, compared with 59.0% of those under 200 beds and 55.0% of general clinics. MHLW describes current systems as on-premise and customized and wants to move toward cheaper cloud-native ones, and the government's goal is for nearly every medical institution to run an EMR that can share needed patient information by 2030 at the latest.

For a founder, that means integration looks different at every hospital, and the EMR vendor and the hospital's IT team are likely to be part of the decision. A clinician champion matters, and so do the people who'd change a workflow, approve a network connection or answer for patient data. Before you invest in a filing, find out where your output appears on screen, who acts on it, how it gets into the record and who supports it at two in the morning.

<p class="editor-prompt">FOUNDER EXAMPLE: an Indeed Apply integration where a partner's internal systems, not the agreement, set the timeline</p>

The PMDA consultation is still the right first formal step. It's more useful when you arrive knowing what you're claiming, which class you expect, how the model will change, who pays and how the product fits into a ward's day. That's the work before the paperwork, and it's the part we help with.

---

**Sources**

- [PMDA, Software as a Medical Device (SaMD), English overview of scope, the 2014 start date, the consultation desk and DASH for SaMD](https://www.pmda.go.jp/english/review-services/reviews/0009.html)
- [PMDA, Regulations and Approval/Certification of Medical Devices, on the four classes and their routes](https://www.pmda.go.jp/english/review-services/reviews/0004.html)
- [MHLW, 医療機器プログラムについて, on the definition, the qualification guideline and the consultation desks (in Japanese)](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000179749_00004.html)
- [MHLW and METI, DASH for SaMD 2 (September 2023, in Japanese)](https://www.mhlw.go.jp/content/11121000/001142990.pdf)
- [PMDA, "Latest trend of pharmaceutical, medical device regulation, and international cooperation of Japan" (December 21, 2021), on the 2019 amendment and IDATEN](https://www.pmda.go.jp/files/000244008.pdf)
- [Emergo by UL, on the 2019 PMD Act revisions and IDATEN taking effect September 1, 2020](https://www.emergobyul.com/blog/2020/09/japan-pmd-act-revisions-include-fast-track-reviews-some-medical-devices-and-ivds)
- [TMI Associates, Chambers Healthcare: Medical Devices 2026, Japan chapter, on SaMD, foreign manufacturers, two-step approval and IDATEN](https://practiceguides.chambers.com/practice-guides/healthcare-medical-devices-2026/japan)
- [MHLW, 令和8年度診療報酬改定について, the fiscal 2026 fee schedule revision (in Japanese)](https://www.mhlw.go.jp/stf/newpage_67729.html)
- [MHLW, fiscal 2026 revision notices from April 2026, including notices on SaMD under 評価療養 and 選定療養 (in Japanese)](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000188411_00074.html)
- [Chuikyo, report to the Minister on the fiscal 2026 revision (February 13, 2026, in Japanese)](https://www.mhlw.go.jp/content/10808000/001655177.pdf)
- [MHLW, 電子カルテの普及について (March 12, 2026), with 2023 EMR adoption figures and the 2030 goal (in Japanese)](https://www.mhlw.go.jp/content/10808000/001657580.pdf)
- [Digital Agency, Health, medical, and nursing care, on the June 2, 2023 Healthcare DX roadmap and the 2030 EMR target](https://www.digital.go.jp/en/policies/health)
