Rails.application.routes.draw do

  devise_for :users, controllers: {
  registrations: 'users/registrations',
  }
  devise_scope :user do
  get 'addresses', to: 'users/registrations#new_address'
  post 'addresses', to: 'users/registrations#create_address'
  end
  root to: 'products#index'

  resources :products do

    collection do
      get 'get_category_children', defaults: { format: 'json'}
      get 'get_category_grandchildren', defaults: { format: 'json'}
      
    end
  end
  
  
  resources :mypage, only: :index do
    collection do
      get 'card', to: 'mypage#card'
      get 'card/new', to: 'mypage#card_new'
      get 'logout', to: 'mypage#logout'
    end
  end

  resources :creditcard, only: [:new, :show, :destroy] do
    collection do
      post 'pay', to: 'creditcard#pay'
    end
  end

  resources :orders, only: [:index] do
    member do
      get 'new', to: 'orders#new'
      post 'pay', to: 'orders#pay'
      get 'done', to: 'orders#done'
    end
  end

  
end
