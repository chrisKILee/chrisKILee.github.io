source "https://rubygems.org"
ruby RUBY_VERSION

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#

# If you have any plugins, put them here!
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
# GitHub Pages가 실제 빌드에 사용하는 gem 세트를 그대로 핀.
# jekyll·kramdown·jekyll-feed·jekyll-sitemap·jekyll-paginate를 패치된 버전으로 함께 고정한다.
gem 'github-pages', group: :jekyll_plugins

group :jekyll_plugins do
    # github-pages 화이트리스트 밖(라이브에선 무시되나 로컬 빌드/아카이브용)
    gem 'jekyll-archives'
end