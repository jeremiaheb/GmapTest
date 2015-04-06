source 'https://rubygems.org'

ruby '2.2.1'
gem 'rails', '4.0.2'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'pg'
gem 'thin'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'less-rails'
  gem 'activeresource'
  gem 'protected_attributes'
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'therubyracer', :platforms => :ruby
  gem 'twitter-bootstrap-rails', :git => 'git://github.com/seyhunak/twitter-bootstrap-rails.git'
  gem 'uglifier', '>= 1.0.3'
end
gem 'best_in_place', '~> 3.0.1'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'underscore-rails'
gem 'jquery-datatables-rails', git: 'git://github.com/rweng/jquery-datatables-rails.git'

group :development, :test do
  gem 'ruby-prof'
  gem 'rails-erd'
  gem 'pry-rails'
  gem 'pry-remote'
  gem 'quiet_assets'
end

group :production do
  gem 'rails_12factor'
end

gem 'puma'
gem 'therubyracer'
