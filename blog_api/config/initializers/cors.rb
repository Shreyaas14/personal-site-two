Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins \
      %r{\Ahttps://my-frontend-.*-shreyaas14s-projects\.vercel\.app\z},
      "http://localhost:3000",
      "https://my-frontend-ten-chi.vercel.app",

    resource "*",
      headers: :any,                               # <— allow any request headers
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      max_age: 600
      # credentials: true  # only if you later use cookies; don't enable yet
  end
end
