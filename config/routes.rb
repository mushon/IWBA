Rails.application.routes.draw do
  namespace :api do 
    resources :drops
    resources :deposits
  end

  namespace :admin do 
    resources :users 
    resources :deposits
    resources :hotspots
    resources :drops

    match 'login' => 'sessions#new', :via => :get
    match 'login' => 'sessions#create', :via => :post
    match 'logout' => 'sessions#destroy', :via => :delete

    root :to => 'deposits#index'
  end
  
end
