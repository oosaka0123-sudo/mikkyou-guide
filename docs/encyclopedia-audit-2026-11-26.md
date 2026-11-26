# コンテンツ全面深化・専門百科事典化 v1.0 — 初回監査
2026-11-26 / Issue #1 / base ae8b87f
## 観測
sitemap.xmlの51 URLをすべて取得。以下はmainタグ内からHTMLタグを除き空白を正規化した文字数（英字・見出し・リンク文言含む）、本文内外部href件数。リンクの存在は根拠の妥当性を保証しない。個別記事全39件の本文内img/svgは0。点数・学術的正誤は未評価。
|記事slug|文字数|外部href|
|---|---:|---:|
|kukai|683|2|
|saicho|633|2|
|dainichi-nyorai|619|2|
|fudo-myoo|621|2|
|ryokai-mandala|658|2|
|aizen-myoo|463|0|
|ashuku-nyorai|352|0|
|kongokai-kue|388|0|
|taizokai-chudaihachiyoin|383|0|
|keika|395|0|
|ennin|386|0|
|enchin|371|0|
|hosho-nyorai|368|0|
|amida-nyorai|311|0|
|fukujyoju-nyorai|296|0|
|kokuzo-bosatsu|305|0|
|kujaku-myoo|346|0|
|godai-myoo|388|0|
|ajikan|341|0|
|sanmitsu|327|0|
|sokushin-jobutsu|421|0|
|kongosatta|331|0|
|kannon-bosatsu|291|0|
|monju-bosatsu|298|0|
|fugen-bosatsu|261|0|
|shishu-mandala|305|0|
|goma|289|0|
|kanjo|287|0|
|kaji|261|0|
|shingon-darani|327|0|
|taizokai-jusandaiin|300|0|
|gochi|255|0|
|rokudai|284|0|
|hosshin|275|0|
|rishukyo|264|0|
|dainichikyo|276|0|
|kongochokyo|284|0|
|sokushingi|278|0|
|jujushinron|292|0|
## 方針
優先10テーマ（密教とは、空海、最澄、大日如来、両界曼荼羅、大日経、金剛頂経、三密、即身成仏、真言と天台の比較）から改稿。続いて既存39記事、10分野の不足テーマ（基礎、世界史、人物、尊格、曼荼羅、哲学、経典、儀礼、美術・寺院、比較）。基礎1500–3000字、標準3000–6000字、専門5000–10000字、特集10000–20000字を目安とし水増ししない。三層構成、近接出典、資料種別・立場の区別、権利確認済み画像または明示した模式図、関連記事。歴史と宗派伝統を区別し、秘儀を再構成しない。宗教的効果を保証しない。正確性25、出典25、深さ20、理解10、独自整理10、リンク5、視覚5。90点目標、重大誤認・架空出典・権利問題が残れば公開不可。実在の監修者を装わない。追加従量課金AI API禁止。
## 初回差分
三密は一次資料SAT No.2428、宗派公式解説、J-STAGE研究本文の確認に基づく改稿案。歴史的展開・天台比較・著者情報の追加確認と独立レビューが残る。既存のcheck-links.mjsは深層記事を走査していなかったため再帰化した。実行テスト未確認。
## 再開
ai-master README/AGENTS/PROJECTS と当repo HANDOFF、Issue #1、作業ブランチ feat/encyclopedia-phase1 を確認。三密の独立レビューと出典再確認、再帰リンク検査の実行、残る優先記事の執筆から再開。公開はLv4レビュー、Critical/High解消、CI・表示確認の後。mainは未変更。