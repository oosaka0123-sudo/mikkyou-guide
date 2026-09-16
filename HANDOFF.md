# 密教図譜 HANDOFF

最終更新: 2026-09-16

## 現在地
- 本番: https://oosaka0123-sudo.github.io/mikkyou-guide/
- GitHub: https://github.com/oosaka0123-sudo/mikkyou-guide
- Branch: main
- 制作機: ks-pc02
- ローカル: C:\Users\oosak\Documents\GitHub\mikkyou-guide
- 最新確認済みcommit: 53f6a95 (SEO-metadata-polish)
- GitHub Pages: 有効 / GitHub Actions 自動デプロイ

## サイト方針
「宗教サイト」ではなく、密教の宇宙観を探索するデジタル図譜。曼荼羅=世界を読むための構造を、Webの空間・時間体験へ翻訳する。テンプレート感を避け、墨・生成り・濃紺・抑えた金、円・方形・軸・余白を主要表現にする。

## 公開ページ
- `/` HOME
- `/history/` 密教史
- `/shingon/` 真言密教
- `/tendai/` 天台密教
- `/mandala/` 曼荼羅
- `/concepts/` 重要概念
- `/glossary/` 用語辞典
- `/about/` 編集方針・このサイトについて
- `/privacy/` プライバシーポリシー
- `/contact/` お問い合わせ
- `404.html` 独自404

## 技術
- 静的HTML/CSS/JS
- `.nojekyll`
- `assets/site.css`, `assets/site.js`
- `manifest.webmanifest`, `robots.txt`, `sitemap.xml`
- OGP: `assets/og.png` 1200x630
- icons: `icon-192.png`, `icon-512.png`, favicon.svg
- `.github/workflows/pages.yml` でGitHub Pagesへ自動デプロイ
- `check-links.mjs` で内部リンク・基本HTML構造を検査

## QA / 公開確認
- 11 HTML / broken link 0 / invalid 0
- 主要10ページ × 360/390/430/1440px = 40ケースQAで横スクロール・HTTP・DOM・console error 0
- JS無効でも本文表示、Opening非表示、H1正常を確認
- Lighthouse最終確認: Performance 93 / Accessibility 100 / Best Practices 100 / SEO 100
- FCP 2.1s / LCP 2.1s / TBT 50ms / CLS 0
- 本番全10 URL HTTP 200
- canonical / OGP / robots / sitemap 正常
- 存在しないURLは404
- Claude独立レビュー最終90/100
- Gemini CLIは Google側 `UNSUPPORTED_CLIENT` / IneligibleTierError で利用不可。実施済みと偽らないこと。

## コンテンツ原則
- 仏教一般 / インド密教 / 中国密教 / 日本密教 / 真言 / 天台 / 民間信仰 / 現代解釈 / 学術研究を混同しない。
- 「真言宗では」「天台宗では」「仏教学では」等、立場を明示する。
- 経典引用・年代・系譜・梵語・真言・儀礼手順を創作しない。
- 秘儀・灌頂等の秘密性を尊重し、実践手順の再構成をしない。
- 宗派資料は宗派見解として扱い、学術的中立性と区別する。
- 純密/雑密は議論のある区分として扱う。
- 空海の「入定」は伝統上の理解と歴史記述を区別する。

## 次回の優先順位
1. `HANDOFF.md` と `git status` を最初に確認する。
2. 本番URLと最新Actions成功状態を確認する。
3. コンテンツ拡張を優先する。候補: 空海 / 最澄 / 大日如来 / 不動明王 / 両界曼荼羅 / 胎蔵界 / 金剛界 / 阿字観。
4. 新ページは既存デザイン言語を継承しつつ、各ページ固有の抽象ビジュアルを持たせる。
5. 追加後は `node check-links.mjs` → mobile/desktop実表示 → Lighthouse → commit/push → 本番確認。
6. Search Console等の公開後検索登録は、既存登録を確認して重複を作らず進める。

## 注意事項
- ユーザーへの細かい確認待ちで止まらず、調査→実装→確認→修正→再確認を自律的に繰り返す。
- 既存設定を壊さない。GitHub Pages / canonical / sitemap / robots / manifest /測定系の既存設定を勝手に置換しない。
- PowerShellで日本語HTMLを書き直すと文字化け事故があった。HTML一括変更はNode.jsのUTF-8処理を優先する。
- トップ動画は未実装。Veo Lite 720p無音という仕様希望はあるが、利用可能な生成環境がない限り「動画あり」と言わない。
- 画像指定をユーザーへ求めず、著作権・教義上の安全性・性能を考慮してSVG/抽象表現を自律選択する。

## 完了判定
現時点でサイト制作・GitHub Pages公開・QA・SEO基本設定・公開後検査まで完了。次フェーズは「記事/人物/尊格/曼荼羅の個別解説を増やし、検索流入と専門性を伸ばす」。
