# Authentication Service

- Optional email address
- Login via username or email address

Responsible for:

- User login
  - Creating JWT access and refresh tokens
  - Verifying JWT access and refresh tokens
  - Refreshing JWT access tokens
  - Comparing user-provided login credentials with User service
  - Access tokens only last 15 minutes
  - Access tokens will be verified only if they are still valid (not expired or manipulated)
  - Refresh tokens will last 1 year
  - Refresh tokens will be used to retrieve a new access token
  - Retrieving a new access token will also remove the old refresh token and issue an new one
  - Refresh tokens will be validated against the database
  - For each refresh token the user agent is saved to the database so we can show the user their active sessions
- User signup
  - Signup confirmation
- Password reset

## Useful commands

- Connect to PostgreSQL `psql authentication_service authentication_service`
- List all tables: `\dt`
