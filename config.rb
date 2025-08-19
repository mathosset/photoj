###
# Blog settings
###

Time.zone = "Paris"
# I18n.config.enforce_available_locales = false

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"
    blog.name = "blog"
    blog.permalink = "/{title}.html"
  # Matcher for blog source files
    blog.sources = "/blog/{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
    blog.layout = "layouts/blog"
  # blog.summary_separator = /()/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
    blog.default_extension = ".markdown"
    blog.new_article_template = "source/new-article.erb"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
    blog.paginate = true
    blog.per_page = 20
    blog.page_link = "/{num}"

  # Custom categories
    #blog.custom_collections = {
      #category: {
        #link: '/categories/{category}.html',
        #template: '/category.html'
      #}
    #}
end

page "/feed.xml", layout: false
#page "blog/*", :layout => :layout

###
# Disqus
###

# activate :disqus do |d|
#   d.shortname = 'mathieuthomasset'
# end

# configure :development do
#   activate :php
# end

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

page "/sitemap.xml", :layout => false

activate :protect_emails

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  #Minify HTML
  activate :minify_html

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets
  set :relative_links, true

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# Deployment
activate :deploy do |deploy|
   deploy.deploy_method = :git            # obligatoire pour Git
#   deploy.branch        = "gh-pages"     # branche de destination
#   deploy.remote        = "origin"       # nom du remote
   deploy.build_before  = true           # build avant de déployer
end
