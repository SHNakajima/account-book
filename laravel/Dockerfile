# ベースイメージとして公式のPHP-FPMイメージを使用
FROM php:8.1-fpm

# 作業ディレクトリを設定
WORKDIR /var/www

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
  git \
  curl \
  zip \
  unzip \
  libpng-dev \
  libjpeg-dev \
  libfreetype6-dev \
  libonig-dev \
  libxml2-dev \
  nodejs \
  npm \
  && docker-php-ext-install mbstring exif pcntl bcmath gd

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# アプリケーションコードをコピー
COPY . /var/www

# アプリケーション依存関係をインストール
RUN composer install

# フロントエンド依存関係をインストールし、ビルド
RUN npm install
RUN npm run build

# start-containerスクリプトをコピー
COPY ./docker/scripts/start-container.sh /usr/local/bin/start-container

# スクリプトに実行権限を付与
RUN chmod +x /usr/local/bin/start-container

# LiteStreamのインストール
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz
COPY ./docker/etc/litestream.yml /etc/litestream.yml

# ポート8080を公開
EXPOSE 8080

# コンテナが起動する際に実行されるエントリーポイントを設定
ENTRYPOINT ["start-container"]
