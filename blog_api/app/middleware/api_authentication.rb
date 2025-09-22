# blog_api/app/middleware/api_authentication.rb
class ApiAuthentication
  def initialize(app)
    @app = app
  end

  def call(env)
    token    = env["HTTP_X_API_TOKEN"]
    expected = ENV["API_TOKEN"] # set on Heroku
    if expected && token != expected
      return [401, { "Content-Type" => "application/json" }, [{ error: "Unauthorized" }.to_json]]
    end
    @app.call(env)
  end
end
