rm feed.json
rm feed.atom
rm rss.xml

yarn run blog:build

mv blog/.vuepress/dist/feed.atom feed.atom
mv blog/.vuepress/dist/feed.json feed.json
mv blog/.vuepress/dist/rss.xml rss.xml
 
rm -rf blog/.vuepress/dist

git add .
git commit -m 'deploy'

git push -f git@github.com:Silence020922/blog.git

