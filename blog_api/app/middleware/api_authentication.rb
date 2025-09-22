# blog_api/app/middleware/api_authentication.rb
class ApiAuthentication
  def initialize(app)
    @app = app
  end

  def call(env)
    # Let CORS preflight pass so Rack::Cors can respond with headers
    return @app.call(env) if env["REQUEST_METHOD"] == "OPTIONS"

    token    = env["HTTP_X_API_TOKEN"]
    expected = ENV["API_TOKEN"] # set on Heroku: heroku config:set API_TOKEN=...

    if expected && token != expected
      return [
        401,
        { "Content-Type" => "application/json" },
        [ { error: "Unauthorized" }.to_json ]
      ]
    end

    @app.call(env)
  end
end
