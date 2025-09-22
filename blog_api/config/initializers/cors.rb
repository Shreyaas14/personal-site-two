# config/initializers/cors
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(
      %r{\Ahttps://my-frontend-.*-shreyaas14s-projects\.vercel\.app\z},
      'http://localhost:3000',
      'https://my-frontend-ten-chi.vercel.app'
    )

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             max_age: 600
  end
end
