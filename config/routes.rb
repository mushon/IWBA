Rails.application.routes.draw do
  namespace :api do 
    resources :drops do 
      collection do 
        get 'latest'
        get 'water'
      end
    end

    resources :deposits
    resources :hotspots
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
  
  match 'water_mock' => 'welcome#water_mock', :via => :get
  root :to => 'welcome#index'
end
