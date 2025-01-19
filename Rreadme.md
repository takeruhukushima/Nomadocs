```markdown
# Nomadocsについて

## 概要
Nomadocs は、様々なトピックごとに Markdown ドキュメントを整理・閲覧できる静的サイトを構築するためのプロジェクトです。Next.js と React をベースに、ディレクトリ構造を利用してコンテンツを自動的に読み込み、一覧表示および個別ページで表示する仕組みを提供します。

## 特徴
- コンテンツの階層構造をディレクトリで管理
- Markdown ファイルを自動的に読み込み、動的にルートを生成
- 見出しやタイトルを活用した一覧表示
- サイト全体のレイアウトにカスタムコンポーネントを適用

## インストールとセットアップ
1. リポジトリをクローンします。
   ```bash
   git clone https://github.com/yourusername/nomadocs.git
   cd nomadocs
   ```
2. 依存パッケージをインストールします。
   ```bash
   npm install
   ```
   または
   ```bash
   yarn install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
   または
   ```bash
   yarn dev
   ```
   ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、Nomadocs のサイトが表示されます。

## コンテンツの追加
- `contents/` ディレクトリ内に新しいサブディレクトリを作成し、その中に `.md` ファイルを配置することで、簡単に新しいコンテンツを追加できます。
- ディレクトリ名がカテゴリーやトピック名となり、各 `.md` ファイルは自動的に一覧および詳細ページとして表示されます。

## 貢献
Nomadocs への改善提案やバグ報告、機能追加の提案を歓迎します。プルリクエストを送る前に [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

## ライセンス
このプロジェクトは Apache License 2.0 の下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。
```