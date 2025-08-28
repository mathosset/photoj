###
# Blog settings
###

Time.zone = "Paris"

activate :blog do |blog|
  blog.name = "blog"
  blog.permalink = "/{title}.html"
  blog.sources = "/blog/{year}-{month}-{day}-{title}.html"
  blog.layout = "layouts/blog"
  blog.default_extension = ".markdown"
  blog.new_article_template = "source/new-article.erb"

  blog.paginate = true
  blog.per_page = 20
  blog.page_link = "/{num}"
end

page "/feed.xml", layout: false

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

page "/sitemap.xml", :layout => false

activate :protect_emails

# Build-specific configuration
require 'uglifier'

configure :build do
  activate :minify_css
  activate :minify_html
  activate :minify_javascript, compressor: Uglifier.new(harmony: true)
  activate :asset_hash
  activate :relative_assets
  set :relative_links, true
end


# Deployment
activate :deploy do |deploy|
   deploy.deploy_method = :git
   deploy.build_before  = true
end

# --- Pages tirages (générées depuis data/tirages.yml) ---
data.tirages.each do |t|
  proxy "/tirages/#{t.id}.html",
        "/tirages/template.html",
        locals: { tirage: t },
        ignore: true
end
