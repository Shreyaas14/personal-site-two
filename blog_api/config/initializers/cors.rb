# Handles CORS preflight and response headers.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins \
      %r{\Ahttps://my-frontend-.*-shreyaas14s-projects\.vercel\.app\z},
      "http://localhost:3000"

    resource "*",
      headers: [
        "Origin",
        "Content-Type",
        "Accept",
        "X-API-Token",
        "Authorization"
      ],
      methods: [:get, :post, :options],
      expose: [],    # add any response headers you want to expose
      max_age: 600
    # If you later use cookies/sessions, add: credentials: true
    # (and use specific origins, not "*")
  end
end
