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
  blog.publish_future_dated = true

  blog.paginate = true
  blog.per_page = 20
  blog.page_link = "/{num}"
end

page "/feed.xml", layout: false

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

helpers do
  def picture_tag(source, options = {})
    img_dir = File.join(app.root, 'source', 'images')
    base    = source.sub(/\.(jpe?g|png)$/i, '')
    ext     = source[/\.(jpe?g|png)$/i]
    widths  = [480, 720, 960, 1440]
    sizes   = options.delete(:sizes) || "(max-width: 576px) 100vw, (max-width: 992px) 50vw, 960px"

    webp_srcset = widths
      .select { |w| File.exist?(File.join(img_dir, "#{base}_#{w}.webp")) }
      .map    { |w| "#{image_path("#{base}_#{w}.webp")} #{w}w" }

    jpg_srcset = widths
      .select { |w| File.exist?(File.join(img_dir, "#{base}_#{w}#{ext}")) }
      .map    { |w| "#{image_path("#{base}_#{w}#{ext}")} #{w}w" }

    img = image_tag(source, options)
    sources = []

    if webp_srcset.any?
      sources << "<source type=\"image/webp\" srcset=\"#{webp_srcset.join(', ')}\" sizes=\"#{sizes}\">"
    elsif File.exist?(File.join(img_dir, "#{base}.webp"))
      sources << "<source type=\"image/webp\" srcset=\"#{image_path("#{base}.webp")}\">"
    end

    if jpg_srcset.any?
      sources << "<source type=\"image/jpeg\" srcset=\"#{jpg_srcset.join(', ')}\" sizes=\"#{sizes}\">"
    end

    sources.any? ? "<picture>#{sources.join}#{img}</picture>" : img
  end

  def webp_image_path(source)
    webp_source = source.sub(/\.(jpe?g|png)$/i, '.webp')
    webp_file = File.join(app.root, 'source', 'images', webp_source)
    File.exist?(webp_file) ? image_path(webp_source) : nil
  end
end

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

# === Redirections 301 — pages supprimées (404 GSC) ===
redirect "promus/index.html",                                             to: "/"
redirect "promus.html",                                                   to: "/"
redirect "Monsieur-Morimoto.html",                                        to: "/"
redirect "tentes-migrants/index.html",                                    to: "/"
redirect "philharmonie.html",                                             to: "/"
redirect "la-plus-grande-centrale-solaire-des-pays-de-la-loire.html",    to: "/"
redirect "inondations-paris-2016/index.html",                            to: "/"
