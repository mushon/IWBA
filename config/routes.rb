Rails.application.routes.draw do

  namespace :admin do 
    resources :users 
    resources :deposits
    resources :countries 

    match 'login' => 'sessions#new', :via => :get
    match 'login' => 'sessions#create', :via => :post
    match 'logout' => 'sessions#destroy', :via => :delete

    root :to => 'deposits#index'
  end



end
