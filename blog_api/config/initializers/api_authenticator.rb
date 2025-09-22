require Rails.root.join("app/middleware/api_authentication")

Rails.application.config.middleware.use ApiAuthentication