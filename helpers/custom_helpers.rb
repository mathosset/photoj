module CustomHelpers
  def page_title
    current_page.data.title || data.site.title
  end

  def page_description
    current_page.data.description || data.site.description
  end

  def page_image
    current_page.data.image_path || data.site.logo_image_path
  end

  def current_page_url
    "#{data.site.url}#{current_page.url}"
  end
end
