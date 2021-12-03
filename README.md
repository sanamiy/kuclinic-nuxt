# 京大保健所の存続を求める会ウェブサイト

## 概要

nuxt で書いた web サイトを heroku でホスト

@nuxt/content というパッケージを利用している

この `README.md` を読むと誰でもウェブサイトを編集できるようになります．

## 自動公開

main ブランチへ push すると，自動で公開されます

## どうすれば push できるの？

**方法 1) ローカルから push する**

1. Github のアカウントを作成する
2. Github デスクトップをダウンロードする
3. ローカルでファイルを編集&保存
4. 左側，更新したいファイルにチェックを入れて，何を変更したのかメッセージを入れてコミット(=自分の PC 上での編集履歴に保存)
5. main ブランチに push (=共有の編集履歴に対して変更を伝える)

**方法 2) ブラウザから push する**

変更量少ないときはこちらでも OK

1. 同じ
2. PC から GitHub にブラウザ上でアクセス，編集してコミット

**方法 3) 山村に変更したい内容を伝える**

どうぞ

## @nuxt/content

@nuxt/content とは，Markdown ファイルを綺麗に表示してくれるパッケージです

自動で目次が作成されたり，章へのリンクが作成されたりします

Markdown の普通の記法の他，@nuxt/content 専用拡張機能記法が可能

`content/` に記事編集者が書いた markdown ファイルをおき，`static` に添付画像などを置く

## `content/`

`content/`ディレクトリの Markdown ファイルはページになり、左側のナビゲーションにリストされます

適切に機能させるには、Markdown のフロントマターに以下のプロパティを必ず含めてください：

- `title`
  - Type: `String`
  - `required`
  - _ページのタイトルはメタに挿入されます_
- `description`
  - Type: `String`
  - `required`
  - _ページの説明はメタに挿入されます_
- `position`
  - Type: `Number`
  - `required`
  - _ナビゲーションでドキュメントをソートするために使用されます_
- `category`
  - Type: `String`
  - `required`
  - _ナビゲーションでドキュメントをグループ化するために使用されます_
- `version`
  - Type: `Float`
  - _ドキュメントが更新されることをバッジでユーザーへ警告するために使用できます。一度ページが表示されると、バージョンが上がるまではローカルストレージに保存されます。_
- `fullscreen`
  - Type: `Boolean`
  - _`toc`がないときにページを拡大するために使用できます_

**例**

```md
---
title: Introduction
description: "Empower your NuxtJS application with @nuxt/content module."
position: 1
category: Getting started
version: 1.4
fullscreen: false
---
```

## `static/`

ここに、ロゴや画像などを配置

<alert type="info">

`static/icon.png`ファイルを追加することで、[nuxt-pwa](https://pwa.nuxtjs.org/)を有効化し、favicon を自動生成できます。

_アイコンは 512x512 以上の大きさの正方形である必要があります_

</alert>

<alert type="info">

`static/preview.png`ファイルを追加することで、ソーシャルプレビュー画像をメタに含められます

_画像サイズは 640×320px 以上にしてください（1280×640px が最適です）_

</alert>

**例**

```bash
content/
  en/
    index.md
static/
  favicon.ico
nuxt.config.js
package.json
```

## `content/settings.json`

テーマの設定をするために、`content/settings.json`を作成できます。

- `title`
  - Type: `String`
  - _ドキュメントのタイトル_
- `url`
  - Type: `String`
  - _ドキュメントがデプロイされる URL_
- `logo`
  - Type: `String` | `Object`
  - _プロジェクトのロゴ。[color mode](https://github.com/nuxt-community/color-mode-module)ごとにロゴを設定する`Object`にもできます_
- `github`
  - Type: `String`
  - _最新バージョン、リリースページ、ページ上部の GitHub へのリンク、 `このページをGitHubで編集する`リンク などを各ページへ表示させるには、GitHub レポジトリを`${org}/${name}`の形式で追加します_
- `twitter`
  - Type: `String`
  - _リンクさせたい Twitter ユーザー名_

**例**

```json
{
  "title": "Nuxt Content",
  "url": "https://content.nuxtjs.org",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg"
  },
  "github": "nuxt/content",
  "twitter": "@nuxt_js"
}
```

## 拡張記法

このテーマには、Markdown コンテンツで直接使用できるいくつかの Vue.js コンポーネントが付属しています：

### `<alert>`

**Props**

- `type`
  - Type: `String`
  - Default: `'warning'`
  - Values: `['warning', 'info']`

**例**

```md
<alert>

Check out a warning alert with a `codeblock`!

</alert>
```

**結果**

<alert>

Check out a warning alert with a `codeblock`!

</alert>

**例**

```md
<alert type="info">

Check out an info alert with a [link](/themes/docs).

</alert>
```

**結果**

<alert type="info">

Check out an info alert with a [link](/themes/docs).

</alert>

### `<list>`

**Props**

- `items`
  - Type: `Array`
  - Default: `[]`

**例**

```md
---
items:
  - Item1
  - Item2
  - Item3
---

<list :items="items"></list>
```

**結果**

<list :items="['Item1', 'Item2', 'Item3']"></list>

### `<code-group>`

このコンポーネントは`slots`を利用しています。以下の`code-block`を参照してください。

### `<code-block>`

**Props**

- `label`
  - Type: `String`
  - `required`
- `active`
  - Type: `Boolean`
  - Default: `false`

**例**

````html
# Backslashes are for demonstration

<code-group>
  <code-block label="Yarn" active>
    ```bash yarn add @nuxt/content-theme-docs \```
  </code-block>
  <code-block label="NPM">
    ```bash npm install @nuxt/content-theme-docs \```
  </code-block>
</code-group>
````

**結果**

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxt/content-theme-docs
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @nuxt/content-theme-docs
```

  </code-block>
</code-group>

### `<code-sandbox>`

**Props**

- `src`
  - Type: `String`
  - `required`

**例**

```md
---
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark
---

<code-sandbox :src="link"></code-sandbox>
```

**結果**

<code-sandbox src="https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark"></code-sandbox>

### ダークモード

2 つのバージョンがある場合、`dark-img`と`light-img`クラスを画像に適用することで、カラーモードに依存した依存関係を自動的に切替えられます。

**例**

```md
<img src="/img-light.svg" class="light-img" alt="Image light" />
<img src="/img-dark.svg" class="dark-img" alt="Image dark" />
```

## 他言語対応

日本語と英語に対応

- content/ja
- content/en

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
