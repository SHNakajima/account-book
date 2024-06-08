#!/bin/sh
set -e

DB_PATH="/var/www/database/database.sqlite"
BACKUP_PATH="/var/www/database/database.sqlite.bk"

# コンテナ起動時に持っているSQLiteのデータベースファイルは、後続処理でリストアに成功したら削除したいので、リネームしておく
if [ -f $DB_PATH ]; then
  mv $DB_PATH $BACKUP_PATH
fi

# Cloud Storage からリストア
litestream restore -if-replica-exists -config /etc/litestream.yml $DB_PATH

if [ -f $DB_PATH ]; then
  # リストアに成功したら、リネームしていたファイルを削除
  echo "---- Restored from Cloud Storage ----"
  rm $BACKUP_PATH
else
  # 初回起動時にはレプリカが未作成であり、リストアに失敗するので、その場合には、冒頭でリネームしたdbファイルを元の名前に戻す
  echo "---- Failed to restore from Cloud Storage.  using exist database ----"
  mv $BACKUP_PATH $DB_PATH
fi

# メインプロセスに、litestreamによるレプリケーション、
# サブプロセスに Laravel アプリケーションを走らせる
exec litestream replicate -exec "php artisan serve --host=0.0.0.0 --port=8080" -config /etc/litestream.yml