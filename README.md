## Setup ENV file for the frontend

```js
DATABASE_URL
NEXTAUTH_SECRET

GITHUB_ID
GITHUB_SECRET
GOOGLE_ID
GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

NEXT_PUBLIC_PUSHER_APP_KEY
PUSHER_APP_ID
PUSHER_APP_SECRET

HUGGINGFACE_API_KEY

OPENAI_API_KEY
```

## Setup ENV file for the backend

```python
DOMAIN
SERVER_HOST

PROJECT_NAME

# Backend
CORS_ORIGINS

# MySQL
MYSQL_SERVER
MYSQL_USER
MYSQL_PASSWORD
MYSQL_PORT
MYSQL_DB
```

cd into back end
source venv/vim activate
cd into app
uvicorn main:app
