module Middleware
  class ApiAuthentication
    def initialize(app)
      @app = app
    end

    def call(env)
      request = Rack::Request.new(env)
      if request.path =~ %r{^/posts\.json$}
        auth_token = env['HTTP_X_API_TOKEN']
        unless auth_token == ENV['API_AUTH_TOKEN']
          return [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
        end
      end
      @app.call(env)
    end
  end
end